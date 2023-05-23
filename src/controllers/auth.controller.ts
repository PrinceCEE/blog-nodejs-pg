import { getObjects, insertObject } from "src/db";
import { BadRequestError, NotFoundError, UnauthorizedError } from "src/errors";
import { confirmPassword, encryptAccessToken, hashPassword } from "src/helpers";
import { Auth, IResponse, Req, Res, User } from "src/types";
import { LoginSchema, RegisterSchema } from "src/validators";

export default class AuthController {
  register = async (req: Req): Promise<IResponse> => {
    const { error, value } = RegisterSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const { password, ..._value } = value;
    const user = await insertObject<User>("users", _value);

    let hashedPwd = await hashPassword(password);

    await insertObject<Auth>("auths", {
      password: hashedPwd,
      userID: user.userID,
    });

    return {
      status: true,
      message: "Registration successful",
    };
  };

  login = async (req: Req): Promise<IResponse> => {
    const { error, value } = LoginSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user = (await getObjects<User>("users", {
      email: value.email,
    }).then((rows) => rows[0])) as User;

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const auth = (await getObjects<Auth>("auths", {
      userID: user.userID,
    }).then((rows) => rows[0])) as Auth;

    if (!(await confirmPassword(auth.password, value.password))) {
      throw new UnauthorizedError("Incorrect password or email");
    }

    const token = await encryptAccessToken({
      email: user.email,
      userID: user.userID,
    });

    return {
      status: true,
      message: "Login successful",
      data: { accessToken: token },
    };
  };

  forgotPassword = async (req: Req, res: Res) => {
    res.send("Not Implemented");
  };

  changePassword = async (req: Req, res: Res) => {
    res.send("Not Implemented");
  };
}

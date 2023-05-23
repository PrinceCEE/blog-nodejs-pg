import randomatic from "randomatic";
import { getObjects, insertObject, updateObject } from "src/db";
import { BadRequestError, NotFoundError, UnauthorizedError } from "src/errors";
import { confirmPassword, encryptAccessToken, hashPassword } from "src/helpers";
import { Auth, ForgotPasswordCode, IResponse, Req, User } from "src/types";
import {
  ChangePasswordSchema,
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
} from "src/validators";

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

    const user = await getObjects<User>("users", {
      email: value.email,
    }).then((rows) => rows[0]);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const auth = await getObjects<Auth>("auths", {
      userID: user.userID,
    }).then((rows) => rows[0]);

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

  forgotPassword = async (req: Req): Promise<IResponse> => {
    const { error, value } = ForgotPasswordSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user = await getObjects<User>("users", {
      email: value.email,
    }).then((rows) => rows[0]);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const code = randomatic("0", 6);
    await insertObject<ForgotPasswordCode>("forgot_password_codes", {
      code,
      userID: user.userID,
    });

    return {
      status: true,
      message: "Email with validation code sent to your email",
    };
  };

  changePassword = async (req: Req): Promise<IResponse> => {
    const { error, value } = ChangePasswordSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const user = await getObjects<User>("users", {
      email: value.email,
    }).then((rows) => rows[0]);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const forgotPasswordCode = await updateObject<ForgotPasswordCode>(
      "forgot_password_codes",
      {
        code: value.code,
        userID: user.userID,
      },
      {
        isVerified: true,
      }
    );

    if (!forgotPasswordCode) {
      throw new BadRequestError("Error validating code");
    }

    let auth = await getObjects<Auth>("auths", {
      userID: user.userID,
    }).then((rows) => rows[0]);

    const hashedPwd = await hashPassword(value.password);
    const passwordsHistory = [...auth.passwordsHistory, auth.password];

    auth = await updateObject<Auth>(
      "auths",
      {
        userID: user.userID,
      },
      {
        password: hashedPwd,
        passwordsHistory,
      }
    );

    if (!auth) {
      throw new BadRequestError("Error updating password");
    }

    return {
      status: true,
      message: "Password changed successfully. You can now log in.",
    };
  };
}

import { getObjects, updateObject } from "src/db";
import { BadRequestError, NotFoundError } from "src/errors";
import { IResponse, Req, Res, User } from "src/types";
import { UpdateUserSchema } from "src/validators";

export default class UserController {
  getProfile = async (req: Req): Promise<IResponse> => {
    return {
      status: true,
      message: "Profile successfully fetched",
      data: req.user,
    };
  };

  getUsers = async (req: Req): Promise<IResponse> => {
    const users = await getObjects<User>("users", {});
    return {
      status: true,
      message: "Fetched all users",
      data: users,
    };
  };

  getUser = async (req: Req): Promise<IResponse> => {
    const userID = req.params.userID;
    const user = await getObjects<User>("users", {
      userID,
    }).then((rows) => rows[0]);

    return {
      status: true,
      message: "Fetched user successfully",
      data: user,
    };
  };

  updateUser = async (req: Req): Promise<IResponse> => {
    const { value, error } = UpdateUserSchema.validate(req.body);
    let user = req.user;

    if (error) {
      throw new BadRequestError(error.message);
    }

    user = await updateObject<User>(
      "users",
      {
        userID: user.userID,
      },
      value
    );

    return {
      status: true,
      message: "Profile successfully updated",
      data: user,
    };
  };
}

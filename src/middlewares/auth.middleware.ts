import { getObjects } from "../db";
import { NotFoundError, UnauthorizedError } from "../errors";
import { decodeAccessToken } from "../helpers";
import { Next, Req, Res, User } from "../types";

export default class AuthMiddleware {
  verifyAccessToken = async (req: Req, res: Res, next: Next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      if (token) {
        throw new UnauthorizedError("No token found");
      }

      const tokenData = await decodeAccessToken(token);
      const user = await getObjects<User>("users", {
        userID: tokenData.userID,
      }).then((rows) => rows[0]);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      req.user = user;
      next();
    } catch (err) {
      return next(err);
    }
  };
}

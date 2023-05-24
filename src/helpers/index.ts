import { IAccessToken, IResponse, Next, Req, Res } from "../types";
import { compare, genSalt, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { TOKEN_EXPIRES_IN, TOKEN_SECRET } from "../constants";

export const errorHandler =
  (handler: (req: Req, res?: Res) => Promise<IResponse>) =>
  async (req: Req, res: Res, next: Next) => {
    try {
      const response = await handler(req, res);
      return res.json(response);
    } catch (err) {
      return next(err);
    }
  };

export const hashPassword = async (password: string) => {
  const salt = await genSalt();
  return hash(password, salt);
};

export const confirmPassword = async (hashedPwd: string, password: string) => {
  return compare(password, hashedPwd);
};

export const encryptAccessToken = (data: IAccessToken) => {
  return new Promise<string>((resolve, reject) => {
    try {
      const token = sign(data, TOKEN_SECRET, {
        expiresIn: TOKEN_EXPIRES_IN,
      });

      resolve(token);
    } catch (err) {
      reject(err);
    }
  });
};

export const decodeAccessToken = (token: string) => {
  return new Promise<IAccessToken>((resolve, reject) => {
    try {
      const data = verify(token, TOKEN_SECRET) as IAccessToken;
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
};

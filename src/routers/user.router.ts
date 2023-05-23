import { Router } from "express";
import { UserController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { AuthMiddleware, UserMiddleware } from "src/middlewares";

export default () => {
  const userController = new UserController();
  const authMiddleware = new AuthMiddleware();
  const router = Router();

  router.get(
    "/profile",
    authMiddleware.verifyAccessToken,
    errorHandler(userController.getProfile)
  );
  router.get(
    "/",
    authMiddleware.verifyAccessToken,
    errorHandler(userController.getUsers)
  );
  router.get(
    "/:userID",
    authMiddleware.verifyAccessToken,
    errorHandler(userController.getUser)
  );
  router.put(
    "/profile",
    authMiddleware.verifyAccessToken,
    errorHandler(userController.updateUser)
  );

  return router;
};

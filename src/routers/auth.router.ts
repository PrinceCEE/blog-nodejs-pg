import { Router } from "express";
import { AuthController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const authController = new AuthController();
  const router = Router();

  router.post("/register", errorHandler(authController.register));
  router.post("/login", errorHandler(authController.login));
  router.post("/forgot-password", errorHandler(authController.forgotPassword));
  router.post("/change-password", errorHandler(authController.changePassword));

  return router;
};

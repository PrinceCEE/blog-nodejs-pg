import { Router } from "express";
import { AuthController } from "src/controllers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const authController = new AuthController();
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/forgot-password", authController.forgotPassword);
  router.post("/change-password", authController.changePassword);

  return router;
};

import { Router } from "express";
import { UserController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { UserMiddleware } from "src/middlewares";

export default () => {
  const userController = new UserController();
  const router = Router();

  router.get("/profile", errorHandler(userController.getProfile));
  router.get("/", errorHandler(userController.getUsers));
  router.get("/:userID", errorHandler(userController.getUser));
  router.put("/:userID", errorHandler(userController.updateUser));

  return router;
};

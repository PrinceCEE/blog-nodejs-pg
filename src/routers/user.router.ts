import { Router } from "express";
import { UserController } from "src/controllers";
import { UserMiddleware } from "src/middlewares";

export default () => {
  const userController = new UserController();
  const router = Router();

  router.get("/profile", userController.getProfile);
  router.get("/", userController.getUsers);
  router.get("/:userID", userController.getUser);
  router.put("/:userID", userController.updateUser);

  return router;
};

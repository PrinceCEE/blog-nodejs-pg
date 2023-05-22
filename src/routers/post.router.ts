import { Router } from "express";
import { PostController } from "src/controllers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const router = Router();

  // set up the routes
  return router;
};

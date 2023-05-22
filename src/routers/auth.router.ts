import { Router } from "express";
import { AuthController } from "src/controllers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const router = Router();

  // set up the routes
  return router;
};

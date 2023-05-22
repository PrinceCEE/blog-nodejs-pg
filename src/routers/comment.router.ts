import { Router } from "express";
import { CommentController } from "src/controllers";
import { CommentMiddleware } from "src/middlewares";

export default () => {
  const router = Router();

  // set up the routes
  return router;
};

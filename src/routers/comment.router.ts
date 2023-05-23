import { Router } from "express";
import { CommentController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { CommentMiddleware } from "src/middlewares";

export default () => {
  const commentController = new CommentController();
  const router = Router();

  router.post("/new", errorHandler(commentController.createComment));
  router.put("/:commentID", errorHandler(commentController.updateComment));
  router.get("/:commentID", errorHandler(commentController.getComment));
  router.delete("/:commentID", errorHandler(commentController.deleteComment));

  return router;
};

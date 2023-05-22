import { Router } from "express";
import { CommentController } from "src/controllers";
import { CommentMiddleware } from "src/middlewares";

export default () => {
  const commentController = new CommentController();
  const router = Router();

  router.post("/new", commentController.createComment);
  router.put("/:commentID", commentController.updateComment);
  router.get("/:commentID", commentController.getComment);
  router.delete("/:commentID", commentController.deleteComment);

  return router;
};

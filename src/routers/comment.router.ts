import { Router } from "express";
import { CommentController } from "../controllers";
import { errorHandler } from "../helpers";
import { AuthMiddleware } from "../middlewares";

export default () => {
  const commentController = new CommentController();
  const authMiddleware = new AuthMiddleware();
  const router = Router();

  router.post(
    "/new",
    authMiddleware.verifyAccessToken,
    errorHandler(commentController.createComment)
  );
  router.put(
    "/:commentID",
    authMiddleware.verifyAccessToken,
    errorHandler(commentController.updateComment)
  );
  router.get(
    "/:commentID",
    authMiddleware.verifyAccessToken,
    errorHandler(commentController.getComment)
  );
  router.delete(
    "/:commentID",
    authMiddleware.verifyAccessToken,
    errorHandler(commentController.deleteComment)
  );

  return router;
};

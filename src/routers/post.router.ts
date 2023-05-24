import { Router } from "express";
import { PostController } from "../controllers";
import { errorHandler } from "../helpers";
import { AuthMiddleware } from "../middlewares";

export default () => {
  const postController = new PostController();
  const authMiddleware = new AuthMiddleware();
  const router = Router();

  router.post(
    "/new",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.createPost)
  );
  router.put(
    "/:postID",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.updatePost)
  );
  router.get(
    "/",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.getAllPosts)
  );
  router.get(
    "/:postID",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.getPost)
  );
  router.get(
    "/:postID/comments",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.getPostComments)
  );
  router.delete(
    "/:postID",
    authMiddleware.verifyAccessToken,
    errorHandler(postController.deletePost)
  );

  return router;
};

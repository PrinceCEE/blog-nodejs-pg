import { Router } from "express";
import { PostController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const postController = new PostController();
  const auhtMiddleware = new AuthMiddleware();
  const router = Router();

  router.post(
    "/new",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.createPost)
  );
  router.put(
    "/:postID",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.updatePost)
  );
  router.get(
    "/",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.getAllPosts)
  );
  router.get(
    "/:postID",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.getPost)
  );
  router.get(
    "/:postID/comments",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.getPostComments)
  );
  router.delete(
    "/:postID",
    auhtMiddleware.verifyAccessToken,
    errorHandler(postController.deletePost)
  );

  return router;
};

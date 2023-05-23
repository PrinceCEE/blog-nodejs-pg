import { Router } from "express";
import { PostController } from "src/controllers";
import { errorHandler } from "src/helpers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const postController = new PostController();
  const router = Router();

  router.post("/new", errorHandler(postController.createPost));
  router.put("/:postID", errorHandler(postController.updatePost));
  router.get("/", errorHandler(postController.getAllPosts));
  router.get("/:postID", errorHandler(postController.getPost));
  router.get("/:postID/comments", errorHandler(postController.getPostComments));
  router.delete("/:postID", errorHandler(postController.deletePost));

  return router;
};

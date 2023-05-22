import { Router } from "express";
import { PostController } from "src/controllers";
import { AuthMiddleware } from "src/middlewares";

export default () => {
  const postController = new PostController();
  const router = Router();

  router.post("/new", postController.createPost);
  router.put("/:postID", postController.updatePost);
  router.get("/", postController.getAllPosts);
  router.get("/:postID", postController.getPost);
  router.get("/:postID/comments", postController.getPostComments);
  router.delete("/:postID", postController.deletePost);

  return router;
};

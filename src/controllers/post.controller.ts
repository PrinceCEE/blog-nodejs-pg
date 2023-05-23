import { deletedObject, getObjects, insertObject, updateObject } from "src/db";
import { BadRequestError, NotFoundError } from "src/errors";
import { IResponse, Post, Req, Comment } from "src/types";
import { CreatePostSchema } from "src/validators/post.validator";

export default class PostController {
  createPost = async (req: Req): Promise<IResponse> => {
    const user = req.user;
    const { value, error } = CreatePostSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }
    const post = await insertObject<Post>("posts", {
      content: value.content,
      userID: user.userID,
    });

    if (!post) {
      throw new BadRequestError("Error creating post");
    }

    return {
      status: true,
      message: "Post created successfully",
      data: post,
    };
  };

  updatePost = async (req: Req): Promise<IResponse> => {
    const postID = req.params.postID;
    const { error, value } = CreatePostSchema.validate(req.body);
    if (!error) {
      throw new BadRequestError(error.message);
    }

    const post = await updateObject<Post>(
      "posts",
      {
        postID,
      },
      value
    );
    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return {
      status: true,
      message: "Post successfully updated",
      data: post,
    };
  };

  getAllPosts = async (req: Req): Promise<IResponse> => {
    const posts = await getObjects<Post>("posts", {});
    return {
      status: true,
      message: "Posts fetched successfully",
      data: posts,
    };
  };

  getPost = async (req: Req): Promise<IResponse> => {
    const post = await getObjects<Post>("posts", {
      postID: req.body.postID,
    });

    if (!post) {
      throw new NotFoundError("Post not found");
    }

    return {
      status: true,
      message: "Post successfully fetched",
      data: post,
    };
  };

  deletePost = async (req: Req): Promise<IResponse> => {
    await deletedObject<Post>("posts", {
      postID: req.params.postID,
    });

    return {
      status: true,
      message: "Post deleted successfully",
    };
  };

  getPostComments = async (req: Req): Promise<IResponse> => {
    const comments = getObjects<Comment>("comments", {
      postID: req.params.postID,
    });

    return {
      status: true,
      message: "Fetched post comments successfully",
      data: comments,
    };
  };
}

import { deletedObject, getObjects, insertObject, updateObject } from "../db";
import { BadRequestError } from "../errors";
import { IResponse, Req, Comment } from "../types";
import { CreateCommentSchema, UpdateCommentSchema } from "../validators";

export default class CommentController {
  createComment = async (req: Req): Promise<IResponse> => {
    const user = req.user;
    const { error, value } = CreateCommentSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const comment = await insertObject<Comment>("comments", {
      content: value.content,
      postID: value.postID,
      userID: user.userID,
    });

    if (!comment) {
      throw new BadRequestError("Error adding comment");
    }

    return {
      status: true,
      message: "Comment successfully added",
      data: comment,
    };
  };

  updateComment = async (req: Req): Promise<IResponse> => {
    const { value, error } = UpdateCommentSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.message);
    }

    const comment = await updateObject<Comment>(
      "comments",
      {
        commentID: req.params.commentID,
      },
      value
    );

    return {
      status: true,
      message: "Updated comment successfully",
      data: comment,
    };
  };

  getComment = async (req: Req): Promise<IResponse> => {
    const comment = await getObjects<Comment>("comments", {
      commentID: req.params.commentID,
    }).then((rows) => rows[0]);

    return {
      status: true,
      message: "Fetched comment successfully",
      data: comment,
    };
  };

  deleteComment = async (req: Req): Promise<IResponse> => {
    await deletedObject<Comment>("comments", {
      commentID: req.params.commentID,
    });

    return {
      status: true,
      message: "Deleted comment successfully",
    };
  };
}

import Joi from "joi";
import { CreateCommentDto, UpdateCommentDto } from "../dtos";

const joiStr = Joi.string();

export const CreateCommentSchema = Joi.object<CreateCommentDto>({
  content: joiStr.required(),
  postID: joiStr.required(),
});

export const UpdateCommentSchema = Joi.object<UpdateCommentDto>({
  content: joiStr.required(),
});

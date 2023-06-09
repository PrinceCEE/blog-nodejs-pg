import Joi from "joi";
import { CreatePostDto } from "../dtos";

const joiStr = Joi.string();

export const CreatePostSchema = Joi.object<CreatePostDto>({
  content: joiStr.required(),
});

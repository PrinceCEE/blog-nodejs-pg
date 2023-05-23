import Joi from "joi";
import { CreatePostDto } from "src/dtos";

const joiStr = Joi.string();

export const CreatePostSchema = Joi.object<CreatePostDto>({
  content: joiStr.required(),
});

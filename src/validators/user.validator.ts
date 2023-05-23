import Joi from "joi";
import { UpdateUserDto } from "src/dtos";

const joiStr = Joi.string();

export const UpdateUserSchema = Joi.object<UpdateUserDto>({
  firstName: joiStr,
  lastName: joiStr,
  email: joiStr.email(),
});

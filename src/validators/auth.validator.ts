import Joi from "joi";
import {
  ChangePasswordDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
} from "../dtos";

const joiStr = Joi.string();

export const RegisterSchema = Joi.object<RegisterDto>({
  firstName: joiStr.required(),
  lastName: joiStr.required(),
  email: joiStr.email().required(),
  password: joiStr.min(8).required(),
});

export const LoginSchema = Joi.object<LoginDto>({
  email: joiStr.email().required(),
  password: joiStr.required(),
});

export const ForgotPasswordSchema = Joi.object<ForgotPasswordDto>({
  email: joiStr.email().required(),
});

export const ChangePasswordSchema = Joi.object<ChangePasswordDto>({
  password: joiStr.min(8).required(),
  code: joiStr.length(6).required(),
  email: joiStr.email().required(),
});

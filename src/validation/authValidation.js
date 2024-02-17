import Joi from "joi";
import { isEmail, isPassword } from "./mainValidation.js";

export const loginValidation = Joi.object({
  email: isEmail,
  password: isPassword
});

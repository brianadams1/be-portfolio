import Joi from "joi";
import { isEmail, isPassword, isString100 } from "./mainValidation.js";

export const isUser = Joi.object({
  name: isString100.required().label("User Name"),
  email: isEmail.required().label("Email"),
  password: isPassword.label("Password"),
  confirm_password: isPassword
    .valid(Joi.ref("password"))
    .label("Password Confirm")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});

import Joi from "joi";
import { isEmail, isPassword } from "./mainValidation.js";

const loginValidation = Joi.object({
  email: isEmail,
  password: isPassword,
});

const updateUserValidation = Joi.object({
  name: Joi.string().trim().min(3).max(100).label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label("Email"),
  old_password: Joi.string().min(6).max(100).label("Current password"),
  password: Joi.string().min(6).max(100).label("Password"),
  password_confirm: Joi.string()
    .min(6)
    .max(100)
    .valid(Joi.ref("password"))
    .label("Password Confirm")
    .options({ messages: { "any.only": "{{#label}} not match" } }),
});

export { loginValidation, updateUserValidation };

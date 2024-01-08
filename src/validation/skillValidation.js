import Joi from "joi";
import { isString100 } from "./mainValidation.js";

export const isSkill = Joi.object({
    title: isString100.required().label("Title"),
    category: isString100.uppercase().required().label("Category"),
})
import Joi from "joi";
import { isString100, isText } from "./mainValidation.js";

export const isSkill = Joi.object({
    title: isString100.required().label("Title"),
    category: isString100.uppercase().required().label("Category"),
    svg: isText.label("SVG").allow(null,"")
})
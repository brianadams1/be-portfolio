import Joi from "joi";
import {  isString255 } from "./mainValidation.js";

const isBlogTitle = isString255.required().label("Title")
const isBlogContent = Joi.string().min(3).required().label("Content")
// OBJECT VALIDATION
const isBlog = Joi.object({
    title: isBlogTitle,
    content: isBlogContent,
    photos: Joi.array().items(Joi.number())
  });

export {
    isBlog,
    isBlogTitle
}
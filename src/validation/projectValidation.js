import Joi from "joi";
import { isString100, isString255, isText, isURI } from "./mainValidation.js";

export const isProject = Joi.object({
  title: isString255.required().label("Title"),
  description: isText.required().label("Description"),
  startDate: Joi.date().max("now").required().label("Start Date"),
  endDate: Joi.date()
    .min(Joi.ref("startDate"))
    .max("now")
    .label("Start Date")
    .allow(null, ""),
  status: Joi.string()
    .valid("ON_PROGRESS", "MAINTENANCE", "COMPLETE")
    .label("Project Status"),
  url: isURI.label("URL").allow(null, ""),
  github: isURI.label("Github").allow(null, ""),
  gitlab: isURI.label("Github").allow(null, ""),
  company: isString100.label("Company").allow(null, ""),
  photos: Joi.array().items(Joi.number()),
  skills: Joi.array().items(Joi.number())
});

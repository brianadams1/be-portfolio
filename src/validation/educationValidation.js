import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

// OBJECT VALIDATION
const isEducation = Joi.object({
  institutionName: isString100.required().label("Institution Name"),
  startYear: isYear.required().label("Start Year"),
  endYear: isYear.label("End Year").allow(""),
  major: Joi.string().trim().label("Major").allow(""),
  degree: Joi.string().trim().label("Degree").allow(""),
});

export { isEducation };

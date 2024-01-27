import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

// OBJECT VALIDATION

const isEducation = Joi.object({
  institutionName: isString100.required().label("Institution Name"),
  startYear: isYear.required().label("Start Year"),
  endYear: isYear.label("End Year").allow(null, ""),
  major: Joi.string().trim().label("Major").allow(null, ""),
  degree: Joi.string().trim().label("Degree").allow(null, ""),
});

export { isEducation };

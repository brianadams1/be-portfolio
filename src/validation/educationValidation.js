import Joi from "joi";
import { isString100, isYear } from "./mainValidation.js";

// OBJECT VALIDATION
const isEducation = Joi.object({
    institutionName: isString100.required().label("Institution Name"),
    startYear: isYear.required().label("Start Year"),
    endYear: isYear,
    major: isString100,
    degree: isString100
  });

export {
    isEducation
}
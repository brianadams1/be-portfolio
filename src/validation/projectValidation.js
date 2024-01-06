import Joi from "joi";
import { isString100, isString255, isText, isURI } from "./mainValidation.js";

export const isProject = Joi.object({
    title: isString255.required().label("Title"),
    description: isText.required().label("Description"),
    startDate: Joi.date().less('now').required().label("Start Date"),
    endDate: Joi.date().less('now').label("Start Date"),
    status: Joi.string().valid('ON_PROGRESS', 'MAINTENANCE', 'COMPLETE').label("Project Status"),
    url: isURI.label("URL"),
    github: isURI.label("Github"),
    gitlab: isURI.label("Github"),
    company: isString100.label("Company")
    
})
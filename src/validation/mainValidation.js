import Joi from "joi";
// import JoiDate from '@hapi/joi-date'
const isID = Joi.number().positive().required().label("ID");
const isString100 =  Joi.string().trim().min(3).max(100)
const isString255 =  Joi.string().trim().min(3).max(255)
const maxYear = new Date().getFullYear();
const isEmail = Joi.string().email();
const isPassword = Joi.string().min(6).max(100).required();

const isYear = Joi.number().positive().max(maxYear)
const isText = Joi.string().trim().min(3)
const isURI = Joi.string().trim().uri()

// const isDate = Joi.date()

export {
    isID, isString100, isString255, isYear, isText, isURI, isEmail, isPassword
};

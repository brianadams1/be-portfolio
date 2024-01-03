import Joi from "joi";
// import JoiDate from '@hapi/joi-date'

const isID = Joi.number().positive().required().label("ID");
const isString100 =  Joi.string().trim().min(3).max(100)
const isString255 =  Joi.string().trim().min(3).max(255)
const isYear = Joi.number().positive()
// const isDate = Joi.date()

export {
    isID, isString100, isString255, isYear
};

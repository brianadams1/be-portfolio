import Joi from "joi";

const isID = Joi.number().positive().required().label("ID");

export { isID };

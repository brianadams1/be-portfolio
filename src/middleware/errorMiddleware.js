import Joi from "joi";
import { ResponseError } from "../error/responseError.js";

export const errorAgain = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  // RESPONSE ERROR

  if(err instanceof ResponseError){
    return res.status(err.status).json({
      message: err.message
    })
  }
  // JOI VALIDATION ERROR
  if (err instanceof Joi.ValidationError) {
    return res
      .status(400)
      .json({
        message: err.message,
      });
  }
  res.status(500).json({
    message: err.message,
  });
};

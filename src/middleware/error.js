import Joi from "joi";

export const errorAgain = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if (err instanceof Joi.ValidationError) {
    return res
      .status(400)
      .json({
        message: err.message,
      })
      .end();
  }
  res.status(500).json({
    message: err.message,
  });
};

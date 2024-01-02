import { JoiError } from "../app/validate.js";

export const errorAgain = (err, req, res, next) => {
    if (!err) {
    return next();
  }
  if (err instanceof JoiError) {
    res
      .status(err.status)
      .json({
        message: err.message,
      })
      .end();
  } else {
    res.status(500).json({
      message: err.message,
    });
  }
};

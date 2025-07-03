import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        field: el.path,
        message: el.message,
        value: el.value,
      };
    }
  );

  const statusCode = 400;
  const message = "Validation failed";

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleValidationError;

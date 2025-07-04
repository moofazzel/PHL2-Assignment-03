import mongoose from "mongoose";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errors = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      // Special handling for ISBN validation errors
      if (el.path === "isbn") {
        return {
          field: "isbn",
          message: el.message,
          value: el.value,
          help: 'ISBN should be 10 or 13 digits long. You can include hyphens or spaces (e.g., "0-7475-3269-9" or "978-0-7475-3269-9")',
        };
      }
      return {
        field: el.path,
        message: el.message,
        value: el.value,
      };
    }
  );

  const statusCode = 400;
  // Customize message if it's only ISBN validation error
  const message =
    errors.length === 1 && errors[0].field === "isbn"
      ? "ISBN validation failed"
      : "Validation failed";

  return {
    statusCode,
    message,
    errorMessages: errors,
  };
};

export default handleValidationError;

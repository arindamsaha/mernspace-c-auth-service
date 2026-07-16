import { checkSchema } from "express-validator";

//export default [body("email").isEmail().withMessage("email is required")];

export default checkSchema({
  email: {
    errorMessage: 'email is required',
    notEmpty: true,
    trim: true,
    isEmail: {
      errorMessage: 'Please provide a valid email address',
    },
  },
  password: {
    errorMessage: 'Password is required',
    notEmpty: true,
  }
});
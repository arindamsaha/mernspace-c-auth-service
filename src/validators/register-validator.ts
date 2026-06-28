import { body, checkSchema } from "express-validator";

//export default [body("email").isEmail().withMessage("email is required")];

export default checkSchema({
  email: {
    errorMessage: 'email is required',
    notEmpty: true,
  }
});
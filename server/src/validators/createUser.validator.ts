import { checkSchema } from "express-validator";

const userSchema = {
  username: {},
};

const validateCreateUser = checkSchema(userSchema, ["body"]);

export default validateCreateUser;

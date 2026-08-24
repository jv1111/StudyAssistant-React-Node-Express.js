import * as yup from "yup";

import passwordValidation from "./password.validationSchema";

const UserValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  password: passwordValidation,
});

export default UserValidationSchema;

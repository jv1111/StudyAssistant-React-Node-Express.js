import * as yup from "yup";

import passwordValidation from "./password.validationSchema";

const PasswordResetValidationSchema = yup.object().shape({
  password: passwordValidation,

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default PasswordResetValidationSchema;

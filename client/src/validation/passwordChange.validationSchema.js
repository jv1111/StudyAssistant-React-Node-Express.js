import * as yup from "yup";

import passwordValidation from "./password.validationSchema";

const ChangePassValidationSchema = yup.object().shape({
  oldPassword: yup.string().required("Old password is required"),

  newPassword: passwordValidation,

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export default ChangePassValidationSchema;

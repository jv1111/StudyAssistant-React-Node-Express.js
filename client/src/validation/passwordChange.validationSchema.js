import * as yup from "yup";

import passwordValidation from "./password.validationSchema";

const ChangePassValidationSchema = yup.object().shape({
  currentPassword: yup.string().required("Please enter your current password"),

  newPassword: passwordValidation,

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export default ChangePassValidationSchema;

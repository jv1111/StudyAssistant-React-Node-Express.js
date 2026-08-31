const yup = require("yup");

const passwordSchema = yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase")
  .matches(/[a-z]/, "Password must contain at least one lowercase")
  .matches(/[0-9]/, "Password must contain at least one number")
  .required("Password is required");

const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  password: passwordSchema,
});

const loginSchema = yup.object({
  usernameOrEmail: yup
    .string()
    .trim()
    .required("Username or email is required"),

  password: yup.string().required("Password is required"),
});

const changePassSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),

  newPassword: passwordSchema.notOneOf(
    [yup.ref("currentPassword")],
    "New password must be different from current password",
  ),
});

module.exports = {
  passwordSchema,
  registerSchema,
  loginSchema,
  changePassSchema,
};

import * as yup from "yup";

const PassValidationSchema = yup.object().shape({

    newPassword: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase')
        .matches(/[a-z]/, 'Password must contain at least one lowercase')
        .matches(/(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]/, 'Password must be alphanumeric')
        .required('Password is required'),

    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
});

export default PassValidationSchema;

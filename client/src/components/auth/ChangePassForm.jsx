import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import ChangePassValidationSchema from "../../validation/ChangePassValidationSchema.js";
import { changePasswordAPI } from "../../api/user.api.js";

const ChangePassForm = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const submitHandler = async (data, resetForm) => {
    const response = await changePasswordAPI(data);

    if (response.error) {
      alert(response.error);
      return;
    }

    alert("Password changed successfully.");
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ChangePassValidationSchema}
      onSubmit={async (data, { setSubmitting, resetForm }) => {
        await submitHandler(data, resetForm);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="profile-form">
          <div className="profile-form-fields">
            <FormikTextField
              type="password"
              name="oldPassword"
              label="Old password"
            />

            <FormikTextField
              type="password"
              name="newPassword"
              label="New password"
            />

            <FormikTextField
              type="password"
              name="confirmPassword"
              label="Confirm password"
            />
          </div>

          <footer className="profile-form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </button>
          </footer>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassForm;

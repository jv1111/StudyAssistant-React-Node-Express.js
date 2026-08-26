import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";

import ChangePassValidationSchema from "../../validation/passwordChange.validationSchema.js";

const ChangePassForm = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const submitHandler = async (data, resetForm) => {};

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
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FormikTextField
              type="password"
              name="oldPassword"
              label="Current Password"
              placeholder="••••••••"
            />

            <FormikTextField
              type="password"
              name="newPassword"
              label="New Password"
              placeholder="••••••••"
            />

            <FormikTextField
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end border-t border-border pt-4">
            <Button type="submit" fit disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassForm;

import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";

import ChangePassValidationSchema from "../../validation/ChangePassValidationSchema.js";

const ChangePassForm = () => {
  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const submitHandler = async (data, resetForm) => {
    
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
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
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

          <div className="flex justify-end">
            <Button type="submit" fit disabled={isSubmitting}>
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePassForm;

import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";

const AddPasswordForm = ({ onSubmit }) => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FormikTextField
              type="password"
              name="password"
              label="Password"
              placeholder="••••••••"
            />

            <FormikTextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
            />
          </div>

          <div className="flex justify-end border-t border-border pt-4">
            <Button type="submit" fit disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Password"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddPasswordForm;

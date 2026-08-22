import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";

import { updateEmailAPI } from "../../api/user.api";

const EmailForm = ({ email }) => {
  const initialValues = {
    email: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      setStatus("");

      const response = await updateEmailAPI(values.email);

      if (response.error) {
        setStatus(response.error);
        return;
      }

      if (response.success) {
        alert("Email request sent.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, status }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <FormikTextField
              type="email"
              name="email"
              label="Email"
              placeholder={email || "Enter your email address"}
            />

            {status && (
              <p className="text-sm text-danger" role="alert">
                {status}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit" fit disabled={isSubmitting}>
              {isSubmitting
                ? "Sending..."
                : email
                  ? "Change Email"
                  : "Add Email"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailForm;

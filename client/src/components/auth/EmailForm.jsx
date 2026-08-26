import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

import FormikTextField from "../forms/FormikTextField";
import Button from "../common/Button";

import { sendEmailVerificationAPI } from "../../api/emailVerification.api";

const EmailForm = ({ email }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!email);

  const initialValues = {
    email: "",
  };

  const handleSendVerification = async (
    values,
    { setSubmitting, setFieldError },
  ) => {
    try {
      const type = email ? "update" : "add";

      const response = await sendEmailVerificationAPI(values.email, type);

      if (!response.success) {
        setFieldError("email", response.message);
        return;
      }

      navigate("/verify-email", {
        state: {
          email: response.email,
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return isEditing || !email ? (
    <Formik initialValues={initialValues} onSubmit={handleSendVerification}>
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            {email && (
              <div className="rounded-xl border border-border bg-background-secondary/60 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Current Email
                </p>

                <p className="mt-1 break-all text-sm font-medium text-foreground">
                  {email}
                </p>
              </div>
            )}

            <FormikTextField
              type="email"
              name="email"
              label={email ? "New Email" : "Email Address"}
              placeholder="e.g. name@example.com"
            />

            <p className="text-xs text-muted">
              A verification code will be dispatched to this email address.
            </p>
          </div>

          <div className="flex justify-end gap-3 border-t border-border pt-4">
            {email && (
              <Button
                type="button"
                variant="ghost"
                fit
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            )}

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
  ) : (
    <div className="flex flex-col gap-5">
      <div className="rounded-xl border border-border bg-background-secondary/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Current Email
        </p>

        <p className="mt-1 break-all text-sm font-medium text-foreground">
          {email}
        </p>
      </div>

      <div className="flex justify-end border-t border-border pt-4">
        <Button type="button" fit onClick={() => setIsEditing(true)}>
          Change Email
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;

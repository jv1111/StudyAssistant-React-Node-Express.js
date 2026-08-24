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
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted">
                  Current email
                </p>

                <p className="mt-1 break-all text-sm text-foreground">
                  {email}
                </p>
              </div>
            )}

            <FormikTextField
              type="email"
              name="email"
              label={email ? "New email" : "Email"}
              placeholder="Enter your email address"
            />

            <p className="text-xs leading-relaxed text-muted">
              A verification code will be sent to this email address.
            </p>
          </div>

          <div className="flex justify-end gap-2">
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
      <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          Current email
        </p>

        <p className="mt-1 break-all text-sm font-medium text-foreground">
          {email}
        </p>
      </div>

      <div className="flex justify-end">
        <Button type="button" fit onClick={() => setIsEditing(true)}>
          Change Email
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;

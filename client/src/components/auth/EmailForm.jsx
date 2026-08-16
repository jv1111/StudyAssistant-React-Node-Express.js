import { useState } from "react";

import { updateEmailAPI } from "../../api/user.api";
import FormTextField from "../forms/FormTextField";

const EmailForm = ({ email }) => {
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setEmailError("");

    const response = await updateEmailAPI(newEmail);

    if (response.error) {
      setEmailError(response.error);
    }

    if (response.success) {
      alert("Email request sent.");
    }

    setTimeout(() => {
      setSubmitting(false);
    }, 5000);
  };

  return (
    <form className="profile-form" onSubmit={submitHandler}>
      <div className="profile-form-fields">
        <div className="form-field">
          <label htmlFor="email">Email</label>

          <FormTextField
            id="email"
            type="email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
            placeholder={email || "Enter your email address"}
            required
          />
        </div>

        {emailError && <p className="error-message">{emailError}</p>}
      </div>

      <footer className="profile-form-actions">
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Sending..." : email ? "Change Email" : "Add Email"}
        </button>
      </footer>
    </form>
  );
};

export default EmailForm;

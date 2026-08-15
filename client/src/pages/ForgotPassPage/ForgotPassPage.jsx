import { useState } from "react";

import FormTextField from "../../components/forms/FormTextField";
import { requestPasswordResetAPI } from "../../api/user.api";

const ForgotPassPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await requestPasswordResetAPI(email);

      if (response.error) {
        setErrorMessage(response.error);
        return;
      }

      if (response.success) {
        // Replace this with your preferred success UI later.
        alert("Password reset email sent");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgotPassPage page">
      <form className="forgotPassForm" onSubmit={handleSubmit}>
        <p className="description">
          A password reset link will be sent to your email.
        </p>

        <FormTextField
          type="email"
          name="email"
          label="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button
          className="btn-primary mt-1 w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send request"}
        </button>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassPage;

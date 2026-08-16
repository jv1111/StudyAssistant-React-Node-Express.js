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
        alert("Password reset email sent");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>A password reset link will be sent to your email.</p>

        <FormTextField
          type="email"
          name="email"
          label="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send request"}
        </button>

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassPage;

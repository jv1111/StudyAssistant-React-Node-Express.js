import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import env from "../../config/env";
import { googleLoginAPI } from "../../api/auth/auth.api";
import { login } from "../../redux/slice/authSlice";

import FeedbackModal from "../common/FeedbackModal";

const GoogleSignInButton = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: env.googleClientId,
        callback: async (response) => {
          try {
            const result = await googleLoginAPI(response.credential);

            console.log("Google login successful:", result);

            dispatch(login(result.user));
          } catch (error) {
            const message =
              error.response?.data?.message ||
              "Unable to sign in with Google. Please try again.";

            console.error("Google login failed:", message);

            setErrorMessage(message);
            setIsErrorModalOpen(true);
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        shape: "square",
      });
    };

    if (window.google) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");

    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;

    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [dispatch]);

  return (
    <>
      <div ref={buttonRef} />
      <FeedbackModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        type="error"
        title="Google Sign-In Failed"
        message={errorMessage}
      />
    </>
  );
};

export default GoogleSignInButton;

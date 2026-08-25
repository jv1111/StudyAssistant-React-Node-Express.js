import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import env from "../../config/env";
import { googleLoginAPI } from "../../api/auth.api";
import { login } from "../../redux/slice/authSlice";

const GoogleSignInButton = () => {
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google || !buttonRef.current) {
        return;
      }

      window.google.accounts.id.initialize({
        client_id: env.googleClientId,
        callback: async (response) => {
          console.log("Google credential:", response.credential);

          const result = await googleLoginAPI(response.credential);

          if (!result.success) {
            console.error("Google login failed:", result.message);
            return;
          }

          console.log("Google login successful:", result);

          dispatch(login(result.user));
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

  return <div ref={buttonRef} />;
};

export default GoogleSignInButton;

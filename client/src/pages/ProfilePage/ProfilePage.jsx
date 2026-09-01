import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateUser } from "../../redux/slice/authSlice";

import Card from "../../components/common/Card";
import ProfileImage from "../../components/profile/ProfileImage";
import ChangePassForm from "../../components/auth/ChangePassForm";
import EmailForm from "../../components/auth/EmailForm";
import AddPasswordForm from "../../components/auth/AddPasswordForm";
import Badge from "../../components/common/Badge";
import FeedbackModal from "../../components/common/FeedbackModal";

import { changeProfileAPI, getProfileImageAPI } from "../../api/user.api";

import { addPasswordAPI, changePassAPI } from "../../api/auth.api";

import { sendEmailVerificationAPI } from "../../api/emailVerification.api";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState(null);

  const [feedback, setFeedback] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  useEffect(() => {
    const getImage = async () => {
      const response = await getProfileImageAPI();

      if (response.url) {
        setImgSrc(response.url);
      }
    };

    getImage();
  }, []);

  const handleImageChange = async (file) => {
    const reader = new FileReader();

    reader.onload = (loadEvent) => {
      setImgSrc(loadEvent.target.result);
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("image", file);

    await changeProfileAPI(formData);
  };

  const handleChangePass = async (
    values,
    { setSubmitting, resetForm, setFieldError },
  ) => {
    try {
      await changePassAPI({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      resetForm();

      setFeedback({
        isOpen: true,
        type: "success",
        title: "Password Changed",
        message: "Your password has been successfully changed.",
      });
    } catch (error) {
      const message = error.response?.data?.message;

      setFieldError("currentPassword", message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddPassword = async (
    values,
    { setSubmitting, resetForm, setFieldError },
  ) => {
    try {
      await addPasswordAPI(values.password);

      dispatch(
        updateUser({
          hasPassword: true,
        }),
      );

      resetForm();

      setFeedback({
        isOpen: true,
        type: "success",
        title: "Password Added",
        message: "Your password has been successfully added to your account.",
      });
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add password";

      setFieldError("password", message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendVerification = async (
    values,
    { setSubmitting, setFieldError },
  ) => {
    try {
      const type = user?.email ? "update" : "add";

      const response = await sendEmailVerificationAPI(values.email, type);

      if (!response.email) {
        const message =
          response.message || "Failed to send verification email.";

        setFieldError("email", message);

        setFeedback({
          isOpen: true,
          type: "error",
          title: "Verification Failed",
          message,
        });

        return;
      }

      navigate("/verify-email", {
        state: {
          email: response.email,
        },
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send verification email.";

      setFieldError("email", message);

      setFeedback({
        isOpen: true,
        type: "error",
        title: "Verification Failed",
        message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseFeedback = () => {
    setFeedback((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="flex h-full flex-col">
      <header className="mb-8 mt-4 flex h-fit shrink-0 flex-col gap-4">
        <div>
          <Badge variant="primary" shape="rounded">
            Account Settings
          </Badge>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Profile Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Manage your personal details, profile picture, and account
            credentials.
          </p>
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-12">
        <Card className="card-base">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <ProfileImage imgSrc={imgSrc} onChange={handleImageChange} />

            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Active Account
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                {user?.username}
              </h2>

              <p className="text-sm text-muted">
                Manage your credentials and security details below.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="card-base">
            <header className="mb-6 border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                {user?.hasPassword ? "Change Password" : "Add Password"}
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                {user?.hasPassword
                  ? "Update your security password to keep your account safe."
                  : "Add a password to your account for password-based sign in."}
              </p>
            </header>

            {user?.hasPassword ? (
              <ChangePassForm onSubmit={handleChangePass} />
            ) : (
              <AddPasswordForm onSubmit={handleAddPassword} />
            )}
          </Card>

          <Card className="card-base h-fit">
            <header className="mb-6 border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                Email Address
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                {user?.email
                  ? "Manage the verified email address linked to your account."
                  : "Add an email address to secure recovery access."}
              </p>
            </header>

            <EmailForm email={user?.email} onSubmit={handleSendVerification} />
          </Card>
        </div>
      </div>

      <FeedbackModal
        isOpen={feedback.isOpen}
        onClose={handleCloseFeedback}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
      />
    </div>
  );
};

export default ProfilePage;

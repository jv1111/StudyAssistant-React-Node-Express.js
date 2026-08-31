import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Card from "../../components/common/Card";
import ProfileImage from "../../components/profile/ProfileImage";
import ChangePassForm from "../../components/auth/ChangePassForm";
import EmailForm from "../../components/auth/EmailForm";
import Badge from "../../components/common/Badge";

import {
  changePassAPI,
  changeProfileAPI,
  getProfileImageAPI,
} from "../../api/user.api";

import { sendEmailVerificationAPI } from "../../api/emailVerification.api";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      const response = await getProfileImageAPI();

      if (response.url) {
        setImgSrc(`${import.meta.env.VITE_API_API_URL}${response.url}`);
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
    { setSubmitting, resetForm, setFieldError, setFieldValue },
  ) => {
    try {
      await changePassAPI({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      resetForm();
    } catch (error) {
      const message = error.response?.data?.message;

      setFieldError("currentPassword", message);
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
                Change Password
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                Update your security password to keep your account safe.
              </p>
            </header>

            <ChangePassForm onSubmit={handleChangePass} />
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
    </div>
  );
};

export default ProfilePage;

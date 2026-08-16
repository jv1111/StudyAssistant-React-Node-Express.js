import { useSelector } from "react-redux";

import ProfileImage from "../../components/profile/ProfileImage";
import ChangePassForm from "../../components/auth/ChangePassForm";
import EmailForm from "../../components/auth/EmailForm";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <section className="profile-page" aria-labelledby="profile-title">
      <header className="profile-page-header">
        <span className="form-eyebrow">ACCOUNT SETTINGS</span>

        <h1 id="profile-title" className="profile-page-title">
          Profile
        </h1>

        <p className="profile-page-description">
          Manage your profile information and account security.
        </p>
      </header>

      <div className="profile-content">
        <article className="profile-card profile-overview">
          <div className="profile-image-wrapper">
            <ProfileImage />
          </div>

          <div className="profile-overview-info">
            <span className="profile-label">USERNAME</span>

            <h2>{user.username}</h2>

            <p>Manage your account information below.</p>
          </div>
        </article>

        <div className="profile-settings">
          <article className="profile-card">
            <header className="profile-card-header">
              <div>
                <h2>Change Password</h2>

                <p>Update your password to keep your account secure.</p>
              </div>
            </header>

            <ChangePassForm />
          </article>

          <article className="profile-card">
            <header className="profile-card-header">
              <div>
                <h2>Email Address</h2>

                <p>
                  {user.email
                    ? "Update the email address associated with your account."
                    : "Add an email address to your account."}
                </p>
              </div>
            </header>

            <EmailForm email={user.email} />
          </article>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

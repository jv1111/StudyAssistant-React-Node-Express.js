import { useSelector } from "react-redux";

import Card from "../../components/common/Card";
import ProfileImage from "../../components/profile/ProfileImage";
import ChangePassForm from "../../components/auth/ChangePassForm";
import EmailForm from "../../components/auth/EmailForm";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <main className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10">
      <header className="mb-8">
        <span className="text-xs font-medium uppercase tracking-wider text-primary">
          Account Settings
        </span>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Profile
        </h1>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          Manage your profile information and account security.
        </p>
      </header>

      <div className="flex flex-col gap-5">
        <Card>
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ProfileImage />

            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                Username
              </span>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                {user.username}
              </h2>

              <p className="mt-1 text-sm text-muted">
                Manage your account information below.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Card>
            <header className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Change Password
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                Update your password to keep your account secure.
              </p>
            </header>

            <ChangePassForm />
          </Card>

          <Card className="h-fit">
            <header className="mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Email Address
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                {user.email
                  ? "Update the email address associated with your account."
                  : "Add an email address to your account."}
              </p>
            </header>
            <EmailForm email={user.email} />
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

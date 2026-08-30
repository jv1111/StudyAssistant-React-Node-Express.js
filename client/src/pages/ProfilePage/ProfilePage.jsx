import { useSelector } from "react-redux";

import Card from "../../components/common/Card";
import ProfileImage from "../../components/profile/ProfileImage";
import ChangePassForm from "../../components/auth/ChangePassForm";
import EmailForm from "../../components/auth/EmailForm";
import Badge from "../../components/common/Badge";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      {/* Page Header */}
      <header className="mb-8">
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
      </header>

      <div className="flex flex-col gap-6">
        {/* User Identity Banner Card */}
        <Card className="card-base">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <ProfileImage />

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

        {/* Account Credentials Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Security / Password Section */}
          <Card className="card-base">
            <header className="mb-6 border-b border-border pb-4">
              <h2 className="text-lg font-bold text-foreground">
                Change Password
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-muted">
                Update your security password to keep your account safe.
              </p>
            </header>

            <ChangePassForm />
          </Card>

          {/* Email Address Section */}
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

            <EmailForm email={user?.email} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

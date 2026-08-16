import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="auth-layout">
      <div className="container py-5">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;

import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-6xl">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;

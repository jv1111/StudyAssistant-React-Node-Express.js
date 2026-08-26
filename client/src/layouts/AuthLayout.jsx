import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;

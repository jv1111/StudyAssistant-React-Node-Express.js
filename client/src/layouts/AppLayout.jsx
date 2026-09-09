import { Outlet } from "react-router-dom";
import Navigation from "../components/common/Navigation";
import SessionExpiredModal from "../components/common/SessionExpiredModal";

const AppLayout = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <div className="min-h-screen md:pl-64">
        <main className="layout-container flex min-h-screen min-w-full">
          <Outlet />
        </main>
      </div>

      <SessionExpiredModal />
    </div>
  );
};

export default AppLayout;

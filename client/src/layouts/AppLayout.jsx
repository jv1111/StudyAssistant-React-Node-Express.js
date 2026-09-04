import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const AppLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex layout-container min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const AppLayout = () => {
  return (
    <div className="grid grid-rows-[auto_1fr] h-full">
      <Navbar />
      <main className="layout-container">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;

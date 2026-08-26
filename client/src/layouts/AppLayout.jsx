import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="layout-container py-8">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

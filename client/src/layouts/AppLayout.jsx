import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-8">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;

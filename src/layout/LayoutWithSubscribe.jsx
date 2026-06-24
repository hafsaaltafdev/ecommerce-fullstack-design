import Navbar from "../components/Navbar";
import Subscribe from "../components/Subscribe";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div className="bg-[#F7FAFC]">
        <Navbar />
        <div className=" flex flex-col gap-[10px] md:gap-[30px] inter-font md:mt-[20px]">
          <Outlet />
        </div>
        <div className="hidden md:block">
          <Subscribe />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
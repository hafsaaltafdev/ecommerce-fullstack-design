import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function LayoutWithoutSubscribe() {
  return (
    <div className="bg-[#F7FAFC]">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="flex flex-col gap-[10px] md:gap-[30px] inter-font md:mt-[20px]">
        <Outlet />
      </div>
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default LayoutWithoutSubscribe;
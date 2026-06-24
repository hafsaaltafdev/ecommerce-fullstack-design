import { useState } from "react";
import { Link } from "react-router-dom";
import Maskgroup from "../../assets/Maskgroup.png?url";
import { useNavigate } from "react-router-dom";


export default function Herosection() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("Automobiles");

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ];


  return (
    <div className="h-[180px] md:h-[400px] w-full md:w-[90%] max-w-[1440px] md:mx-auto md:py-[20px] md:pr-[14px] md:pl-[20px] border border-[#DEE2E7] rounded-lg shadow-sm bg-[#FFFFFF] md:flex md:justify-between">

      {/* Sidebar */}
      <div className="hidden md:block w-[20%]">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`h-[40px] w-full rounded text-left p-[10px] text-[16px] transition-colors ${activeCategory === category
              ? "bg-[#E5F1FF] text-black font-medium"
              : "text-[#505050] hover:bg-gray-50"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div className="w-full md:w-[60%] relative h-full md:h-[260px] md:h-auto">

        {/* Background Image */}
        <img
          src={Maskgroup}
          alt="img"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Text on image */}
        <div className="relative z-10 p-8 max-w-xs">
          <p className="text-[18px] md:text-[28px]">
            Latest trending
          </p>
          <h1 className="text-[18px] md:text-[32px] font-semibold mb-[17px]">
            Electronic items
          </h1>

          <button className="bg-white text-black text-[13px] md:text-[16px] font-medium px-[10px] md:px-[16px] py-[7px] md:py-[10px] rounded hover:bg-gray-50">
            Learn more
          </button>
        </div>

      </div>

      {/* Right Panel */}
      <div className="hidden md:block w-[18%] flex flex-col justify-between">
        {/* User greeting */}
        <div className="h-[150px] px-[12px] pb-[12px] pt-[16px] mb-[10px] flex flex-col justify-between items-start gap-[10px] bg-[#E3F0FF] rounded ">
          {user ? (
            <div>
              <div className="flex flex-col gap-1">
                <p className="text-[16px] font-semibold text-gray-800">Hi, {user.name}</p>
                <p className="text-[16px] text-gray-500 mb-2">Welcome back!</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mb-2 border-2 border-red-300 text-red-500 hover:bg-red-200 text-[14px] font-medium py-1.5 rounded transition-colors"
              >
                Logout
              </button>
              {role === "admin" && (
                <Link to="/admin/dashboard" className="w-full text-black text-[14px] font-medium">
                  ➡️ Admin Panel
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-[10px] ">
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84973 34.1503 0 22 0C9.84973 0 0 9.84973 0 22C0 34.1503 9.84973 44 22 44Z" fill="#C7E1FF" />
                  <mask id="mask0_1_1005" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-1" y="-1" width="46" height="46">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M22 44C34.1503 44 44 34.1503 44 22C44 9.84973 34.1503 0 22 0C9.84973 0 0 9.84973 0 22C0 34.1503 9.84973 44 22 44Z" fill="white" stroke="white" />
                  </mask>
                  <g mask="url(#mask0_1_1005)">
                    <path d="M17.1511 33.8012L11.3455 36.9234C11.0048 37.1065 8.31174 38.1996 8.02686 38.445C13.4141 42.5016 18.1687 43.4054 22.9427 43.4054C27.6814 43.4054 32.8948 40.8254 36.2701 38.05C35.9588 37.7908 34.7484 37.1485 34.374 36.9647L28.1572 33.9004C27.354 33.5044 26.8466 32.6951 26.8466 31.8097V29.4049C27.0213 29.2088 27.2211 28.9568 27.4347 28.6593C28.282 27.4794 28.923 26.1814 29.3672 24.8197C30.1646 24.5772 30.752 23.8512 30.752 22.9883V20.4213C30.752 19.8567 30.4972 19.3521 30.1015 18.9988V15.2881C30.1015 15.2881 30.8746 9.51355 22.9427 9.51355C15.0108 9.51355 15.7839 15.2881 15.7839 15.2881V18.9988C15.3874 19.3521 15.1334 19.8567 15.1334 20.4213V22.9883C15.1334 23.6644 15.4939 24.2594 16.0336 24.6033C16.6841 27.3954 18.3875 29.4049 18.3875 29.4049V31.7504C18.3868 32.6046 17.9125 33.3915 17.1511 33.8012Z" fill="white" />
                  </g>
                </svg>
                <div className="text-[16px] font-medium">
                  <p>Hi, user</p>
                  <p>let's get stated</p>
                </div>
              </div>
              <Link to="/signup" className="w-full h-[30px] flex justify-center items-center font-medium bg-[#0D78FF] hover:bg-blue-600 text-white text-[13px] rounded ">Join now</Link>
              <Link to="/login" className="w-full h-[30px] flex justify-center items-center font-medium bg-white text-[#0D78FF] hover:bg-blue-50 text-[13px] rounded ">Log in</Link>
            </>
          )}
        </div>

        {/* Promo card 1 */}
        <div className="h-[95px] p-[16px] bg-[#F38332] mb-[10px] flex items-center rounded">
          <p className="text-white text-[16px] text-start w-[140px] ">
            Get <span className="font-bold">US $10 off</span> with a new supplier
          </p>
        </div>

        {/* Promo card 2 */}
        <div className="h-[95px] p-[16px] bg-[#55BDC3] flex items-center rounded">
          <p className="text-white text-[16px] text-start w-[140px] ">
            Send quotes with supplier preferences
          </p>
        </div>
      </div>
    </div>
  );
}

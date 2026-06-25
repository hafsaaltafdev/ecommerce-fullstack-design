import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import icon from "../assets/icon.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = () => {
    let query = `/products?search=${search}`;

    if (category && category !== "All category") {
      query += `&category=${category}`;
    }

    navigate(query);
  };

  return (
    <div className="w-full bg-white">

      {/* ===== TOP NAV ===== */}
      <div className="w-full h-[86px] px-[16px] md:px-[70px] py-[20px] flex items-center justify-between md:border-b md:border-[#E0E0E0]">

        {/* Mobile: Hamburger + Logo */}
        <div className="flex items-center gap-3">
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#1C1C1C" />
            </svg>
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <path fillRule="evenodd" clipRule="evenodd" d="M14.4676 1.91309H37.185C40.9489 1.91309 44.0002 5.28555 44.0002 9.44569V34.5544C44.0002 38.7145 40.9489 42.087 37.185 42.087H14.4676C10.7036 42.087 7.65234 38.7145 7.65234 34.5544L7.65234 9.44569C7.65234 5.28555 10.7036 1.91309 14.4676 1.91309Z" fill="#0D6EFD" fillOpacity="0.2" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z" fill="#0D6EFD" />
                <g opacity="0.7">
                  <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M15.2898 18.3563H14.3092C14.2587 18.3563 14.1837 18.4266 14.1808 18.4731L13.4585 30.1478L26.9544 30.1452L26.2249 18.4731C26.2221 18.4284 26.1453 18.3563 26.0965 18.3563H25.116V20.3216C25.116 20.8643 24.676 21.3042 24.1334 21.3042C23.5907 21.3042 23.1507 20.8643 23.1507 20.3216V18.3563H17.255V20.3216C17.255 20.8643 16.8151 21.3042 16.2724 21.3042C15.7297 21.3042 15.2898 20.8643 15.2898 20.3216V18.3563Z" fill="white" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M20.203 11.4783C22.9151 11.4783 25.1162 13.6796 25.1162 16.3891L26.0967 16.3914C27.1832 16.3914 28.119 17.2704 28.1865 18.3508L28.9242 30.1539C28.9918 31.2361 28.1695 32.1133 27.0862 32.1133H13.3199C12.2372 32.1133 11.4144 31.2344 11.4819 30.1539L12.2196 18.3508C12.2872 17.2686 13.221 16.3914 14.3094 16.3914H15.2899C15.2899 13.6781 17.4928 11.4783 20.203 11.4783ZM23.1509 16.3915C23.1509 14.765 21.8297 13.4436 20.203 13.4436C18.5776 13.4436 17.2552 14.7642 17.2552 16.3892L23.1509 16.3915ZM15.2899 18.3566H14.3094C14.2589 18.3566 14.1839 18.4269 14.181 18.4733L13.4587 30.148L26.9546 30.1455L26.2251 18.4733C26.2223 18.4286 26.1454 18.3566 26.0967 18.3566H25.1162V20.3218C25.1162 20.8645 24.6762 21.3044 24.1335 21.3044C23.5908 21.3044 23.1509 20.8645 23.1509 20.3218V18.3566H17.2552V20.3218C17.2552 20.8645 16.8152 21.3044 16.2726 21.3044C15.7299 21.3044 15.2899 20.8645 15.2899 20.3218V18.3566Z" fill="white" />
                </g>
              </g>
            </svg>
            <svg width="77" height="22" viewBox="0 0 77 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20.8061H8.88934C13.5626 20.8061 16.0516 18.3679 16.0516 15.056C16.0516 11.9778 13.8471 10.1186 11.48 10.0069V9.80368C13.6439 9.31603 15.2389 7.78199 15.2389 5.33361C15.2389 2.21472 12.9226 0 8.33058 0H0V20.8061ZM4.39896 17.2098V11.6831H8.08676C10.1999 11.6831 11.5104 12.9022 11.5104 14.6192C11.5104 16.1837 10.4437 17.2098 7.98517 17.2098H4.39896ZM4.39896 8.70648V3.55574H7.74135C9.69192 3.55574 10.7993 4.5615 10.7993 6.06507C10.7993 7.71087 9.45826 8.70648 7.66007 8.70648H4.39896Z" fill="#8CB7F5" />
              <path d="M18.3046 20.8061H22.6324V11.9778C22.6324 10.0577 24.0344 8.73696 25.9443 8.73696C26.5437 8.73696 27.3666 8.83855 27.773 8.97062V5.13042C27.3869 5.03899 26.8485 4.97803 26.4116 4.97803C24.6642 4.97803 23.2318 5.99396 22.6629 7.92422H22.5003V5.20154H18.3046V20.8061Z" fill="#8CB7F5" />
              <path d="M33.4851 21.1008C35.7913 21.1008 37.2847 20.095 38.0466 18.6422H38.1686V20.8061H42.2729V10.2812C42.2729 6.56288 39.1235 4.99835 35.6491 4.99835C31.9105 4.99835 29.4519 6.78638 28.8525 9.63097L32.8553 9.95607C33.1499 8.91982 34.0744 8.15788 35.6287 8.15788C37.1018 8.15788 37.945 8.8995 37.945 10.1796V10.2405C37.945 11.2463 36.8783 11.3784 34.1658 11.6425C31.0774 11.927 28.3039 12.9632 28.3039 16.4478C28.3039 19.5362 30.5085 21.1008 33.4851 21.1008ZM34.7246 18.1139C33.3937 18.1139 32.4387 17.4942 32.4387 16.3056C32.4387 15.0865 33.4445 14.4871 34.9684 14.2737C35.9132 14.1417 37.4574 13.9182 37.9755 13.5728V15.2287C37.9755 16.8644 36.6243 18.1139 34.7246 18.1139Z" fill="#8CB7F5" />
              <path d="M49.4302 11.7847C49.4404 9.7732 50.6392 8.59473 52.3865 8.59473C54.1238 8.59473 55.1702 9.73256 55.16 11.6425V20.8061H59.4879V10.8704C59.4879 7.23339 57.3544 4.99835 54.1035 4.99835C51.7872 4.99835 50.1109 6.13619 49.4099 7.95469H49.227V5.20154H45.1024V20.8061H49.4302V11.7847Z" fill="#8CB7F5" />
              <path d="M68.1208 21.0601C70.6403 21.0601 71.9509 19.6074 72.5502 18.307H72.7331V20.8061H77V0H72.6823V7.82262H72.5502C71.9712 6.55272 70.7216 4.99835 68.1106 4.99835C64.687 4.99835 61.7916 7.66008 61.7916 13.0242C61.7916 18.246 64.5651 21.0601 68.1208 21.0601ZM69.4923 17.6161C67.369 17.6161 66.2109 15.7265 66.2109 13.0038C66.2109 10.3015 67.3487 8.44234 69.4923 8.44234C71.5953 8.44234 72.7738 10.2202 72.7738 13.0038C72.7738 15.7875 71.575 17.6161 69.4923 17.6161Z" fill="#8CB7F5" />
            </svg>
          </Link>
        </div>

        {/* Search desktop */}
        <div className="hidden md:flex w-[665px] h-[44px] rounded-[7px] border-2 border-[#0D6EFD]">

          <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            type="text" placeholder="Search" className="w-[421px] pr-[5px] pl-[10px] py-[10px] text-[#8B96A5] text-[16px] outline-none" />

          <div className="w-[146px] border-l border-[#0D6EFD] px-[10px] py-[10px] relative">
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="text-[16px] w-full outline-none appearance-none pl-2 pr-6">
              <option>All category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Home</option>
              <option>Sports</option>
              <option>Accessories</option>
            </select>
            <span className="absolute right-2 top-1/4 pointer-events-none">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.59 8.29504L12 12.875L7.41 8.29504L6 9.70504L12 15.705L18 9.70504L16.59 8.29504Z" fill="#8B96A5" /></svg>
            </span>
          </div>
          <button onClick={handleSearch} className="text-white w-[100px] text-[16px] bg-[#0067FF] hover:bg-[#127FFF] p-[10px]">Search</button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-[16px] md:gap-[23px] text-[#8B96A5] text-[12px]">
          <div className="hidden md:flex flex-col gap-[7px] items-center">
            <Link to="/profile">
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z" fill="#8B96A5" /></svg>
              <span>Profile</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link to="/products" className="flex flex-col items-center">
              <svg className="w-7 h-7 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path fill="rgb(139, 150, 165)" d="M390.3 282.8C390.3 303.3 373.6 320 353.1 320L282.8 320L282.8 245.6L353.1 245.6C373.6 245.6 390.3 262.3 390.3 282.8zM72 320C72 183 183 72 320 72C457 72 568 183 568 320C568 457 457 568 320 568C183 568 72 457 72 320zM439.9 282.8C439.9 234.9 401 196 353.1 196L233.2 196L233.2 444L282.8 444L282.8 369.6L353.1 369.6C401 369.6 439.9 330.7 439.9 282.8z" />
              </svg>
              <span className="pb-2">Products</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex flex-col gap-[7px] items-center">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.3536 17.1307C10.5936 17.8207 9.42357 17.8207 8.66357 17.1207L8.55357 17.0207C3.30357 12.2707 -0.126429 9.16065 0.00357106 5.28065C0.0635711 3.58065 0.933571 1.95065 2.34357 0.990654C4.98357 -0.809346 8.24357 0.0306542 10.0036 2.09065C11.7636 0.0306542 15.0236 -0.819346 17.6636 0.990654C19.0736 1.95065 19.9436 3.58065 20.0036 5.28065C20.1436 9.16065 16.7036 12.2707 11.4536 17.0407L11.3536 17.1307Z" fill="#8B96A5" />
              </svg>
              <span>Orders</span>
            </div>
          </div>
          <Link to="/cart" className="flex flex-col gap-[7px] items-center">
            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M6.29989 16.7997C5.14491 16.7997 4.21043 17.7447 4.21043 18.8997C4.21043 20.0546 5.14491 20.9996 6.29989 20.9996C7.45487 20.9996 8.39985 20.0546 8.39985 18.8997C8.39985 17.7447 7.45487 16.7997 6.29989 16.7997ZM0 1.04998C0 1.62747 0.472492 2.09996 1.04998 2.09996H2.09996L5.8799 10.0693L4.46242 12.6313C3.69593 14.0383 4.70392 15.7497 6.29989 15.7497H17.8497C18.4272 15.7497 18.8997 15.2772 18.8997 14.6997C18.8997 14.1223 18.4272 13.6498 17.8497 13.6498H6.29989L7.45487 11.5498H15.2772C16.0647 11.5498 16.7577 11.1193 17.1147 10.4683L20.8736 3.65394C21.2621 2.96095 20.7581 2.09996 19.9601 2.09996H4.42042L3.71693 0.598489C3.54894 0.230996 3.17094 0 2.77195 0H1.04998C0.472492 0 0 0.472492 0 1.04998ZM16.7997 16.7997C15.6447 16.7997 14.7102 17.7447 14.7102 18.8997C14.7102 20.0546 15.6447 20.9996 16.7997 20.9996C17.9547 20.9996 18.8997 20.0546 18.8997 18.8997C18.8997 17.7447 17.9547 16.7997 16.7997 16.7997Z" fill="#8B96A5" /></svg>
            <span className="hidden md:block">My cart</span>
          </Link>
          {/* Mobile: Profile icon */}
          <div className="md:hidden">
            <Link to="/profile">
              <svg width="20" height="19" viewBox="0 0 20 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z" fill="#8B96A5" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Search bar */}
      <div className="md:hidden px-[16px]">
        <div className="flex w-full h-[40px] rounded-[7px] border border-[#DEE2E7] bg-[#F7FAFC]">
          <span className="pl-3 flex items-center text-[#8B96A5]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 21L16.514 16.506M19 11C19 15.418 15.418 19 11 19C6.582 19 3 15.418 3 11C3 6.582 6.582 3 11 3C15.418 3 19 6.582 19 11Z" stroke="#8B96A5" strokeWidth="2" strokeLinecap="round" /></svg>
          </span>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            type="text" placeholder="Search" className="flex-1 px-2 text-[16px] outline-none bg-transparent text-[#8B96A5]" />
        </div>
      </div>

      {/* ===== BOTTOM NAV — desktop only ===== */}
      <div className="hidden md:block border-b border-[#E0E0E0]">
        <div className="w-full h-[56px] px-[80px] py-[16px] flex justify-between items-center">
          <div className="w-[620px] flex items-center gap-[25px] text-[16px] font-medium">
            <Link to="/products" className="flex items-center gap-[8px]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z" fill="#1C1C1C" /></svg>
              <p>All category</p>
            </Link>
            <a href="#">Hot offers</a>
            <a href="#">Gift boxes</a>
            <a href="#">Projects</a>
            <a href="#">Menu item</a>
            <a href="#">Help</a>
          </div>
          <div className="flex items-center gap-[32px] text-[16px]">
            <div className="w-[124px] relative">
              <select className="text-[16px] w-full appearance-none font-medium">
                <option>English, USD</option>
                <option>Urdu, PK</option>
              </select>
              <span className="absolute right-1 top-0 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M16.59 8.29504L12 12.875L7.41 8.29504L6 9.70504L12 15.705L18 9.70504L16.59 8.29504Z" fill="#8B96A5" /></svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Category scroll bar */}
      <div className="md:hidden flex overflow-x-auto hide-scrollbar py-[20px] gap-[8px] px-[16px] border-b border-[#E0E0E0]">
        {["All category", "Gadgets", "Clothes", "Accessories", "Electronics", "Home"].map((cat) => (
          <button key={cat} className="shrink-0 px-[14px] py-[6px] border border-[#DEE2E7] rounded-lg text-[14px] text-[#0D6EFD] bg-white whitespace-nowrap">
            {cat}
          </button>
        ))}
      </div>

      {/* ===== DRAWER — mobile only ===== */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-[270px] bg-white z-50 shadow-xl transform transition-transform duration-300 md:hidden ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>

        {/* User section */}
        <div className="flex flex-col bg-[#EFF2F4] gap-3 px-[20px] py-[20px] border-b border-[#EEF1F3]">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 19" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M10 10C12.7625 10 15 7.7625 15 5C15 2.2375 12.7625 0 10 0C7.2375 0 5 2.2375 5 5C5 7.7625 7.2375 10 10 10ZM10 11.5C6.6625 11.5 0 13.175 0 16.5V17.75C0 18.4375 0.5625 19 1.25 19H18.75C19.4375 19 20 18.4375 20 17.75V16.5C20 13.175 13.3375 11.5 10 11.5Z" fill="#8B96A5" /></svg>
          </div>
          {user ? (
            <>
              <p onClick={handleLogout} className="text-[15px] text-gray-700 font-medium">Log out</p>
              {role === "admin" && (
                <Link to="/admin/dashboard" className="w-full text-black text-[14px] font-medium">
                  ➡️ Admin Panel
                </Link>
              )}
            </>
          ) : (
            <div>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-[15px] text-gray-700 font-medium">Sign in</Link>
              <span className="text-gray-400 mx-1">|</span>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="text-[15px] text-gray-700 font-medium">Register</Link>
            </div>
          )}
        </div>

        {/* Main links */}
        <div className="flex flex-col border-b border-[#EEF1F3] py-[10px]">
          {[
            { label: "Home", icon: "🏠", to: "/" },
            { label: "Categories", icon: "☰", to: "/products" },
            { label: "Favorites", icon: "♡", to: "" },
            { label: "Products", icon: "🗒", to: "/products" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-4 px-[20px] py-[14px] text-[16px] text-gray-700 hover:bg-gray-50"
            >
              <span className="text-[18px] text-gray-400">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Secondary links */}
        <div className="flex flex-col border-b border-[#EEF1F3] py-[10px]">
          {[
            { label: "English | USD", icon: "🌐" },
            { label: "Contact us", icon: "🎧" },
            { label: "About", icon: "📋" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 px-[20px] py-[14px] text-[16px] text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="text-[18px] text-gray-400">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="flex flex-col py-[10px]">
          {["User agreement", "Partnership", "Privacy policy"].map((item) => (
            <a key={item} href="#" className="px-[20px] py-[12px] text-[15px] text-gray-500 hover:bg-gray-50">
              {item}
            </a>
          ))}
        </div>

      </div>

    </div>
  );
}
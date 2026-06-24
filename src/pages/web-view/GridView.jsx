import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function GridViewPage({ viewMode, setViewMode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const activeFilters = ["Samsung", "Apple", "Poco", "Metallic", "4 star", "3 star"];

  const Stars = ({ rating }) => (
    <span className="text-yellow-400 text-[16px]">
      ★★★<span className="text-gray-300">★★</span>
      <span className="text-gray-400 ml-1">{rating}</span>
    </span>
  );

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products", {
        params: {
          search,
          category,
        },
      });

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  if (loading) {
    return <h1 className="h-[80vh] flex items-center justify-center">Loading...</h1>;
  }

  return (
    <div className="w-full md:max-w-[1440] md:w-[90%] bg-[#F7FAFC] md:mx-auto px-[16px] md:px-0">
      <p className="hidden md:block text-[16px] text-gray-400 h-[40px]">Home &gt; Clothings &gt; Men's wear &gt; Summer clothing</p>

      <div className="flex gap-5">

        {/* Sidebar — mobile par hidden */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Right content */}
        <div className="flex-1 w-full">

          {/* Top bar */}
          <div className="flex items-center justify-between h-[50px] md:h-[62px]">
            <p className="text-[14px] md:text-[16px]">
              <span className="font-semibold">12,911</span>
              <span className="hidden md:inline"> items in Mobile accessory</span>
            </p>
            <div className="flex items-center gap-2">
              <label className="hidden md:flex items-center gap-1 text-[16px]">
                <input type="checkbox" className="accent-blue-500" /> Verified only
              </label>
              <select className="border border-[#DEE2E7] rounded px-2 py-1 text-[14px] md:text-[16px] focus:outline-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="flex w-[76px] rounded">
                <span
                  onClick={() => setViewMode("grid")}
                  className={`w-10 h-10 flex items-center justify-center cursor-pointer ${viewMode === "grid" ? "bg-[#EEF1F3] text-black rounded" : "text-gray-400"}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 3H3V11H11V3Z" fill="#1C1C1C" /><path d="M11 13H3V21H11V13Z" fill="#1C1C1C" /><path d="M21 3H13V11H21V3Z" fill="#1C1C1C" /><path d="M21 13H13V21H21V13Z" fill="#1C1C1C" /></svg>
                </span>
                <span
                  onClick={() => setViewMode("list")}
                  className={`w-10 h-10 flex items-center justify-center cursor-pointer ${viewMode === "list" ? "bg-[#EEF1F3] text-black rounded" : "text-gray-400"}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 8H3V4H21V8ZM21 10H3V14H21V10ZM21 16H3V20H21V16Z" fill="#1C1C1C" /></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Active filter tags */}
          <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
            {activeFilters.map((f) => (
              <span key={f} className="flex items-center gap-2 bg-white border border-blue-500 rounded px-2 md:px-3 py-0.5 text-[13px] md:text-[16px] text-[#5C5C5C]">
                {f} <span className="cursor-pointer">✕</span>
              </span>
            ))}
            <span className="text-blue-500 text-[13px] md:text-[16px] cursor-pointer self-center hover:underline">Clear all filter</span>
          </div>

          {/* Product grid — mobile: 2 cols, desktop: 3 cols */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {products.map((p) => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded-xl px-[12px] md:px-[20px] py-[12px] md:py-[16px] cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-[150px] md:h-[230px] object-contain mb-3 md:mb-4"
                  />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-[15px] md:text-[18px]">${p.price}</span>
                  <div className="w-[36px] h-[36px] md:w-[50px] md:h-[40px] flex items-center justify-center rounded border-2 border-[#DEE2E7] cursor-pointer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16.5 2.82501C14.76 2.82501 13.09 3.63501 12 4.91501C10.91 3.63501 9.24 2.82501 7.5 2.82501C4.42 2.82501 2 5.24501 2 8.32501C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32501C22 5.24501 19.58 2.82501 16.5 2.82501ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32501C4 6.32501 5.5 4.82501 7.5 4.82501C9.04 4.82501 10.54 5.81501 11.07 7.18501H12.94C13.46 5.81501 14.96 4.82501 16.5 4.82501C18.5 4.82501 20 6.32501 20 8.32501C20 11.215 16.86 14.065 12.1 18.375Z" fill="#0D6EFD" /></svg>
                  </div>
                </div>
                <Stars rating={p.rating} />
                <p className="text-[13px] md:text-[16px] text-gray-500 mt-1 line-clamp-2">{p.name}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center md:justify-end items-center gap-[10px] mt-[20px] md:mt-[30px] mb-[20px] md:mb-[80px]">
            <select className="border border-gray-200 rounded px-2 py-1 text-[14px] md:text-[16px] focus:outline-none">
              <option>Show 10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <div>
              <button className="px-2 py-1 text-[16px] border border-gray-200 rounded-l hover:bg-gray-50">‹</button>
              {[1, 2, 3].map((n) => (
                <button key={n} className={`px-2.5 py-1 text-[16px] ${n === 1 ? "bg-[#EFF2F4] text-[#8B96A5]" : "border border-gray-200 hover:bg-gray-50"}`}>{n}</button>
              ))}
              <button className="px-2 py-1 text-[16px] border border-gray-200 rounded-r hover:bg-gray-50">›</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

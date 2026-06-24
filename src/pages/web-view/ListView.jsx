import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ListViewPage({ viewMode, setViewMode }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

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

        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Right content */}
        <div className="flex-1 w-full">

          {/* Top bar — desktop */}
          <div className="hidden md:flex items-center justify-between h-[62px]">
            <p className="text-[16px]">12,911 items<span className="font-semibold"> in Mobile accessory</span></p>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-[16px]">
                <input type="checkbox" className="accent-blue-500" /> Verified only
              </label>
              <select className="border border-[#DEE2E7] rounded px-2 py-1 text-[16px] focus:outline-none">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <div className="flex w-[76px] rounded">
                <span onClick={() => setViewMode("grid")} className={`w-10 h-10 flex items-center justify-center cursor-pointer ${viewMode === "grid" ? "bg-[#EEF1F3] text-black rounded" : "text-gray-400"}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11 3H3V11H11V3Z" fill="#1C1C1C" /><path d="M11 13H3V21H11V13Z" fill="#1C1C1C" /><path d="M21 3H13V11H21V3Z" fill="#1C1C1C" /><path d="M21 13H13V21H21V13Z" fill="#1C1C1C" /></svg>
                </span>
                <span onClick={() => setViewMode("list")} className={`w-10 h-10 flex items-center justify-center cursor-pointer ${viewMode === "list" ? "bg-[#EEF1F3] text-black rounded" : "text-gray-400"}`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 8H3V4H21V8ZM21 10H3V14H21V10ZM21 16H3V20H21V16Z" fill="#1C1C1C" /></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Top bar — mobile only */}
          <div className="flex md:hidden items-center justify-between py-[10px] mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[14px] text-gray-600 font-medium">Sort: Newest</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 10L12 15L17 10H7Z" fill="#8B96A5" /></svg>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[14px] text-gray-600">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4.25 5.61C6.27 8.2 10 13 10 13V19C10 19.55 10.45 20 11 20H13C13.55 20 14 19.55 14 19V13C14 13 17.72 8.2 19.74 5.61C20.25 4.95 19.78 4 18.95 4H5.04C4.21 4 3.74 4.95 4.25 5.61Z" fill="#8B96A5" /></svg>
                Filter (3)
              </div>
              <div className="flex gap-1">
                <span onClick={() => setViewMode("grid")} className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${viewMode === "grid" ? "bg-[#EEF1F3]" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M11 3H3V11H11V3Z" fill="#1C1C1C" /><path d="M11 13H3V21H11V13Z" fill="#1C1C1C" /><path d="M21 3H13V11H21V3Z" fill="#1C1C1C" /><path d="M21 13H13V21H21V13Z" fill="#1C1C1C" /></svg>
                </span>
                <span onClick={() => setViewMode("list")} className={`w-8 h-8 flex items-center justify-center cursor-pointer rounded ${viewMode === "list" ? "bg-[#EEF1F3]" : ""}`}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 8H3V4H21V8ZM21 10H3V14H21V10ZM21 16H3V20H21V16Z" fill="#1C1C1C" /></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Mobile: active filter tags */}
          <div className="flex md:hidden flex-wrap gap-2 mb-3">
            {["Huawei", "Apple", "64GB"].map((f) => (
              <span key={f} className="flex items-center gap-1 bg-white border border-blue-500 rounded px-3 py-0.5 text-[13px] text-[#5C5C5C]">
                {f} <span className="cursor-pointer text-gray-400">✕</span>
              </span>
            ))}
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-3">
            {products.map((p, i) => (
              <div
                key={i}
                onClick={() => navigate(`/product/${p._id}`)}
                className="bg-white rounded p-[10px] flex gap-3 cursor-pointer hover:shadow-md transition-shadow"
              >
                {/* Image — mobile par choti, desktop par bari */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-[80px] h-[80px] md:w-[210px] md:h-[210px] object-contain rounded-lg shrink-0"
                />

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="text-[14px] md:text-[16px] font-semibold text-gray-800 mt-0 md:mt-3 mb-1 md:mb-3 line-clamp-2">{p.name}</p>
                  <span className="font-semibold text-[15px] md:text-[16px] mb-1">${p.price}</span>
                  <div className="flex items-center gap-2 mb-1 md:mb-3 flex-wrap">
                    <Stars rating={p.rating} />
                    <span className="text-gray-400 text-[13px] md:text-[16px]">{p.stock} in stock</span>
                  </div>
                  <p className="hidden md:block text-[16px] text-gray-400 leading-relaxed">{p.description}</p>
                  <p className="hidden md:block text-blue-500 text-[16px] mt-2 cursor-pointer">View details</p>
                </div>

                {/* Heart icon */}
                <div className="w-[36px] h-[36px] md:w-[50px] md:h-[40px] flex items-center justify-center rounded border-2 border-[#DEE2E7] cursor-pointer shrink-0 self-start mt-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16.5 2.82501C14.76 2.82501 13.09 3.63501 12 4.91501C10.91 3.63501 9.24 2.82501 7.5 2.82501C4.42 2.82501 2 5.24501 2 8.32501C2 12.105 5.4 15.185 10.55 19.865L12 21.175L13.45 19.855C18.6 15.185 22 12.105 22 8.32501C22 5.24501 19.58 2.82501 16.5 2.82501ZM12.1 18.375L12 18.475L11.9 18.375C7.14 14.065 4 11.215 4 8.32501C4 6.32501 5.5 4.82501 7.5 4.82501C9.04 4.82501 10.54 5.81501 11.07 7.18501H12.94C13.46 5.81501 14.96 4.82501 16.5 4.82501C18.5 4.82501 20 6.32501 20 8.32501C20 11.215 16.86 14.065 12.1 18.375Z" fill="#0D6EFD" /></svg>
                </div>
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

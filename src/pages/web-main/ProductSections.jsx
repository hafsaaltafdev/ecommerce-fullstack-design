import React from "react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import Group969 from "../../assets/Group969.png";
import Group970 from "../../assets/Group970.png";
import { useNavigate } from "react-router-dom";


export default function ProductSections() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const sections = [
    {
      title: "Home and Outdoor",
      mobileTitle: "Home and Outdoor",
      bannerImage: Group969,
    },
    {
      title: "Consumer electronics and gadgets",
      mobileTitle: "Consumer electronics",
      bannerImage: Group970,
    },
  ];

  return (
    <div className="bg-[#F7FAFC] flex flex-col gap-[10px] md:gap-[30px] ">
      {sections.map((section, index) => (
        <div
          key={index}
          className="w-full md:w-[90%] h-[270px] md:h-[257px] border border-[#DEE2E7] md:rounded-xl shadow-sm md:mx-auto flex flex-col md:flex-row bg-white"
        >

          {/* title for mobile */}
          <div className="flex justify-between items-center px-[16px] py-[14px] md:hidden">
            <h2 className="text-[18px] font-semibold">{section.mobileTitle}</h2>
          </div>

          {/* Banner */}
          <div className="hidden md:block w-[20%] p-[20px] flex flex-col"
            style={{
              backgroundImage: `url(${section.bannerImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}>
            <h2 className="w-[80%] text-[20px] font-semibold mb-[18px]">{section.title}</h2>
            <button className="w-[55%] h-[40px] text-[15px] font-medium bg-white text-black py-2 rounded-lg">
              Source now
            </button>
          </div>

          {/* Products */}
          <div className="w-full md:w-[80%] flex overflow-x-auto hide-scrollbar md:grid md:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="w-[42%] md:w-[227px] h-[160px] md:h-[100%] shrink-0 md:shrink p-[2px] border-1 border-[#E0E0E0] relative flex flex-col items-center md:block"
              >
                <img
                  className="w-[95px] h-[95px] md:w-[82px] md:h-[82px] object-contain md:absolute md:right-1 md:bottom-1"
                  src={product.image}
                  alt={product.name}
                />
                <div className="flex flex-col gap-[4px] mt-[6px] md:mt-[10px] md:ml-[12px] text-center md:text-left">
                  <h3 className="text-black text-[13px] md:text-[16px]">{product.name}</h3>
                  <p className="text-[#8B96A5] text-[13px]">${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Source now button — neeche */}
          <div className="flex items-center gap-2 px-[16px] py-[16px] md:hidden border-t border-[#EEF1F3]">
            <button className="text-[#0D6EFD] text-[16px] font-medium">Source now</button>
            <span className="text-[#0D6EFD]">→</span>
          </div>

        </div>
      ))}
    </div>
  );
}
import { useState } from "react";
import bag from "../../assets/bag.png?url";
import shirt from "../../assets/shirt.png?url";
import jacket from "../../assets/jacket.png?url";
import coat from "../../assets/coat.png?url";


export default function Description({ product }) {

  if (!product) return null;

  const [activeTab, setActiveTab] = useState("Description");

  const tabs = ["Description", "Reviews", "Shipping", "About seller"];

  const specs = [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-8998221212" },
    { label: "Size", value: "34mm x 450mm x 18mm" },
    { label: "Memory", value: "36GB RAM" },
  ];

  const features = [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ];

  const youMayLike = [
    { name: "Men Blazers Sets Elegant Formal", price: "$7.00 - $99.50", img: coat },
    { name: "Men Shirt Sleeve Polo Contrast", price: "$7.00 - $99.50", img: shirt },
    { name: "Apple Watch Series Space Gray", price: "$7.00 - $99.50", img: jacket },
    { name: "Basketball Crew Socks Long Stuff", price: "$7.00 - $99.50", img: shirt },
    { name: "New Summer Men's castrol T-Shirts", price: "$7.00 - $99.50", img: bag },
  ];


  return (
    <div className="hidden md:block">
      <div className="w-[90%] max-w-[1440px] mx-auto flex gap-5">
        {/* Left: description card */}
        <div className="w-[880px] flex flex-col bg-white gap-[28px] border border-[#DEE2E7] rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 h-[48px] ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-[16px] transition-colors ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500 font-medium" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* info */}
          <div className="flex flex-col gap-7 px-5 text=[#505050] mb-6">
            {/* Description text */}
            <p className="text-[16px]">
              {product.description}
            </p>

            {/* Specs table */}
            <div className="border border-gray-200 rounded overflow-hidden">
              {specs.map((s, i) => (
                <div key={s.label} className="flex text-[16px] border border-gray-200">
                  <span className="w-[204px] bg-[#EFF2F4] p-[6px]">{s.label}</span>
                  <span className="py-[6px] pl-[10px] ">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-1">
              {features.map((f, i) => (
                <p key={i} className="text-[16px] flex gap-2 "><span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.32917 13.2292L3.85417 9.75417L2.67084 10.9292L7.32917 15.5875L17.3292 5.58751L16.1542 4.41251L7.32917 13.2292Z" fill="#8B96A5" />
                </svg>
                </span> {f}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Right: You may like */}
        <div className="w-[280px] h-[553px] bg-white border border-[#DEE2E7] rounded-lg shadow-sm p-4">
          <p className="text-[16px] font-semibold mb-[14px] ">You may like</p>
          <div className="flex flex-col gap-4">
            {youMayLike.map((item, i) => (
              <div key={i} className="flex gap-3 cursor-pointer hover:opacity-80">
                <img src={item.img} alt={item.name} className="w-[80px] h-[80px] object-contain rounded border border-gray-100" />
                <div>
                  <p className="text-[16px] ">{item.name}</p>
                  <p className="text-[16px] text-gray-500 ">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

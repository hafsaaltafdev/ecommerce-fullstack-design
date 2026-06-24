import React from "react";
import smartwatch from "../../assets/smartwatch.png?url";
import headphones from "../../assets/headphones.png?url";
import mobile from "../../assets/mobile.png?url";
import camera from "../../assets/camera.png?url";
import laptop from "../../assets/laptop.png?url";

export default function Deals() {
    const discountProducts = [
        {
            name: "Smart watches",
            discount: "-25%",
            img: smartwatch,
        },
        {
            name: "Laptops",
            discount: "-15%",
            img: laptop,
        },
        {
            name: "GoPro cameras",
            discount: "-40%",
            img: camera,
        },
        {
            name: "Headphones",
            discount: "-25%",
            img: headphones,
        },
        {
            name: "Canon cameras",
            discount: "-25%",
            img: mobile,
        },
    ];

    return (
        <div className="w-full md:w-[90%] h-[245px] md:h-[240px] md:mx-auto md:flex border border-[#DEE2E7] md:rounded-xl overflow-hidden shadow-sm bg-white">

            {/* Left Side */}
            <div className="w-full md:w-[20%] h-[65px] md:h-full p-[10px] md:p-4 border-r border-gray-100 flex flex-row md:flex-col justify-between md:justify-start">
                <div>
                    <p className="text-[18px] md:text-[20px] font-semibold">Deals and offers</p>
                    <p className="text-[16px] text-[#8B96A5] mb-[18px] hidden md:block">Hygiene equipments</p>
                    <p className="text-[13px] text-[#8B96A5] block md:hidden">Electronics equipments</p>
                </div>

                {/* Countdown */}
                <div className="w-auto md:w-[198px] flex gap-[6px]">

                    <div className="hidden md:block bg-[#606060] text-white w-[45px] h-[50px] rounded px-2 py-1 flex flex-col justify-center items-center">
                        <div className="text-[16px] font-bold">04</div>
                        <div className="text-[12px]">Days</div>
                    </div>

                    <div className="bg-[#EFF2F4] md:bg-[#606060] text-[#8B96A5] md:text-white w-[45px] h-[50px] rounded px-2 py-1 flex flex-col justify-center items-center">
                        <div className="text-[16px] font-bold">13</div>
                        <div className="text-[12px]">Hour</div>
                    </div>

                    <div className="bg-[#EFF2F4] md:bg-[#606060] text-[#8B96A5] md:text-white w-[45px] h-[50px] rounded px-2 py-1 flex flex-col justify-center items-center">
                        <div className="text-[16px] font-bold">34</div>
                        <div className="text-[12px]">Min</div>
                    </div>

                    <div className="bg-[#EFF2F4] md:bg-[#606060] text-[#8B96A5] md:text-white w-[45px] h-[50px] rounded px-2 py-1 flex flex-col justify-center items-center">
                        <div className="text-[16px] font-bold">56</div>
                        <div className="text-[12px]">Sec</div>
                    </div>

                </div>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-[80%] flex overflow-x-auto hide-scrollbar md:items-center">
                {discountProducts.map((item) => (
                    <div key={item.name} className="flex flex-col justify-between items-center w-[42%] md:w-[28%] shrink-0 md:shrink h-[180px] md:h-full border-1 border-[#E0E0E0] p-[13px] md:p-[20px]">
                        <img
                            src={item.img}
                            alt={item.name}
                            className="w-[98px] h-[98px] md:w-[140px] md:h-[140px]"
                        />
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-[13px] md:text-[16px] font-medium mb-[8px]">{item.name}</p>
                            <p className="w-[61px] h-[28px] text-[14px] font-medium flex items-center justify-center rounded-full text-[#EB001B] bg-[#FFE3E3]">{item.discount}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};
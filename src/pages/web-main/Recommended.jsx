import kattle from "../../assets/kattle.png?url";
import headphones from "../../assets/headphones.png?url";
import smartwatch from "../../assets/smartwatch.png?url";
import shorts from "../../assets/shorts.png?url";
import bag from "../../assets/bag.png?url";
import wallet from "../../assets/wallet.png?url";
import shirt from "../../assets/shirt.png?url";
import jacket from "../../assets/jacket.png?url";
import bowl from "../../assets/bowl.png?url";
import coat from "../../assets/coat.png?url";

export default function RecommendedPage() {

const products = [
    { name: "T-shirts with multiple colors, for men", price: "$10.30", img: shirt },
    { name: "Jeans shorts for men blue color", price: "$10.30", img: jacket },
    { name: "Brown winter coat medium size", price: "$12.50", img: coat },
    { name: "Jeans bag for travel for men", price: "$34.00", img: wallet },
    { name: "Leather wallet", price: "$99.00", img: bag },
    { name: "Canon camera black, 100x zoom", price: "$9.99", img: shorts },
    { name: "Headset for gaming with mic", price: "$8.99", img: headphones },
    { name: "Smartwatch silver color modern", price: "$10.30", img: smartwatch },
    { name: "Blue wallet for men leather metarfial", price: "$10.30", img: bowl },
    { name: "Jeans bag for travel for men", price: "$80.95", img: kattle },
];


    return (
        <div className="w-full md:w-[90%] h-auto md:h-[696px] bg-[#F7FAFC] px-[12px] md:px-[0px] md:mx-auto">
            <h2 className="text-[18px] md:text-[24px] font-semibold mb-[10px] md:mb-[24px]">Recommended items</h2>
            <div className="grid grid-cols-2 md:grid md:grid-cols-5 gap-[8px] md:gap-[20px] ">
                {products.map((p, i) => (
                    <div key={i} className="w-[165px] md:w-[220px] h-[240px] md:h-[310px] bg-white border border-[#E0E0E0] p-[8px] md:py-[10px] md:px-[16px] flex flex-col gap-[9px] md:gap-[14px] ">
                        <img src={p.img} alt={p.name} className="w-[152px] md:w-[200px] h-[152px] md:h-[200px] object-contain" />
                        <div className="flex flex-col md:gap-[3px]">
                            <p className="text-[16px] font-medium">{p.price}</p>
                            <p className="text-[13px] text-[16px] md:w-[90%] text-[#8B96A5]">{p.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
}

import smartwatch from "../../assets/smartwatch.png?url";
import wallet from "../../assets/wallet.png?url";
import headphones from "../../assets/headphones.png?url";
import shorts from "../../assets/shorts.png?url";
import kattle from "../../assets/kattle.png?url";
import assecries from "../../assets/assecries.png?url";


export default function RelatedProductsPage() {

  const related = [
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: wallet },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: smartwatch },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: headphones },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: shorts },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: kattle },
    { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", img: assecries },
  ];

  return (
    <div className="w-full md:w-[90%] md:max-w-[1440px] md:mx-auto flex flex-col gap-7 px-[10px] px-[0px] ">

      {/* Related products */}
      <div className="bg-white border border-[#DEE2E7] rounded-lg shadow-sm p-3 md:p-6">
        <h2 className="text-[18px] text-[20px] font-semibold mb-4">Related products</h2>
        <div className="md:grid md:grid-cols-6 flex overflow-x-auto hide-scrollbar gap-3 md:gap-5">
          {related.map((p, i) => (
            <div key={i} className="h-[220px] md:h-[254px] w-[150px] md:w-auto shrink-0 md:shrink cursor-pointer rounded">
              <img src={p.img} alt={p.name} className="w-[138px] md:w-[172px] h-[138px] md:h-[172px] object-contain mb-2" />
              <p className="text-[13px] md:text-[16px] mb-2">{p.name}</p>
              <p className="text-[13px] md:text-[16px] text-[#8B96A5]">{p.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Blue promo banner */}
      <div className="hidden md:block ">
        <div
          className="rounded-lg p-7 flex items-center justify-between mb-[20px] md:mb-[40px]"
          style={{ background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 60%, #42a5f5 100%)" }}
        >
          <div>
            <p className="text-white font-semibold text-[24px] mb-1">Super discount on more than 100 USD</p>
            <p className="text-[16px] text-[#B5CEF4]">Have you over Study just write dummy info</p>
          </div>
          <button className="bg-orange-400 hover:bg-orange-500 text-white text-[16px] font-medium px-6 py-2.5 rounded-lg transition-colors shrink-0">
            Shop now
          </button>
        </div>
      </div>

    </div>
  );
}

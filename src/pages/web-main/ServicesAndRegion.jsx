import Masgroup from "../../assets/Masgroup.png?url";
import Masgroup1 from "../../assets/Masgroup1.png?url";
import Masgroup2 from "../../assets/Masgroup2.png?url";
import Masgroup3 from "../../assets/Masgroup3.png?url";

export default function ServicesRegionsPage() {
  const services = [
    { title: "Source from Industry Hubs", img: Masgroup, icon: "🔍" },
    { title: "Customize Your Products", img: Masgroup1, icon: "📋" },
    { title: "Fast, reliable shipping by ocean or air", img: Masgroup2, icon: "➤" },
    { title: "Product monitoring and inspection", img: Masgroup3, icon: "🛡" },
  ];

  const regions = [
    { country: "Arabic Emirates", domain: "shopname.ae", flag: "🇦🇪" },
    { country: "Australia", domain: "shopname.ae", flag: "🇦🇺" },
    { country: "United States", domain: "shopname.ae", flag: "🇺🇸" },
    { country: "Russia", domain: "shopname.ru", flag: "🇷🇺" },
    { country: "Italy", domain: "shopname.it", flag: "🇮🇹" },
    { country: "Denmark", domain: "denmark.com.dk", flag: "🇩🇰" },
    { country: "France", domain: "shopname.com.fr", flag: "🇫🇷" },
    { country: "Arabic Emirates", domain: "shopname.ae", flag: "🇦🇪" },
    { country: "China", domain: "shopname.ae", flag: "🇨🇳" },
    { country: "Great Britain", domain: "shopname.co.uk", flag: "🇬🇧" },
  ];


  return (
    <div className="w-full md:w-[90%] bg-[#F7FAFC] md:mx-auto px-[16px] md:px-0">
      <div className="flex flex-col gap-[10px] md:gap-[30px]">

        {/* Our Extra Services */}
        <div>
          <h2 className="text-[20px] md:text-[24px] font-semibold mb-[10px] md:mb-[24px]">Our extra services</h2>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="flex overflow-x-auto hide-scrollbar md:grid md:grid-cols-4 gap-[12px] md:gap-[20px]">
            {services.map((s, i) => (
              <div key={i} className="bg-white rounded shrink-0 w-[220px] md:w-auto">
                <div className="relative">
                  <img src={s.img} alt={s.title} className="w-full h-[100px] md:h-[120px] object-cover rounded-t" />
                  <div className="absolute bottom-[-18px] right-4 w-[40px] h-[40px] md:w-[55px] md:h-[55px] bg-[#D1E7FF] border-2 border-white rounded-full flex items-center justify-center text-[16px] md:text-[20px]">
                    {s.icon}
                  </div>
                </div>
                <div className="p-3 pt-5">
                  <p className="text-[13px] md:text-[14px] font-medium">{s.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suppliers by Region */}
        <div className="mb-[20px] md:mb-[30px]">
          <h2 className="text-[20px] md:text-[24px] font-semibold mb-[10px] md:mb-[24px]">Suppliers by region</h2>

          {/* Mobile: 2 cols, Desktop: 5 cols */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-[12px] md:gap-[10px]">
            {regions.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[22px] md:text-[24px]">{r.flag}</span>
                <div>
                  <p className="text-[14px] md:text-[16px] text-gray-800">{r.country}</p>
                  <p className="text-[12px] md:text-[13px] text-gray-400">{r.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

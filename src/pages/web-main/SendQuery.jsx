import { useState } from "react";
import Group982 from "../../assets/Group982.png?url";


export default function SendInquiryPage() {
  const [item, setItem] = useState("");
  const [details, setDetails] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Pcs");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!item.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setItem("");
    setDetails("");
    setQuantity("");
  };

  return (
    <div className="w-full md:w-[90%] md:max-w-[1440px] md:mx-auto h-[150px] md:h-[420px] md:rounded-sm md:relative flex flex-col md:flex-row md:items-center md:justify-center shadow-sm"
      style={{ backgroundImage: `url(${Group982})` }}>
      {/* Left: headline */}
      <div className="w-full md:w-[35%] md:h-[140px] px-[23px] md:px-[20px] py-[25px] md:py-[30px] md:py-0 md:absolute md:left-8 md:top-8 flex flex-col justify-center text-white gap-[13px]">
        <h2 className="text-[18px] md:text-[28px] font-semibold">
          An easy way to send<br />requests to all suppliers
        </h2>
        <p className="hidden md:block text-[14px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        {/* Mobile par sirf Send inquiry button — form hidden */}
        <button
          onClick={handleSubmit}
          className="md:hidden w-[98px] h-[30px] bg-[#0067FF] hover:bg-[#127FFF] text-white text-[13px] font-medium rounded-lg"
        >
          Send inquiry
        </button>
      </div>

      {/* Right: form card */}
      <div className="hidden md:block w-[40%] h-[346px] px-[20px] py-[25px] flex flex-col absolute right-9 top-9 bg-white ">
        <p className="text-[20px] font-semibold mb-[15px] ">
          Send quote to suppliers
        </p>

        <input
          type="text"
          placeholder="What item you need?"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="w-full h-[40px] border border-gray-200 rounded-lg py-[10px] pl-[10px] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-[15px]"
        />

        <textarea
          placeholder="Type more details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={3}
          className="w-full h-[72px] border border-gray-200 rounded-lg px-3 py-2 text-[16px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-[15px]"
        />

        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-[206px] border border-gray-200 rounded-lg px-3 py-2 text-[16px] text-black font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 transition mb-[15px]"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border border-gray-200 rounded-lg px-2 py-2 text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-400 mb-[15px]"
          >
            <option>Pcs</option>
            <option>Kg</option>
            <option>Sets</option>
            <option>Boxes</option>
            <option>Tons</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-[128px] h-[40px] py-2 rounded-lg text-[16px] font-medium transition-all ${submitted
            ? "bg-green-500 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          {submitted ? "✓ Inquiry sent!" : "Send inquiry"}
        </button>
      </div>
    </div>
  );
}
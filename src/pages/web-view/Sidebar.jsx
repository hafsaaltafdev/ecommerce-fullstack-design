import { useState } from "react";

const categories = ["Mobile accessory", "Electronics", "Smartphones", "Modern tech"];
const brands = ["Samsung", "Apple", "Huawei", "Pocco", "Lenovo"];
const features = ["Metallic", "Plastic cover", "8GB Ram", "Super power", "Large Memory"];
const conditions = ["Any", "Refurbished", "Brand new", "Old items"];
const ratings = [5, 4, 3, 2];

export default function Sidebar() {
  const [openCategory, setOpenCategory] = useState(true);
  const [openBrands, setOpenBrands] = useState(true);
  const [openFeatures, setOpenFeatures] = useState(true);
  const [openCondition, setOpenCondition] = useState(true);
  const [openRatings, setOpenRatings] = useState(true);
  const [openPriceRange, setOpenPriceRange] = useState(true);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("Any");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(999999);

  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="w-[240px] bg-[#F7FAFC] flex flex-col text-[16px] ">

      {/* Category */}
      <div>
        <div onClick={() => setOpenCategory(!openCategory)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">

          <div className="flex gap-37 h-[38px]">
            <p className="font-semibold">Category</p>
            <div className="text-gray-400 cursor-pointer">
              {openCategory ? "∧" : "∨"}
            </div>
          </div>
        </div>
        {openCategory && (
          <>
            {categories.map((c) => (
              <p key={c} className="text-[#505050] cursor-pointer h-[36px]">{c}</p>
            ))}
            <p className="text-blue-500 cursor-pointer h-[36px] ">See all</p>
          </>
        )}
      </div>

      {/* Brands */}
      <div>
        <div onClick={() => setOpenBrands(!openBrands)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">
          <div className="flex gap-42 h-[38px]">
            <p className="font-semibold">Brands</p>
            <span className="text-gray-400 cursor-pointer">
              {openBrands ? "∧" : "∨"}
            </span>
          </div>
        </div>
        {openBrands && (
          <>
            {brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-[16px] h-[36px] text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleItem(selectedBrands, setSelectedBrands, b)}
                  className="accent-blue-500"
                />
                {b}
              </label>
            ))}
            <p className="text-blue-500 cursor-pointer h-[36px] ">See all</p>
          </>
        )}
      </div>

      {/* Features */}
      <div>
        <div onClick={() => setOpenFeatures(!openFeatures)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">
          <div className="flex gap-39 h-[38px]">
            <p className="font-semibold">Features</p>
            <span className="text-gray-400 cursor-pointer">
              {openFeatures ? "∧" : "∨"}
            </span>
          </div>
        </div>
        {openFeatures && (
          <>
            {features.map((f) => (
              <label key={f} className="flex items-center gap-2 text-[16px] h-[36px] text-black cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(f)}
                  onChange={() => toggleItem(selectedFeatures, setSelectedFeatures, f)}
                  className="accent-blue-500"
                />
                {f}
              </label>
            ))}
            <p className="text-blue-500 cursor-pointer h-[36px]">See all</p>
          </>
        )}
      </div>

      {/* Price Range */}
      <div className="">
        <div onClick={() => setOpenPriceRange(!openPriceRange)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">
          <div className="flex gap-33 h-[38px]">
            <p className="font-semibold">Price range</p>
            <span className="text-gray-400 cursor-pointer">
              {openPriceRange ? "∧" : "∨"}
            </span>
          </div>
        </div>
        {openPriceRange && (
          <>
            <input type="range" min={0} max={999999} className="w-full h-[20px] accent-blue-500 mb-2" />
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-full border border-gray-200 rounded text-[#BDC4CD] p-[10px] text-[16px] focus:outline-none"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-full border border-gray-200 rounded text-[#BDC4CD] p-[10px] text-[16px] focus:outline-none"
              />
            </div>
            <button className="mt-2 mb-5 w-full font-medium border border-gray-200 text-blue-500 text-[16px] py-1.5 rounded hover:bg-blue-50">
              Apply
            </button>
          </>
        )}
      </div>

      {/* Condition */}
      <div>
        <div onClick={() => setOpenCondition(!openCondition)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">
          <div className="flex gap-37 h-[38px]">
            <p className="font-semibold">Condition</p>
            <span className="text-gray-400 cursor-pointer">
              {openCondition ? "∧" : "∨"}
            </span>
          </div>
        </div>
        {openCondition && (
          <>
            {conditions.map((c) => (
              <label key={c} className="flex items-center gap-2 text-[16px] h-[36px] text-black cursor-pointer">
                <input
                  type="radio"
                  name="condition"
                  checked={selectedCondition === c}
                  onChange={() => setSelectedCondition(c)}
                  className="accent-blue-500"
                />
                {c}
              </label>
            ))}
          </>
        )}
      </div>

      {/* Ratings */}
      <div>
        <div onClick={() => setOpenRatings(!openRatings)} className="flex justify-between items-center pt-[14px] border-t border-[#DEE2E7] ">
          <div className="flex gap-41 h-[38px]">
            <p className="font-semibold ">Ratings</p>
            <span className="text-gray-400 cursor-pointer">
              {openRatings ? "∧" : "∨"}
            </span>
          </div>
        </div>
        {openRatings && (
          <>
            {
              ratings.map((r) => (
                <label key={r} className="flex items-center h-[36px] gap-1 text-[16px] text-gray-600 mb-1 cursor-pointer">
                  <input type="checkbox" className="accent-blue-500 mr-1" />
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-[20px] leading-none ${star <= r
                          ? "text-yellow-400"
                          : "text-gray-300"
                        }`}
                    >
                      ★
                    </span>
                  ))} 
                </label>
              ))
            }
          </>
        )}
      </div>

    </div>
  );
}

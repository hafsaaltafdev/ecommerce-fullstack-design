import { useState } from "react";
import api from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function ProductInfo({ product }) {

  const navigate = useNavigate();

  if (!product) return null;

  const thumbnails = [
    product.image,
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=80&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=80&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=80&q=80",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=80&q=80",
  ];

  const [selectedImg, setSelectedImg] = useState(thumbnails[0]);

  const desktopdetails = [
    { label: "Price", value: "Negotiable" },
    { label: "Category", value: product.category },
    { label: "Material", value: "Plastic material" },
    { label: "Design", value: "Modern nice" },
    { label: "Customization", value: "Customized logo and design custom packages" },
    { label: "Protection", value: "Refund Policy" },
    { label: "Warranty", value: "2 years full warranty" },
  ];

  const mobiledetails = [
    { label: "Price", value: "Negotiable" },
    { label: "Category", value: product.category },
    { label: "Material", value: "Plastic material" },
    { label: "Design", value: "Modern nice" }
  ];

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        `/cart/add`,
        {
          productId: product._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      navigate("/cart");

    } catch (error) {
      if (error.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        console.error("Add to cart error:", error);
      }
    }
  };

  return (
    <div className="w-full md:w-[90%] md:max-w-[1440px] md:mx-auto px-0 md:px-0">

      {/* mobile heading */}
      <div className="block md:hidden">
        <div className="w-full h-[56px] bg-white p-4 flex justify-between border-b border-[#DEE2E7]">
          <Link to="/products">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#1C1C1C" />
            </svg>
          </Link>
          <div className="flex gap-5">
            <Link to="/cart"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5461 13C17.2961 13 17.9561 12.59 18.2961 11.97L21.8761 5.48C22.2461 4.82 21.7661 4 21.0061 4H6.20609L5.26609 2H1.99609V4H3.99609L7.59609 11.59L6.24609 14.03C5.51609 15.37 6.47609 17 7.99609 17H19.9961V15H7.99609L9.09609 13H16.5461ZM7.15609 6H19.3061L16.5461 11H9.52609L7.15609 6ZM7.99609 18C6.89609 18 6.00609 18.9 6.00609 20C6.00609 21.1 6.89609 22 7.99609 22C9.09609 22 9.99609 21.1 9.99609 20C9.99609 18.9 9.09609 18 7.99609 18ZM17.9961 18C16.8961 18 16.0061 18.9 16.0061 20C16.0061 21.1 16.8961 22 17.9961 22C19.0961 22 19.9961 21.1 19.9961 20C19.9961 18.9 19.0961 18 17.9961 18Z" fill="#1C1C1C" />
            </svg>
            </Link>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6C13.1 6 14 6.9 14 8C14 9.1 13.1 10 12 10C10.9 10 10 9.1 10 8C10 6.9 10.9 6 12 6ZM12 16C14.7 16 17.8 17.29 18 18H6C6.23 17.28 9.31 16 12 16ZM12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#1C1C1C" />
            </svg>
          </div>
        </div>
      </div>

      <p className="hidden md:block text-[16px] text-gray-400 h-[40px]">Home &gt; Clothings &gt; Mens wear &gt; Summer clothing</p>

      <div className="border-0 md:border border-[#DEE2E7] md:rounded-lg md:shadow-sm bg-white md:rounded-xl md:p-5 flex flex-col md:flex-row gap-4 md:gap-6">

        {/* Left: images */}
        <div className="flex flex-col gap-3">
          <img src={product.image} alt={product.name} className="w-full md:w-[380px] h-[280px] md:h-[380px] object-contain bg-gray-50 md:rounded-lg md:border md:border-gray-100" />
          <div className="hidden md:block">
            <div className=" flex gap-2">
              {thumbnails.map((t, i) => (
                <img
                  key={i}
                  src={t}
                  alt=""
                  onClick={() => setSelectedImg(t)}
                  className={`w-13 h-13 object-contain rounded border cursor-pointer ${selectedImg === t ? "border-blue-500" : "border-gray-200"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Middle: info */}
        <div className="w-full md:w-[430px] flex flex-col gap-3 md:gap-5 px-[16px] md:px-0">
          {/* Price Portion */}
          <div>
            <p className="hidden md:block text-[16px] text-green-500 font-medium mb-1">✓ in stock</p>

            {/* Mobile Ratings */}
            <div className="block md:hidden">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-[16px]">★★★★</span>
                <span className="text-[16px] text-gray-400">{product.stock} in stock</span>
              </div>
            </div>

            <h1 className="text-[16px] text-[20px] font-semibold mb-2">{product.name}</h1>

            {/* Price + range — mobile style */}
            <div className="block md:hidden">
              <div className="flex items-center gap-1 mb-2">
                <p className="text-[20px] font-bold text-red-500">${product.price}</p>
                <p className="text-[14px] text-gray-400">(50-100 pcs)</p>
              </div>
            </div>

            {/* Add to Cart — mobile style */}
            <div className="flex gap-2 md:hidden">
              <button onClick={handleAddToCart} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-[16px] py-2.5 rounded-lg font-medium">
                Add to Cart
              </button>
              <button className="w-[44px] h-[44px] border-2 border-gray-200 rounded-lg flex items-center justify-center text-blue-500 text-[20px]">
                ♡
              </button>
            </div>

            {/* Desktop Ratings */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-400 text-[16px]">★★★★</span>
                <span className="text-[16px] text-gray-400">{product.stock} in stock</span>
              </div>
            </div>

            {/* Price tiers */}
            <div className="hidden md:block">
              <div className="flex gap-3 mb-4 bg-[#FFF0DF] ">
                {[
                  { range: "1 pcs", price: "$98.00", highlight: true },
                  { range: "1 pcs", price: "$90.00", highlight: false },
                  { range: "1pcs", price: "$78.00", highlight: false },
                ].map((tier, i) => (
                  <div key={i} className="border-l border-[#FFF0DF] px-3 py-2 text-center">
                    <p className={`text-[16px] font-semibold ${tier.highlight ? "text-orange-500" : "text-gray-800"}`}>{product.price}$</p>
                    <p className="text-[13px] text-gray-400">{tier.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop Details table */}
          <div className="hidden md:block">
            <div className="flex flex-col gap-2">
              {desktopdetails.map((d) => (
                <div key={d.label} className="flex gap-4 text-[16px]">
                  <span className="text-gray-400 w-28">{d.label}:</span>
                  <span className="text-gray-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Details table */}
          <div className="block md:hidden">
            <div className="flex flex-col gap-2">
              {mobiledetails.map((d) => (
                <div key={d.label} className="flex gap-4 text-[16px]">
                  <span className="text-gray-400 w-28">{d.label}:</span>
                  <span className="text-gray-700">{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description text */}
          <div className="block md:hidden Mobile">
            <p className="text-[#505050] text-[16px]">
              {product.description}
            </p>
          </div>

          <div className="hidden md:block">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-8 py-2.5 rounded-lg mb-4 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] md:gap-[23px] px-[16px] md:px-0 pb-[20px] md:pb-0">

          {/* Supplier card — mobile simplified */}
          <div className="w-full md:w-[280px] flex flex-col gap-3 py-[16px] px-[16px] border border-gray-200 rounded-xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="4" fill="#C6F3F1" />
                  <path d="M16.0085 34V13.6364H23.6449C25.2093 13.6364 26.5218 13.9081 27.5824 14.4517C28.6496 14.9953 29.455 15.7576 29.9986 16.7386C30.5488 17.7131 30.8239 18.8499 30.8239 20.1491C30.8239 21.455 30.5455 22.5885 29.9886 23.5497C29.4384 24.5043 28.6264 25.2434 27.5526 25.767C26.4787 26.2841 25.1596 26.5426 23.5952 26.5426H18.1562V23.4801H23.098C24.0128 23.4801 24.7618 23.3542 25.3452 23.1023C25.9285 22.8437 26.3594 22.4692 26.6378 21.9787C26.9228 21.4815 27.0653 20.8717 27.0653 20.1491C27.0653 19.4266 26.9228 18.8101 26.6378 18.2997C26.3527 17.7827 25.9186 17.3916 25.3352 17.1264C24.7519 16.8546 23.9995 16.7188 23.0781 16.7188H19.6974V34H16.0085ZM26.5284 24.7727L31.5696 34H27.4531L22.5014 24.7727H26.5284Z" fill="#4CA7A7" fillOpacity="0.6" />
                </svg>
                <div>
                  <p className="text-[16px] font-semibold text-gray-800">Supplier</p>
                  <p className="text-[14px] text-gray-500">Guanjqi Trading LLC</p>
                </div>
              </div>
              {/* Mobile: arrow */}
              <span className="md:hidden text-gray-400 text-[20px]">›</span>
            </div>

            {/* Supplier info */}
            <div className="flex gap-4 md:flex-col md:gap-1 text-[14px] md:text-[16px] text-gray-400">
              <p className="flex items-center gap-2"><span>🇩🇪</span> <span className="hidden md:inline">Germany, Berlin</span><span className="md:hidden">Germany</span></p>
              <p className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 0.833374L2.5 4.16671V9.16671C2.5 13.7917 5.7 18.1167 10 19.1667C14.3 18.1167 17.5 13.7917 17.5 9.16671V4.16671L10 0.833374ZM15.8333 9.16671C15.8333 12.9334 13.35 16.4084 10 17.4417C6.65 16.4084 4.16667 12.9334 4.16667 9.16671V5.25004L10 2.65837L15.8333 5.25004V9.16671ZM6.175 9.65837L5 10.8334L8.33333 14.1667L15 7.50004L13.825 6.31671L8.33333 11.8084L6.175 9.65837Z" fill="#8B96A5" /></svg>
                Verified
              </p>
              <p className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M9.99169 1.66663C5.39169 1.66663 1.66669 5.39996 1.66669 9.99996C1.66669 14.6 5.39169 18.3333 9.99169 18.3333C14.6 18.3333 18.3334 14.6 18.3334 9.99996C18.3334 5.39996 14.6 1.66663 9.99169 1.66663ZM15.7667 6.66663H13.3084C13.0417 5.62496 12.6584 4.62496 12.1584 3.69996C13.6917 4.22496 14.9667 5.29163 15.7667 6.66663ZM10 3.36663C10.6917 4.36663 11.2334 5.47496 11.5917 6.66663H8.40835C8.76669 5.47496 9.30835 4.36663 10 3.36663ZM3.55002 11.6666C3.41669 11.1333 3.33335 10.575 3.33335 9.99996C3.33335 9.42496 3.41669 8.86663 3.55002 8.33329H6.36669C6.30002 8.88329 6.25002 9.43329 6.25002 9.99996C6.25002 10.5666 6.30002 11.1166 6.36669 11.6666H3.55002ZM4.23335 13.3333H6.69169C6.95835 14.375 7.34169 15.375 7.84169 16.3C6.30835 15.775 5.03335 14.7166 4.23335 13.3333ZM6.69169 6.66663H4.23335C5.03335 5.28329 6.30835 4.22496 7.84169 3.69996C7.34169 4.62496 6.95835 5.62496 6.69169 6.66663ZM10 16.6333C9.30835 15.6333 8.76669 14.525 8.40835 13.3333H11.5917C11.2334 14.525 10.6917 15.6333 10 16.6333ZM11.95 11.6666H8.05002C7.97502 11.1166 7.91669 10.5666 7.91669 9.99996C7.91669 9.43329 7.97502 8.87496 8.05002 8.33329H11.95C12.025 8.87496 12.0834 9.43329 12.0834 9.99996C12.0834 10.5666 12.025 11.1166 11.95 11.6666ZM12.1584 16.3C12.6584 15.375 13.0417 14.375 13.3084 13.3333H15.7667C14.9667 14.7083 13.6917 15.775 12.1584 16.3ZM13.6334 11.6666C13.7 11.1166 13.75 10.5666 13.75 9.99996C13.75 9.43329 13.7 8.88329 13.6334 8.33329H16.45C16.5834 8.86663 16.6667 9.42496 16.6667 9.99996C16.6667 10.575 16.5834 11.1333 16.45 11.6666H13.6334Z" fill="#8B96A5" /></svg>
                Shipping
              </p>
            </div>

            {/* Buttons — desktop only */}
            <div className="hidden md:flex flex-col gap-2">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-[16px] py-2 rounded-lg font-medium">
                Send Inquiry
              </button>
              <button className="w-full border-2 border-gray-200 text-blue-500 text-[16px] py-2 rounded-lg font-medium hover:bg-blue-50">
                Seller's profile
              </button>
            </div>
          </div>

          <button className="hidden md:flex items-center justify-center gap-1 text-[16px] text-blue-500 font-medium cursor-pointer">
            ♡ Save for later
          </button>
        </div>
      </div>
    </div>
  );
}

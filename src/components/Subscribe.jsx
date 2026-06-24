export default function SubscribePage() {
  return (
    <div className="bg-[#F3F4F6] px-[16px] md:px-12 py-[38px] flex flex-col gap-[21px]">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-[18px] md:text-[20px] font-semibold">Subscribe on our newsletter</h2>
        <p className="text-sm text-[#606060]">Get daily news on upcoming offers from many suppliers all over the world</p>
      </div>
      <div className="flex justify-center gap-2">
        <input
          type="email"
          placeholder="✉ Email"
          className="border border-gray-300 w-[70%] md:w-[23%] bg-white p-[9px] rounded-lg text-sm focus:outline-none"
        />
        <button className="bg-[#0067FF] hover:bg-[#127FFF] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
}
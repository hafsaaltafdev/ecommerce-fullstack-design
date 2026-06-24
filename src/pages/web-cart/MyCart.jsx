import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import smartwatch from "../../assets/smartwatch.png?url";
import mobile from "../../assets/mobile.png?url";
import laptop from "../../assets/laptop.png?url";
import teblet from "../../assets/teblet.png?url";


export default function MyCartPage() {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coupon, setCoupon] = useState("");
    const [openMenu, setOpenMenu] = useState(null);

    const subtotal = items.reduce((sum, i) => {
        if (!i?.productId) return sum;
        return sum + (i.productId.price || 0) * i.quantity;
    }, 0);

    const discount = 60;
    const tax = 14;
    const total = subtotal - discount + tax;

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await api.get("/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // backend returns: { cart }
            setItems(res.data.cart?.items || []);

        } catch (err) {
            console.log("Cart fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // for remove one product
    const removeItem = async (productId) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/cart/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchCart(); // refresh cart

        } catch (err) {
            console.log("Remove error:", err);
        }
    };

    const updateQty = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/cart/update",
                { productId, quantity: Number(quantity) },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchCart();

        } catch (err) {
            console.log("Update qty error:", err);
        }
    };

    // for remove all products
    const clearCart = async () => {
        try {
            const token = localStorage.getItem("token");

            await api.delete("/cart/clear", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("CLEAR RESPONSE DONE"); // 👈 check

            setItems([]);

            fetchCart();

        } catch (err) {
            console.log("Clear cart error:", err);
        }
    };

    // saved for later things
    const initialSaved = [
        { id: 1, name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", img: teblet },
        { id: 2, name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", img: mobile },
        { id: 3, name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", img: smartwatch },
        { id: 4, name: "GoPro HERO6 4K Action Camera - Black", price: "$99.50", img: laptop },
    ];

    const [saved, setSaved] = useState(initialSaved);
    const [moved, setMoved] = useState([]);

    const moveToCart = (id) => {
        setMoved((prev) => [...prev, id]);
        setTimeout(() => {
            setSaved((prev) => prev.filter((i) => i.id !== id));
            setMoved((prev) => prev.filter((i) => i !== id));
        }, 800);
    };

    return (
        <>
            {/* my-cart portion */}
            <div className="w-full md:w-[90%] md:max-w-[1440px] md:mx-auto">
                <h2 className="hidden md:block text-xl font-semibold text-gray-800 mb-4">My cart ({items.length})</h2>
                {/* mobile heading */}
                <Link to="/products" className="block md:hidden w-full h-[56px] bg-white p-4 flex gap-4 border-b border-[#DEE2E7]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#1C1C1C" />
                    </svg>
                    <p className="text-[18px] font-semibold">Shopping cart </p>
                </Link>

                <div className="flex flex-col md:flex-row md:gap-4">
                    {/* Cart Portion */}
                    <div className="w-full md:flex-1">
                        {/* Cart items */}
                        <div className="w-full bg-white border border-[#DEE2E7] md:rounded-lg md:shadow-sm p-4 md:p-5 flex flex-col gap-4 md:gap-5 md:mb-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                                    <img src={item.productId.image} alt={item.productId.name} className="w-18 h-18 md:w-20 md:h-20 object-contain rounded border border-gray-100 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[14px] md:text-[16px] font-medium">{item.productId.name}</p>
                                        <p className="text-[13px] md:text-[16px] text-gray-400">Size: medium, Color: blue</p>
                                        <p className="text-[13px] md:text-[16px] text-gray-400">Seller: {item.seller}</p>

                                        {/* Mobile: qty controls + price inline */}
                                        <div className="flex items-center justify-between mt-2 md:hidden">
                                            <div className="flex items-center gap-2 border border-gray-200 rounded px-2 py-1">
                                                <button onClick={() =>
                                                    item.quantity > 1 &&
                                                    updateQty(item.productId._id, item.quantity - 1)
                                                } className="text-gray-500 text-lg font-medium w-6 h-6 flex items-center justify-center">−</button>

                                                <span className="text-[14px] font-medium px-1">{item.quantity}</span>

                                                <button onClick={() =>
                                                    updateQty(item.productId._id, item.quantity + 1)
                                                } className="text-gray-500 text-lg font-medium w-6 h-6 flex items-center justify-center">+</button>
                                            </div>
                                            <p className="text-[16px] font-semibold">${item.productId.price.toFixed(2)}</p>
                                        </div>

                                        {/* Desktop: remove + save buttons */}
                                        <div className="hidden md:flex gap-2 mt-[10px]">
                                            <button onClick={() => removeItem(item.productId._id)} className="text-[13px] font-medium text-red-400 border border-gray-300 rounded px-2 py-0.5 hover:bg-red-50">Remove</button>
                                            <button className="text-[13px] font-medium text-blue-500 border border-gray-300 rounded px-2 py-0.5 hover:bg-blue-50">Save for later</button>
                                        </div>
                                    </div>

                                    {/* Desktop: price + qty select */}
                                    <div className="hidden md:flex flex-col items-end gap-2 shrink-0">
                                        <p className="text-[16px] font-medium">${item.productId.price.toFixed(2)}</p>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => updateQty(item.productId._id, e.target.value)}
                                            className="border-2 border-gray-200 rounded px-2 py-1 text-[16px] focus:outline-none"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>

                                    {/* Mobile: 3 dot menu icon */}
                                    <div className="md:hidden flex items-start pt-1 relative">
                                        <button
                                            onClick={() =>
                                                setOpenMenu(
                                                    openMenu === item.productId._id
                                                        ? null
                                                        : item.productId._id
                                                )
                                            }
                                            className="text-gray-400 text-xl px-2"
                                        >
                                            ⋮
                                        </button>
                                        {openMenu === item.productId._id && (
                                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg w-32 z-50">
                                                <button
                                                    onClick={() => {
                                                        removeItem(item.productId._id);
                                                        setOpenMenu(null);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Bottom actions */}
                            <div className="hidden md:block">
                                <div className="flex justify-between items-center pt-2">
                                    <Link className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white text-[16px] font-medium px-4 py-2 rounded" to="/products">← Back to shop</Link>
                                    <button onClick={clearCart} className="text-[16px] text-blue-500 border-2 py-2 px-4 rounded border-gray-200">Remove all</button>
                                </div>
                            </div>
                        </div>

                        {/* Trust badges — mobile par hidden */}
                        <div className="hidden md:flex gap-6 pt-3 border-t border-gray-100">
                            {[
                                { icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#DEE2E7" /><path fillRule="evenodd" clipRule="evenodd" d="M30 20H29V18C29 15.24 26.76 13 24 13C21.24 13 19 15.24 19 18V20H18C16.9 20 16 20.9 16 22V32C16 33.1 16.9 34 18 34H30C31.1 34 32 33.1 32 32V22C32 20.9 31.1 20 30 20ZM24 29C22.9 29 22 28.1 22 27C22 25.9 22.9 25 24 25C25.1 25 26 25.9 26 27C26 28.1 25.1 29 24 29ZM21 20V18C21 16.34 22.34 15 24 15C25.66 15 27 16.34 27 18V20H21Z" fill="#8B96A5" /></svg>, label: "Secure payment", sub: "Have you ever finally just" },
                                { icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#DEE2E7" /><path fillRule="evenodd" clipRule="evenodd" d="M32 15H16C14.9 15 14.01 15.9 14.01 17L14 35L18 31H32C33.1 31 34 30.1 34 29V17C34 15.9 33.1 15 32 15ZM19 22H29C29.55 22 30 22.45 30 23C30 23.55 29.55 24 29 24H19C18.45 24 18 23.55 18 23C18 22.45 18.45 22 19 22ZM25 27H19C18.45 27 18 26.55 18 26C18 25.45 18.45 25 19 25H25C25.55 25 26 25.45 26 26C26 26.55 25.55 27 25 27ZM29 21H19C18.45 21 18 20.55 18 20C18 19.45 18.45 19 19 19H29C29.55 19 30 19.45 30 20C30 20.55 29.55 21 29 21Z" fill="#8B96A5" /></svg>, label: "Customer support", sub: "Have you ever finally just" },
                                { icon: <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="24" fill="#DEE2E7" /><path fillRule="evenodd" clipRule="evenodd" d="M31.5 20H29V18C29 16.9 28.1 16 27 16H15C13.9 16 13 16.9 13 18V27C13 28.1 13.9 29 15 29C15 30.66 16.34 32 18 32C19.66 32 21 30.66 21 29H27C27 30.66 28.34 32 30 32C31.66 32 33 30.66 33 29H34C34.55 29 35 28.55 35 28V24.67C35 24.24 34.86 23.82 34.6 23.47L32.3 20.4C32.11 20.15 31.81 20 31.5 20ZM18 30C17.45 30 17 29.55 17 29C17 28.45 17.45 28 18 28C18.55 28 19 28.45 19 29C19 29.55 18.55 30 18 30ZM31.5 21.5L33.46 24H29V21.5H31.5ZM30 30C29.45 30 29 29.55 29 29C29 28.45 29.45 28 30 28C30.55 28 31 28.45 31 29C31 29.55 30.55 30 30 30Z" fill="#8B96A5" /></svg>, label: "Free delivery", sub: "Have you ever finally just" },
                            ].map((b) => (
                                <div key={b.label} className="flex items-center gap-[10px]">
                                    <div>{b.icon}</div>
                                    <div>
                                        <p className="text-[16px]">{b.label}</p>
                                        <p className="text-[10px] text-gray-400">{b.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="w-full md:w-[280px] flex flex-col gap-3 md:shrink-0">

                        {/* Mobile: simple summary */}
                        <div className="md:hidden bg-white border border-[#DEE2E7] py-4 px-4">
                            <div className="flex flex-col gap-1 text-[15px] pb-3 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600"><span>Items ({items.length}):</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-gray-600"><span>Discount::</span><span>- $60.00</span></div>
                                <div className="flex justify-between text-green-500"><span>Tax:</span><span>+$14.00</span></div>
                            </div>
                            <div className="flex justify-between font-bold text-[16px] pt-3 mb-4">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white text-[16px] font-medium py-3 rounded">
                                Checkout
                            </button>
                        </div>

                        {/* Desktop: full summary */}
                        <div className="hidden md:flex flex-col gap-2 bg-white border border-[#DEE2E7] rounded-lg shadow-sm p-4">
                            <p className="text-[16px] text-[#505050]">Have a coupon?</p>
                            <div className="flex">
                                <input
                                    type="text"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    placeholder="Add coupon"
                                    className="w-[156px] border border-gray-300 rounded-l px-2 py-1 text-[16px] focus:outline-none"
                                />
                                <button className="border border-gray-300 text-blue-500 font-medium text-[16px] px-2 py-1 rounded-r hover:bg-blue-600">Apply</button>
                            </div>
                        </div>
                        <div className="hidden md:block bg-white border border-[#DEE2E7] rounded-lg shadow-sm py-5 px-4">
                            <div className="flex flex-col gap-1 text-[16px] px-1 pb-4 border-b border-gray-200">
                                <div className="flex justify-between text-gray-600"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between text-red-500"><span>Discount:</span><span>- ${discount.toFixed(2)}</span></div>
                                <div className="flex justify-between text-green-500"><span>Tax:</span><span>+ ${tax.toFixed(2)}</span></div>
                            </div>
                            <div className="flex justify-between items-center font-semibold pt-4 mb-[22px]">
                                <span className="text-[16px]">Total:</span>
                                <span className="text-[20px]">${total.toFixed(2)}</span>
                            </div>
                            <button className="w-full bg-green-500 hover:bg-green-600 text-white text-[18px] font-medium py-3 rounded mb-[18px]">
                                Checkout
                            </button>
                            <div className="flex justify-center gap-2">
                                <span><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V18C33.5 19.933 31.933 21.5 30 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="white" stroke="#EEEEEE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5797 7H10.4251L9.56419 8.99471L8.64027 7H7.50646V9.77159L6.30963 7H5.25984L4 9.93963H4.75587L5.02879 9.28863H6.49853L6.77144 9.93963H8.19932V7.63L9.22811 9.93963H9.83695L10.8659 7.63V9.93963H11.5797V7ZM27.2437 9.93963H26.236L24.9132 7.73487V9.93963H23.4856L23.2124 9.28863H21.7427L21.4697 9.93963H20.6507C20.3148 9.93963 19.8738 9.85561 19.6221 9.60355C19.391 9.35164 19.265 9.01572 19.265 8.49074C19.265 8.04979 19.328 7.65085 19.6428 7.33593C19.8527 7.10487 20.2308 7 20.7136 7H21.3854V7.63H20.7136C20.4618 7.63 20.3146 7.67201 20.1677 7.79804C20.0417 7.92407 19.9787 8.15497 19.9787 8.46989C19.9787 8.78481 20.0417 9.01587 20.1677 9.1629C20.2726 9.26778 20.4618 9.30979 20.6505 9.30979H20.9656L21.9734 7.00015H23.0233L24.1992 9.77174V7H25.2911L26.53 9.03672V7H27.2437V9.93963ZM26.236 13.4462C26.068 13.2991 25.8159 13.2152 25.417 13.2152H25.0392C24.9358 13.2152 24.8526 13.1946 24.7699 13.1742L24.7663 13.1733C24.6821 13.1312 24.6194 13.0682 24.6194 12.9631C24.6194 12.8581 24.6403 12.7951 24.7243 12.7321C24.7873 12.6902 24.8712 12.6902 24.9972 12.6902H26.2991V12.0602H24.8923C24.1363 12.0602 23.8842 12.5222 23.8842 12.9423C23.8842 13.8069 24.6019 13.8254 25.2277 13.8416C25.2704 13.8427 25.3127 13.8438 25.3543 13.8452C25.48 13.8452 25.5642 13.866 25.606 13.9082C25.6479 13.9501 25.6902 14.0339 25.6902 14.1181C25.6902 14.202 25.6481 14.265 25.606 14.3071C25.543 14.349 25.4592 14.3699 25.3331 14.3699H23.9683V14.9998H25.3331C26.0468 14.9998 26.4459 14.7061 26.4459 14.0762C26.4459 13.7823 26.3621 13.5931 26.236 13.4462ZM29.1967 14.0762C29.1967 14.7062 28.7977 14.9998 28.0837 14.9998H26.7192V14.3699H28.0837C28.2097 14.3699 28.3148 14.349 28.3569 14.3071C28.3988 14.265 28.4408 14.202 28.4408 14.1181C28.4408 14.0339 28.3989 13.9501 28.3569 13.9082C28.3148 13.866 28.2309 13.8452 28.1049 13.8452C28.0632 13.8438 28.0208 13.8427 27.9781 13.8416C27.3526 13.8254 26.6351 13.8069 26.6351 12.9423C26.6351 12.5222 26.908 12.0602 27.6429 12.0602H29.0496V12.6902H27.7478C27.6221 12.6902 27.5379 12.6902 27.4749 12.7321C27.4119 12.7951 27.37 12.8581 27.37 12.9631C27.37 13.0682 27.433 13.1312 27.5169 13.1733L27.5187 13.1738C27.6023 13.1945 27.6858 13.2152 27.7901 13.2152H28.1679C28.5668 13.2152 28.8189 13.2991 28.9869 13.4462C29.1127 13.5931 29.1967 13.7823 29.1967 14.0762ZM21.8898 14.3912H23.5483V15H21.1968V12.0605H23.5483V12.6694H21.8898V13.2155H23.5065V13.8032H21.8898V14.3912ZM20.4408 12.2076C20.2097 12.0815 19.9368 12.0604 19.5799 12.0604H17.9633V14.9998H18.677V13.9291H19.433C19.6848 13.9291 19.832 13.9502 19.937 14.0551C20.063 14.202 20.063 14.454 20.063 14.6431V14.9998H20.7557V14.4329C20.7557 14.16 20.7349 14.0339 20.6509 13.887C20.5878 13.8029 20.4621 13.698 20.2941 13.635C20.4828 13.5723 20.798 13.3202 20.798 12.8581C20.7979 12.5223 20.6719 12.3333 20.4408 12.2076ZM14.2046 12.0604H16.4514C16.9974 12.0604 17.6274 12.2284 17.6275 13.0263C17.6275 13.8452 17.0184 14.0132 16.4095 14.0132H15.5276V14.9998H14.1628L13.3019 14.0339L12.3989 14.9998H9.60619V12.0604H12.4408L13.3017 13.0263L14.2046 12.0604ZM19.8738 13.2784C19.7689 13.3202 19.6639 13.3202 19.5379 13.3202L18.677 13.3414V12.6692H19.5379C19.6639 12.6692 19.79 12.6692 19.8738 12.7322C19.958 12.7744 20.0207 12.8583 20.0207 12.9843C20.0207 13.1103 19.958 13.2153 19.8738 13.2784ZM15.5275 13.4252H16.4514C16.7033 13.4252 16.8713 13.2784 16.8713 13.0263C16.8713 12.7744 16.7034 12.6692 16.4514 12.6692H15.5275V13.4252ZM13.7427 13.5301L14.8345 12.3754V14.7481L13.7427 13.5301ZM10.2991 14.3912H12.0419L12.8397 13.5303L12.0629 12.6694H10.2991V13.2155H11.8528V13.8032H10.2991V14.3912ZM18.1943 7H18.908V9.93963H18.1943V7ZM17.4172 7.12603C17.1861 7 16.9343 7 16.5774 7H14.9605V9.93963H15.6533V8.86868H16.4092C16.6613 8.86868 16.8293 8.88969 16.9342 8.99471C17.045 9.12403 17.042 9.3346 17.0397 9.49769V9.49777C17.0394 9.52007 17.0391 9.54149 17.0391 9.56169V9.93963H17.7528V9.35164C17.7528 9.09974 17.7319 8.97371 17.627 8.82667C17.564 8.74265 17.438 8.63763 17.2911 8.57476C17.4799 8.49074 17.7951 8.25984 17.7951 7.79788C17.7952 7.46196 17.6481 7.27291 17.4172 7.12603ZM12.8187 9.33079H14.4565V9.93978H12.1049V7.00015H14.4565V7.60899H12.8187V8.13396H14.4355V8.7428H12.8187V9.33079ZM22.4775 7.50397L22.9606 8.65878H21.9947L22.4775 7.50397ZM16.8713 8.19698C16.7665 8.25999 16.6614 8.25999 16.5144 8.25999H15.6533V7.60914H16.5142C16.6403 7.60914 16.787 7.60914 16.8712 7.65115C16.955 7.71417 16.9972 7.79819 16.9972 7.92407C16.9972 8.04994 16.9552 8.15482 16.8713 8.19698ZM5.76366 7.50397L5.28069 8.65878H6.24662L5.76366 7.50397Z" fill="#0077A6" />
                                </svg>
                                </span>
                                <span><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V18C33.5 19.933 31.933 21.5 30 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="white" stroke="#EEEEEE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0897 10.8526C15.0897 9.01564 15.9384 7.38017 17.2598 6.32178C16.2854 5.54133 15.0545 5.0741 13.7149 5.0741C10.5587 5.0741 8 7.66122 8 10.8526C8 14.0439 10.5587 16.631 13.7149 16.631C15.0545 16.631 16.2854 16.1638 17.2598 15.3833C15.9384 14.3249 15.0897 12.6895 15.0897 10.8526Z" fill="#EB001B" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0896 10.8525C15.0896 12.6895 15.9383 14.3249 17.2597 15.3833C18.5811 14.3249 19.4297 12.6895 19.4297 10.8525C19.4297 9.01563 18.5811 7.38017 17.2597 6.32178C15.9383 7.38017 15.0896 9.01563 15.0896 10.8525Z" fill="#FF5E00" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8046 5.0741C19.465 5.0741 18.2341 5.54133 17.2598 6.32178C18.5811 7.38025 19.4298 9.01564 19.4298 10.8526C19.4298 12.6895 18.5811 14.3249 17.2598 15.3833C18.2341 16.1638 19.465 16.631 20.8046 16.631C23.9608 16.631 26.5195 14.0439 26.5195 10.8526C26.5195 7.66122 23.9608 5.0741 20.8046 5.0741Z" fill="#F79E1C" />
                                </svg>
                                </span>
                                <span><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V18C33.5 19.933 31.933 21.5 30 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="white" stroke="#EEEEEE" />
                                    <path d="M21.099 5.05579C20.4616 4.31682 19.3092 4 17.835 4H13.5563C13.255 4.00001 12.9984 4.22284 12.9512 4.5255L11.1697 16.0167C11.1343 16.2433 11.3068 16.4485 11.5326 16.4485H14.1741L14.8375 12.1691L14.8169 12.3031C14.8641 12.0007 15.1185 11.7775 15.4197 11.7775H16.6749C19.1408 11.7775 21.0716 10.7589 21.6357 7.81228C21.6524 7.72513 21.6669 7.64031 21.6794 7.55744C21.6083 7.5191 21.6083 7.5191 21.6794 7.55744C21.8474 6.46833 21.6783 5.72698 21.099 5.05579Z" fill="#27346A" />
                                    <path d="M15.8482 7.1651C15.9204 7.13013 15.9994 7.11201 16.0794 7.11206H19.4337C19.8309 7.11206 20.2014 7.13835 20.54 7.19377C20.6347 7.20913 20.729 7.22747 20.8226 7.24876C20.9553 7.27854 21.0864 7.31499 21.2156 7.35797C21.382 7.4145 21.537 7.48034 21.6795 7.55744C21.8474 6.46791 21.6783 5.72698 21.099 5.05579C20.4612 4.31682 19.3092 4 17.835 4H13.556C13.2547 4 12.9984 4.22306 12.9512 4.5255L11.1697 16.0163C11.1343 16.2432 11.3068 16.4481 11.5322 16.4481H14.1741L15.5504 7.57177C15.5779 7.39466 15.6892 7.24261 15.8482 7.1651Z" fill="#27346A" />
                                    <path d="M21.6356 7.81221C21.0716 10.7584 19.1408 11.7775 16.6749 11.7775H15.4193C15.1181 11.7775 14.8637 12.0006 14.8169 12.3031L13.9916 17.6239C13.9607 17.8222 14.1115 18.0019 14.3088 18.0019H16.5355C16.799 18.0019 17.0233 17.8069 17.0645 17.5422L17.0862 17.4268L17.5059 14.7218L17.5329 14.5723C17.5741 14.3076 17.7984 14.1127 18.0619 14.1126H18.3951C20.5521 14.1126 22.2411 13.2214 22.7347 10.6438C22.9407 9.56669 22.8341 8.66737 22.2891 8.03569C22.1238 7.84437 21.9185 7.68635 21.6794 7.55737C21.6664 7.64066 21.6524 7.72506 21.6356 7.81221Z" fill="#2790C3" />
                                    <path d="M21.0891 7.31802C21.0011 7.2919 20.9124 7.26878 20.8229 7.24869C20.7292 7.22774 20.635 7.20953 20.5403 7.19406C20.2014 7.13828 19.8312 7.11194 19.4336 7.11194H16.0796C15.9996 7.11176 15.9205 7.13003 15.8485 7.1654C15.6893 7.24268 15.5778 7.39484 15.5506 7.57207L14.8377 12.1691L14.8171 12.3031C14.864 12.0006 15.1184 11.7775 15.4197 11.7775H16.6753C19.1411 11.7775 21.0719 10.7589 21.6359 7.8122C21.6527 7.72506 21.6668 7.6406 21.6798 7.55736C21.5369 7.48068 21.3823 7.41443 21.2158 7.35827C21.1738 7.3441 21.1316 7.33068 21.0891 7.31802" fill="#1F264F" />
                                </svg>
                                </span>
                                <span><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V18C33.5 19.933 31.933 21.5 30 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="white" stroke="#EEEEEE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.361 7.33436L21.0832 8.98113C20.2502 8.51036 18.3544 8.39897 18.3542 9.26605C18.3542 9.61051 18.7831 9.84741 19.3001 10.1329C20.0842 10.566 21.0708 11.1108 21.0708 12.3124C21.0708 14.2324 19.0668 14.9378 17.7384 14.9378C16.4104 14.9378 15.5412 14.5048 15.5412 14.5048L15.8306 12.783C16.6276 13.4392 19.0426 13.6256 19.0426 12.585C19.0426 12.1478 18.5672 11.8899 18.0159 11.5908C17.2553 11.1783 16.3502 10.6873 16.3502 9.53867C16.3502 7.43303 18.6442 7 19.6102 7C20.5038 7 21.361 7.33436 21.361 7.33436ZM27.856 14.8055H26.0686L25.8406 13.6665H23.366L22.9602 14.8055H20.931L23.8342 7.70831C23.8342 7.70831 24.0102 7.13682 24.7328 7.13682H26.2976L27.856 14.8055ZM10.7576 7.13703L8.9018 12.4115L8.6822 11.2757L8.6824 11.2761L8.0274 7.82749C8.0274 7.82749 7.9482 7.13703 7.104 7.13703H4.036L4 7.26687C4 7.26687 4.9382 7.46708 6.0362 8.14338L7.7274 14.8057H9.7556L12.8526 7.13703H10.7576ZM14.3418 14.8055H12.3952L13.6118 7.13703H15.5586L14.3418 14.8055ZM23.9266 12.0929L24.9494 9.22318L25.5248 12.0929H23.9266Z" fill="#2566AF" />
                                    <path d="M8.6824 11.2759L8.0274 7.8273C8.0274 7.8273 7.9482 7.13684 7.104 7.13684H4.036L4 7.26669C4 7.26669 5.4746 7.58012 6.889 8.75448C8.2414 9.87694 8.6824 11.2759 8.6824 11.2759Z" fill="#E6A540" />
                                </svg>
                                </span>
                                <span><svg width="34" height="22" viewBox="0 0 34 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 0.5H30C31.933 0.5 33.5 2.067 33.5 4V18C33.5 19.933 31.933 21.5 30 21.5H4C2.067 21.5 0.5 19.933 0.5 18V4C0.5 2.067 2.067 0.5 4 0.5Z" fill="white" stroke="#EEEEEE" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M21.361 7.33436L21.0832 8.98113C20.2502 8.51036 18.3544 8.39897 18.3542 9.26605C18.3542 9.61051 18.7831 9.84741 19.3001 10.1329C20.0842 10.566 21.0708 11.1108 21.0708 12.3124C21.0708 14.2324 19.0668 14.9378 17.7384 14.9378C16.4104 14.9378 15.5412 14.5048 15.5412 14.5048L15.8306 12.783C16.6276 13.4392 19.0426 13.6256 19.0426 12.585C19.0426 12.1478 18.5672 11.8899 18.0159 11.5908C17.2553 11.1783 16.3502 10.6873 16.3502 9.53867C16.3502 7.43303 18.6442 7 19.6102 7C20.5038 7 21.361 7.33436 21.361 7.33436ZM27.856 14.8055H26.0686L25.8406 13.6665H23.366L22.9602 14.8055H20.931L23.8342 7.70831C23.8342 7.70831 24.0102 7.13682 24.7328 7.13682H26.2976L27.856 14.8055ZM10.7576 7.13703L8.9018 12.4115L8.6822 11.2757L8.6824 11.2761L8.0274 7.82749C8.0274 7.82749 7.9482 7.13703 7.104 7.13703H4.036L4 7.26687C4 7.26687 4.9382 7.46708 6.0362 8.14338L7.7274 14.8057H9.7556L12.8526 7.13703H10.7576ZM14.3418 14.8055H12.3952L13.6118 7.13703H15.5586L14.3418 14.8055ZM23.9266 12.0929L24.9494 9.22318L25.5248 12.0929H23.9266Z" fill="#2566AF" />
                                    <path d="M8.6824 11.2759L8.0274 7.8273C8.0274 7.8273 7.9482 7.13684 7.104 7.13684H4.036L4 7.26669C4 7.26669 5.4746 7.58012 6.889 8.75448C8.2414 9.87694 8.6824 11.2759 8.6824 11.2759Z" fill="#E6A540" />
                                </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* saved for later portion */}
            <div className="w-full md:w-[90%] md:max-w-[1440px] md:mx-auto flex flex-col gap-4 md:gap-6 mt-4">

                {/* Saved for later */}
                <div className="bg-white border border-[#DEE2E7] rounded-lg shadow-sm p-4 md:p-5">
                    <h2 className="text-[20px] md:text-[24px] font-semibold mb-4 md:mb-6">Saved for later</h2>
                    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-5">
                        {saved.map((item) => (
                            <div key={item.id} className=" md:rounded flex md:flex-col gap-3 md:gap-0">
                                <img src={item.img} alt={item.name} className="w-[80px] h-[80px] md:w-[270px] md:h-[240px] object-contain md:mb-[10px] shrink-0" />
                                <div className="flex flex-col justify-center flex-1">
                                    <p className="text-[15px] md:text-[16px] font-semibold mb-1 md:mb-[10px]">{item.price}</p>
                                    <p className="text-[13px] md:text-[16px] text-[#606060] mb-2 md:mb-3">{item.name}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => moveToCart(item.id)}
                                            className={`flex items-center justify-center gap-1 border text-[13px] md:text-[16px] font-medium py-1 md:py-1.5 px-2 md:px-3 rounded ${moved.includes(item.id) ? "border-green-400 text-green-500 bg-green-50" : "border-blue-400 text-blue-500 hover:bg-blue-50"}`}
                                        >
                                            🛒 {moved.includes(item.id) ? "Added!" : "Move to cart"}
                                        </button>
                                        <button className="text-[13px] text-red-400 border border-red-300 rounded px-2 py-1 hover:bg-red-50 md:hidden">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blue promo banner */}
                <div className="hidden md:block">
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
        </>
    );
}

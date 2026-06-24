import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const res = await api.post("/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            // Save token
            localStorage.setItem("token", res.data.token);

            // Save token
            localStorage.setItem("role", res.data.role);

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(res.data.user)
            );

            alert("Login Successful");

            console.log(res.data);

            // redirect
            navigate("/");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center px-3 sm:px-4 md:px-6 py-4 md:py-8">
            <div className="relative w-full max-w-[450px] bg-white border border-[#DEE2E7] rounded-xl shadow-md p-4 sm:p-6 md:p-8">

                {/* cross button */}
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-3">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.4673 1.91309H37.1847C40.9486 1.91309 43.9999 5.28555 43.9999 9.44569V34.5544C43.9999 38.7145 40.9486 42.087 37.1847 42.087H14.4673C10.7034 42.087 7.6521 38.7145 7.6521 34.5544L7.6521 9.44569C7.6521 5.28555 10.7034 1.91309 14.4673 1.91309Z" fill="#0D6EFD" fillOpacity="0.2" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.13046 1.91309H32.0435C36.0055 1.91309 39.2174 5.28555 39.2174 9.44569V34.5544C39.2174 38.7145 36.0055 42.087 32.0435 42.087H8.13046C4.16841 42.087 0.956542 38.7145 0.956543 34.5544L0.956543 9.44569C0.956543 5.28555 4.16841 1.91309 8.13046 1.91309Z" fill="#0D6EFD" />
                            <g opacity="0.7">
                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M15.2902 18.3563H14.3097C14.2592 18.3563 14.1842 18.4266 14.1813 18.4731L13.459 30.1478L26.9549 30.1452L26.2254 18.4731C26.2226 18.4284 26.1458 18.3563 26.097 18.3563H25.1165V20.3216C25.1165 20.8643 24.6765 21.3042 24.1338 21.3042C23.5912 21.3042 23.1512 20.8643 23.1512 20.3216V18.3563H17.2555V20.3216C17.2555 20.8643 16.8156 21.3042 16.2729 21.3042C15.7302 21.3042 15.2902 20.8643 15.2902 20.3216V18.3563Z" fill="white" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.2033 11.4783C22.9153 11.4783 25.1164 13.6796 25.1164 16.3891L26.0969 16.3914C27.1835 16.3914 28.1192 17.2704 28.1867 18.3508L28.9244 30.1539C28.9921 31.2361 28.1698 32.1133 27.0865 32.1133H13.3201C12.2374 32.1133 11.4146 31.2344 11.4821 30.1539L12.2198 18.3508C12.2875 17.2686 13.2213 16.3914 14.3096 16.3914H15.2902C15.2902 13.6781 17.493 11.4783 20.2033 11.4783ZM23.1511 16.3915C23.1511 14.765 21.8299 13.4436 20.2033 13.4436C18.5778 13.4436 17.2554 14.7642 17.2554 16.3892L23.1511 16.3915ZM15.2902 18.3566H14.3096C14.2591 18.3566 14.1842 18.4269 14.1813 18.4733L13.4589 30.148L26.9548 30.1455L26.2253 18.4733C26.2225 18.4286 26.1457 18.3566 26.0969 18.3566H25.1164V20.3218C25.1164 20.8645 24.6765 21.3044 24.1338 21.3044C23.5911 21.3044 23.1512 20.8645 23.1512 20.3218V18.3566H17.2554V20.3218C17.2554 20.8645 16.8155 21.3044 16.2728 21.3044C15.7301 21.3044 15.2902 20.8645 15.2902 20.3218V18.3566Z" fill="white" />
                            </g>
                        </g>
                    </svg>
                    <svg width="77" height="22" viewBox="0 0 77 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20.8061H8.88934C13.5626 20.8061 16.0516 18.3679 16.0516 15.056C16.0516 11.9778 13.8471 10.1186 11.48 10.0069V9.80368C13.6439 9.31603 15.2389 7.78199 15.2389 5.33361C15.2389 2.21472 12.9226 0 8.33058 0H0V20.8061ZM4.39896 17.2098V11.6831H8.08676C10.1999 11.6831 11.5104 12.9022 11.5104 14.6192C11.5104 16.1837 10.4437 17.2098 7.98517 17.2098H4.39896ZM4.39896 8.70648V3.55574H7.74135C9.69192 3.55574 10.7993 4.5615 10.7993 6.06507C10.7993 7.71087 9.45826 8.70648 7.66007 8.70648H4.39896Z" fill="#8CB7F5" />
                        <path d="M18.3046 20.8061H22.6324V11.9778C22.6324 10.0577 24.0344 8.73696 25.9443 8.73696C26.5437 8.73696 27.3666 8.83855 27.773 8.97062V5.13042C27.3869 5.03899 26.8485 4.97803 26.4116 4.97803C24.6642 4.97803 23.2318 5.99396 22.6629 7.92422H22.5003V5.20154H18.3046V20.8061Z" fill="#8CB7F5" />
                        <path d="M33.4851 21.1008C35.7913 21.1008 37.2847 20.095 38.0466 18.6422H38.1686V20.8061H42.2729V10.2812C42.2729 6.56288 39.1235 4.99835 35.6491 4.99835C31.9105 4.99835 29.4519 6.78638 28.8525 9.63097L32.8553 9.95607C33.1499 8.91982 34.0744 8.15788 35.6287 8.15788C37.1018 8.15788 37.945 8.8995 37.945 10.1796V10.2405C37.945 11.2463 36.8783 11.3784 34.1658 11.6425C31.0774 11.927 28.3039 12.9632 28.3039 16.4478C28.3039 19.5362 30.5085 21.1008 33.4851 21.1008ZM34.7246 18.1139C33.3937 18.1139 32.4387 17.4942 32.4387 16.3056C32.4387 15.0865 33.4445 14.4871 34.9684 14.2737C35.9132 14.1417 37.4574 13.9182 37.9755 13.5728V15.2287C37.9755 16.8644 36.6243 18.1139 34.7246 18.1139Z" fill="#8CB7F5" />
                        <path d="M49.4302 11.7847C49.4404 9.7732 50.6392 8.59473 52.3865 8.59473C54.1238 8.59473 55.1702 9.73256 55.16 11.6425V20.8061H59.4879V10.8704C59.4879 7.23339 57.3544 4.99835 54.1035 4.99835C51.7872 4.99835 50.1109 6.13619 49.4099 7.95469H49.227V5.20154H45.1024V20.8061H49.4302V11.7847Z" fill="#8CB7F5" />
                        <path d="M68.1208 21.0601C70.6403 21.0601 71.9509 19.6074 72.5502 18.307H72.7331V20.8061H77V0H72.6823V7.82262H72.5502C71.9712 6.55272 70.7216 4.99835 68.1106 4.99835C64.687 4.99835 61.7916 7.66008 61.7916 13.0242C61.7916 18.246 64.5651 21.0601 68.1208 21.0601ZM69.4923 17.6161C67.369 17.6161 66.2109 15.7265 66.2109 13.0038C66.2109 10.3015 67.3487 8.44234 69.4923 8.44234C71.5953 8.44234 72.7738 10.2202 72.7738 13.0038C72.7738 15.7875 71.575 17.6161 69.4923 17.6161Z" fill="#8CB7F5" />
                    </svg>
                </div>

                {/* Card */}
                <div>

                    {/* Heading */}
                    <h2 className="text-[22px] md:text-[28px] font-semibold text-gray-800 text-center">
                        Log in
                    </h2>

                    <p className="text-[13px] md:text-[14px] text-gray-500 text-center mb-3">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>

                    {
                        error && (
                            <div className="text-red-600 mb-4 text-center text-[13px] md:text-[14px]">
                                {error}
                            </div>
                        )
                    }


                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-[12px] md:text-[14px] text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-[14px] md:text-[15px] focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-1">
                                Password
                            </label>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 md:py-3 pr-12 text-[14px] md:text-[15px] focus:outline-none focus:border-blue-500"
                                    required
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
                                >
                                    {showPassword ? (
                                        // Eye Off SVG
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 3l18 18M10.584 10.587A2 2 0 0113.414 13.4M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7-1.01 2.27-2.78 4.14-5 5.19M6.53 6.53C4.56 7.83 3.03 9.74 2 12c1.73 3.89 6 7 10 7a9.77 9.77 0 004.47-1.03"
                                            />
                                        </svg>
                                    ) : (
                                        // Eye SVG
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-[14px] md:text-[16px] font-medium py-2.5 md:py-3 rounded-lg transition disabled:opacity-50"
                        >
                            {loading ? "Logging In..." : "Log in"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
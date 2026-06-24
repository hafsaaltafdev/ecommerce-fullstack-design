import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddProduct() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await api.post("/products/add", {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock),
        image: form.image,
        description: form.description,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      alert("Product Added Successfully");

      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
        image: "",
      });

      navigate("/admin/dashboard");

    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
        "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] p-3 sm:p-4 md:p-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-start md:items-center gap-4 mb-6 ">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-blue-400 hover:blue-gray-600 text-[20px] md:text-[26px]"
          >
            ←
          </button>

          <div>
            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-800">
              Add New Product
            </h1>
            <p className="text-[12px] md:text-[14px] text-gray-400">
              Fill in the details to list a new product
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#DEE2E7] shadow-sm rounded-xl p-4 md:p-6 flex flex-col gap-4"
        >

          {
            error && (
              <div className="bg-red-100 text-red-600 p-3 rounded-lg">
                {error}
              </div>
            )
          }

          {/* Product Name */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. T-shirt Blue Cotton"
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px] focus:outline-none focus:border-blue-400"
            />
          </div>

          {/* Price + Stock */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px] bg-white"
            >
              <option value="">Select category</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Home">Home & Living</option>
              <option value="Sports">Sports & Outdoor</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px]"
            />
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className="flex items-center gap-3">
              <img
                src={form.image}
                alt="preview"
                className="w-16 h-16 md:w-20 md:h-20 object-contain border border-[#DEE2E7] rounded-lg"
              />
              <p className="text-[12px] md:text-[14px] text-gray-500">
                Image Preview
              </p>
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Product details..."
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px] resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg"
            >
              {loading ? "Adding..." : "+ Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 border border-[#DEE2E7] text-gray-600 text-[14px] md:text-[16px] font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
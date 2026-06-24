import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
     name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  const [loading] = useState(false);

  const fetchProduct = async () => {
    const res = await api.get("/products");
      const product = res.data.products.find((p) => p._id === id);
    setForm(product);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/products/update/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      alert("Product edit successfully!");
    } catch (err) {
      console.log("Error editing product:", err)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7FAFC] flex items-center justify-center">
        <p className="text-gray-400 text-[14px] md:text-[16px]">
          Loading product...
        </p>
      </div>
    );
  }

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
              Edit Product
            </h1>
            <p className="text-[12px] md:text-[14px] text-gray-400">
              Update the product details below
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#DEE2E7] shadow-sm rounded-xl p-4 md:p-6 flex flex-col gap-4"
        >
          {/* Image preview */}
          <div className="flex items-center gap-3 bg-[#F7FAFC] border border-[#DEE2E7] rounded-lg p-3">
            <img
              src={form.image}
              alt={form.name}
              className="w-12 h-12 md:w-14 md:h-14 object-contain rounded border bg-white"
            />
            <div>
              <p className="text-[12px] md:text-[14px] text-gray-500">
                Editing
              </p>
              <p className="text-[14px] md:text-[16px] font-medium text-gray-800">
                {form.name}
              </p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Product Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
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
                className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px]"
              />
            </div>

            <div className="flex-1">
              <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
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
              <option>Clothing</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Home</option>
              <option>Sports</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Image URL
            </label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] md:text-[16px] text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full border border-[#DEE2E7] rounded-lg px-3 md:px-4 py-2.5 text-[14px] md:text-[16px] resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-2">
            <button
              type="submit"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-[14px] md:text-[16px] font-medium py-2.5 rounded-lg"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/dashboard")}
              className="flex-1 border border-[#DEE2E7] text-gray-600 text-[14px] md:text-[16px] font-medium py-2.5 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 const handleDelete = async (id) => {
  try {

    const token = localStorage.getItem("token");

    await api.delete(`/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );

    setProducts((prev) => prev.filter((p) => p._id !== id));

    alert("Product deleted successfully!");
  } catch (err) {
    console.log("Error deleting product:", err);
  }
};

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h1 className="h-[80vh] flex items-center justify-center">Loading...</h1>;
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-[20px] md:text-[24px] font-semibold text-gray-800">
              My Products
            </h1>
            <p className="text-[12px] md:text-[14px] text-gray-400">
              Manage your product listings
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/admin/add-product")}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white text-[14px] md:text-[16px] font-medium px-5 py-2.5 rounded-lg transition-colors"
          >
            + Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-sm border border-[#DEE2E7] rounded-xl p-4">
            <p className="text-[12px] md:text-[14px] text-gray-400">
              Total Products
            </p>
            <p className="text-[20px] md:text-[24px] font-semibold text-gray-800">
              {products.length}
            </p>
          </div>

          <div className="bg-white shadow-sm border border-[#DEE2E7] rounded-xl p-4">
            <p className="text-[12px] md:text-[14px] text-gray-400">
              In Stock
            </p>
            <p className="text-[20px] md:text-[24px] font-semibold text-green-500">
              {products.filter((p) => p.stock > 0).length}
            </p>
          </div>

          <div className="bg-white shadow-sm border border-[#DEE2E7] rounded-xl p-4">
            <p className="text-[12px] md:text-[14px] text-gray-400">
              Out of Stock
            </p>
            <p className="text-[20px] md:text-[24px] font-semibold text-red-500">
              {products.filter((p) => p.stock === 0).length}
            </p>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-sm border border-[#DEE2E7] rounded-xl p-4"
            >
              <div className="flex gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 object-contain rounded border"
                />

                <div className="flex-1">
                  <h3 className="text-[14px] font-semibold text-gray-800">
                    {p.name}
                  </h3>

                  <p className="text-[12px] text-gray-500">
                    {p.category}
                  </p>

                  <p className="text-[14px] font-semibold text-gray-800 mt-1">
                    ${p.price}
                  </p>

                  <span
                    className={`inline-block mt-2 text-[12px] px-2 py-1 rounded-full ${p.stock > 0
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                      }`}
                  >
                    {p.stock > 0
                      ? `${p.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() =>
                    navigate(`/admin/edit-product/${p._id}`)
                  }
                  className="flex-1 text-[13px] text-blue-500 border border-blue-300 rounded py-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 text-[13px] text-red-500 border border-red-300 rounded py-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white shadow-sm border border-[#DEE2E7] rounded-xl overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-gray-200 border-b border-[#DEE2E7]">
                <th className="text-left text-[14px] md:text-[15px] text-gray-500 font-medium px-5 py-3">
                  Product
                </th>
                <th className="text-left text-[14px] md:text-[15px] text-gray-500 font-medium px-5 py-3">
                  Category
                </th>
                <th className="text-left text-[14px] md:text-[15px] text-gray-500 font-medium px-5 py-3">
                  Price
                </th>
                <th className="text-left text-[14px] md:text-[15px] text-gray-500 font-medium px-5 py-3">
                  Stock
                </th>
                <th className="text-left text-[14px] md:text-[15px] text-gray-500 font-medium px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-[#EEF1F3] hover:bg-gray-50"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-contain rounded border"
                      />
                      <span className="text-[14px] md:text-[15px] text-gray-800 font-medium">
                        {p.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3 text-[14px] md:text-[15px] text-gray-600">
                    {p.category}
                  </td>

                  <td className="px-5 py-3 text-[14px] md:text-[15px] font-semibold">
                    ${p.price}
                  </td>

                  <td className="px-5 py-3">
                    <span
                      className={`text-[12px] md:text-[13px] px-2 py-1 rounded-full font-medium ${p.stock > 0
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                        }`}
                    >
                      {p.stock > 0
                        ? `${p.stock} in stock`
                        : "Out of stock"}
                    </span>
                  </td>

                  <td className="px-5 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-product/${p._id}`)
                        }
                        className="text-[13px] md:text-[14px] text-blue-500 border border-blue-300 rounded px-3 py-1 hover:bg-blue-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-[13px] md:text-[14px] text-red-500 border border-red-300 rounded px-3 py-1 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-[14px] md:text-[16px]">
              No products found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
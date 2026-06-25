import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MyProfile() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchProfile();
    fetchCart();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.cart?.items || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          My Profile
        </h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user?.name}
          </p>

          <p>
            <span className="font-semibold">Email:</span>{" "}
            {user?.email}
          </p>

          <p>
            <span className="font-semibold">Role:</span>{" "}
            {user?.role}
          </p>
        </div>
      </div>

      {/* Cart Section */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          My Cart Items
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">
            No items in cart
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex gap-4"
              >
                <img
                  src={item.productId?.image}
                  alt={item.productId?.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.productId?.name}
                  </h3>

                  <p className="text-gray-600">
                    Price: ${item.productId?.price}
                  </p>

                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
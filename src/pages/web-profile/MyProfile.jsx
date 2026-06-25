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

      setUser(res.data.user);
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
    <div className="max-w-5xl mx-auto p-6">

      {/* User Info */}
      <div className="bg-white shadow rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          My Profile
        </h2>

        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      {/* Cart Items */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-2xl font-bold mb-4">
          My Cart Items
        </h2>

        {cartItems.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.productId?.image}
                  alt=""
                  className="w-20 h-20 object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {item.productId?.name}
                  </h3>

                  <p>
                    Price: ${item.productId?.price}
                  </p>

                  <p>
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
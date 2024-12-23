import React, { useState, useEffect } from "react";
import Nav from '../Home_Components/Navbar';
import axios from "axios";

const OrdersPage = () => {
  const [userObjectId, setUserObjectId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: [],
    time: [],
  });
  const [productDetails, setProductDetails] = useState({}); // Cache for product details

  // Fetch userObjectId on component mount
  useEffect(() => {
    const fetchUserObjectId = async () => {
      try {
        const userIdFromStorage = localStorage.getItem("userId");
        if (!userIdFromStorage) {
          setError("User ID not found in localStorage");
          setLoading(false);
          return;
        }

        const userResponse = await axios.get(
          `http://localhost:5000/auth/user/${userIdFromStorage}`
        );
        setUserObjectId(userResponse.data._id);
      } catch (err) {
        setError("Error fetching user details");
        setLoading(false);
      }
    };

    fetchUserObjectId();
  }, []);

  // Fetch orders after userObjectId is set
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userObjectId) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/get-orders_user?userId=${userObjectId}`
        );
        if (response.data.success) {
          setOrders(response.data.orders);
          console.log(response.data.orders);
        } else {
          setError(response.data.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userObjectId]);

  // Fetch product details for a specific productId
  const fetchProductDetails = async (productId) => {
    if (productDetails[productId]) return; // Use cached product details if available

    try {
      const response = await axios.get(
        `http://localhost:5000/product_yourorder/${productId}`
      );
      console.log(productId);
      setProductDetails((prev) => ({
        ...prev,
        [productId]: response.data,
      }));
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  // Pre-fetch product details for all orders
  useEffect(() => {
    orders.forEach((order) => {
      order.productsOrdered.forEach((product) => {
        fetchProductDetails(product.productId);
      });
    });
  }, [orders]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[filterType].includes(value)) {
        updated[filterType] = updated[filterType].filter(
          (item) => item !== value
        );
      } else {
        updated[filterType].push(value);
      }
      return updated;
    });
  };

  const checkTimeFilter = (orderDate, timeFilter) => {
    const orderTime = new Date(orderDate);
    const now = new Date();
    if (timeFilter === "Last 30 days") {
      return now - orderTime <= 30 * 24 * 60 * 60 * 1000;
    } else if (!isNaN(timeFilter)) {
      return orderTime.getFullYear() === parseInt(timeFilter, 10);
    } else if (timeFilter === "Older") {
      return orderTime.getFullYear() < 2020;
    }
    return true;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filters.status.length
      ? filters.status.includes(order.status)
      : true;
    const matchesTime = filters.time.length
      ? filters.time.some((time) => checkTimeFilter(order.date, time))
      : true;
    return matchesStatus && matchesTime;
  });

  if (loading) return <div className="text-center py-6">Loading your orders...</div>;
  if (error)
    return (
      <div className="text-center py-6 text-red-500">
        {error}. Please try again later.
      </div>
    );

  return (
    <div>
      <Nav />

      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>

          <div className="grid grid-cols-4 gap-4">
            {/* Filters Section */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700">ORDER STATUS</h3>
                {["On the way", "Delivered", "Cancelled", "Returned"].map(
                  (status) => (
                    <label key={status} className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => handleFilterChange("status", status)}
                      />
                      <span className="ml-2">{status}</span>
                    </label>
                  )
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">ORDER TIME</h3>
                {["Last 30 days", "2023", "2022", "2021", "2020", "Older"].map(
                  (time) => (
                    <label key={time} className="flex items-center mt-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={filters.time.includes(time)}
                        onChange={() => handleFilterChange("time", time)}
                      />
                      <span className="ml-2">{time}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div className="col-span-3">
              <div className="bg-white rounded-lg shadow-md">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="p-4 border-b last:border-none flex space-x-4 "
                    >
                      <img
                        src={
                          productDetails[order.productsOrdered[0]?.productId]?.img ||
                          "/placeholder.png"
                        }
                        alt={
                          productDetails[order.productsOrdered[0]?.productId]?.name ||
                          "Product"
                        }
                        className="w-36 h-39  rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold">
                          {
                            productDetails[order.productsOrdered[0]?.productId]?.name ||
                            "Product Name"
                          }
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {order.productsOrdered[0]?.quantity || "N/A"}
                        </p>
                        <p className="text-sm text-gray-800 font-medium">₹{order.price}</p>
                        <p className="text-sm text-gray-600">
                          Delivered on {" "}
                          {new Date(order.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div class="flex justify-center items-center ">
                    <p className="text-green-500 font-medium gap-9 text-lg">
                     {order.status}
                           </p>
</div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No orders match your filters. Try adjusting your filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;

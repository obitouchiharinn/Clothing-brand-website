import React, { useState } from "react";
import axios from "axios";

const CouponForm = () => {
  const [code, setCode] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [showCoupons, setShowCoupons] = useState(false);

  // Helper function to clear messages after 3 seconds
  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  // Function to handle adding a coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/coupon/save-coupon", {
        code,
        discountPercentage,
      });

      if (response.data.success) {
        setSuccessMessage("Coupon saved successfully!");
        setErrorMessage("");
        setCode("");
        setDiscountPercentage("");
      }
    } catch (error) {
      setErrorMessage("Error saving coupon. Please try again.");
      setSuccessMessage("");
      console.error(error);
    } finally {
      clearMessages(); // Clear messages after 3 seconds
    }
  };

  // Function to fetch coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5000/coupon/get-coupon");
      if (response.data.success) {
        setCoupons(response.data.coupons);
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Error fetching coupons. Please try again.");
      console.error(error);
    }
  };

  // Function to delete a coupon
  const handleDeleteCoupon = async (code) => {
    try {
      const response = await axios.delete("http://localhost:5000/coupon/delete-coupon", {
        data: { code }, // Properly passing `code` to the backend
      });

      if (response.data.success) {
        // Remove the deleted coupon from the list
        setCoupons(coupons.filter((coupon) => coupon.code !== code));
        setSuccessMessage("Coupon deleted successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage("Error deleting coupon. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error deleting coupon. Please try again.");
      setSuccessMessage("");
      console.error(error);
    } finally {
      clearMessages(); // Clear messages after 3 seconds
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Coupon Management</h2>

      {/* Buttons to Add or Display Coupons */}
      <div className="flex justify-between mb-6">
        <button
          onClick={() => setShowCoupons(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Coupon
        </button>
        <button
          onClick={() => {
            setShowCoupons(!showCoupons);
            if (!showCoupons) fetchCoupons();
          }}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          {showCoupons ? "Hide Coupons" : "Display Coupons"}
        </button>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <p className="text-green-600 bg-green-100 p-2 rounded mb-4 text-center">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="text-red-600 bg-red-100 p-2 rounded mb-4 text-center">
          {errorMessage}
        </p>
      )}

      {/* Add Coupon Form */}
      {!showCoupons && (
        <form onSubmit={handleAddCoupon} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="code">
              Coupon Code
            </label>
            <input
              type="text"
              id="code"
              className="w-full p-2 border rounded"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="discountPercentage">
              Discount Percentage
            </label>
            <input
              type="number"
              id="discountPercentage"
              className="w-full p-2 border rounded"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Add Coupon
          </button>
        </form>
      )}

      {/* Display Coupons */}
      {showCoupons && (
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-bold mb-4 text-center">Available Coupons</h3>
          {coupons.length > 0 ? (
            <ul className="space-y-4">
              {coupons.map((coupon) => (
                <li
                  key={coupon.code}
                  className="flex justify-between items-center border p-3 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="font-bold">{coupon.code}</p>
                    <p className="text-sm text-gray-500">
                      Discount: {coupon.discountPercentage}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.code)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No coupons available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CouponForm;

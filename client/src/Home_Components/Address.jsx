import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateAddressForm = () => {
  const [userId, setUserId] = useState("");
  const [address, setAddress] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setResponseMessage("User ID not found in localStorage");
      setIsError(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/update-address", {
        userId,
        address,
      });

      setResponseMessage(response.data.message);
      setIsError(false);
      setShowModal(true); // Show modal on success
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "An error occurred");
      setIsError(true);
    }
  };

  const handleOk = () => {
    setShowModal(false);
    window.location.href = "/home"; // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">
          Update Address
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="address"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Address
            </label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="Enter your address"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Update Address
          </button>
        </form>
        {responseMessage && !isError && (
          <div
            className={`mt-6 text-center text-lg font-medium ${
              isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {responseMessage}
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white h-[400px] w-[700px]  rounded-lg shadow-lg p-8  text-center justify-center ">
            <h2 className="text-4xl font-bold text-green-600 mb-4 mt-16">
              Success!
            </h2>
            <p className="text-2xl text-gray-700 mb-6">
              {responseMessage}
            </p>
            <button
              onClick={handleOk}
              className="bg-blue-600 w-[200px] text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAddressForm;

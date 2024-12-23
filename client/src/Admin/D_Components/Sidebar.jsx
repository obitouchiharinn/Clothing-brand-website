import React from "react";

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 flex items-center">
        <div className="text-2xl font-bold">E-Commerce</div>
      </div>
      <ul className="mt-8 space-y-2">
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("dashboard")}
        >
          <i className="fas fa-tachometer-alt mr-2"></i> Dashboard
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("orders")}
        >
          <i className="fas fa-shopping-cart mr-2"></i> Orders
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("products")}
        >
          <i className="fas fa-boxes mr-2"></i> Products
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("users")}
        >
          <i className="fas fa-users mr-2"></i> Users
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("coupon")}
        >
          <i className="fas fa-chart-bar mr-2"></i> Coupon
        </li>
        <li
          className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveView("complaint")}
        >
          <i className="fas fa-chart-bar mr-2"></i> Complaint
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

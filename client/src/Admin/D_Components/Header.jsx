import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded-md">Logout</button>
    </div>
  );
};

export default Header;

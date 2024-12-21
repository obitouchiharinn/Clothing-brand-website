import React from "react";

const DashboardCard = ({ title, count, color, icon }) => {
  return (
    <div
      className={`flex items-center p-4 bg-${color}-500 text-white rounded-lg shadow-md`}
    >
      <div className="text-4xl">{icon}</div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default DashboardCard;

import React from "react";
import DashboardCard from "./D_Components/DashboardCard";

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard
          title="Total Orders"
          count="3"
          color="blue"
          icon="🛒"
        />
        <DashboardCard
          title="Total Products"
          count="3"
          color="green"
          icon="📦"
        />
        <DashboardCard
          title="Total Users"
          count="3"
          color="yellow"
          icon="👤"
        />
        <DashboardCard
          title="Sales Ratio"
          count="66.67%"
          color="red"
          icon="📊"
        />
      </div>
    </div>
  );
};

export default Dashboard;

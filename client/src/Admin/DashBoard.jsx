import React, { useState } from "react";
import Sidebar from "./D_Components/Sidebar";
import Header from "./D_Components/Header";
import Dashboard from "./Page";
import ProductForm from "./D_Components/ProductForm";
import CouponForm from "./D_Components/CouponForm";
import Complaint from "./D_Components/DisplayComplaint";
import Orders from "./D_Components/Orders";
import User from "./D_Components/User";




const App = () => {
  const [activeView, setActiveView] = useState("dashboard"); // Single state for active view

  return (
    <div className="flex">
      {/* Pass `setActiveView` to Sidebar for navigation */}
      <Sidebar setActiveView={setActiveView} />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 bg-gray-100">
          {/* Render the appropriate component based on `activeView` */}
          {activeView === "dashboard" && <Dashboard />}
          {activeView === "products" && <ProductForm />}
          {activeView === "orders" && <div>Orders Page</div>}
          {activeView === "users" && <div>Users Page</div>}
          {activeView === "coupon" && <CouponForm />}
          {activeView === "complaint" && <Complaint />}
          {activeView === "orders" && <Orders />}
          {activeView === "users" && <User />}

        </div>
      </div>
    </div>
  );
};

export default App;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";



createRoot(document.getElementById("root")).render(
  <StrictMode>

    <App />

  </StrictMode>
);



// {isCartOpen && (
//   <div
//     className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
//     onClick={toggleCart}
//   />
// )}

// {/* Cart Drawer */}
// <div
//   className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
//   style={{ width: "25%" }}
// >
//   {/* Cart Header */}
//   <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//     <h2 className="text-lg font-medium">1 item</h2>
//     <button
//       className="text-gray-500 text-sm hover:text-gray-800"
//       onClick={toggleCart}
//     >
//       ✕
//     </button>
//   </div>

//   {/* Cart Content */}
//   <div className="p-4 flex flex-col h-full">
//     <div className="text-center text-sm mb-4 p-2 border-5 border-black text-white bg-black">
//       Free India Shipping &nbsp;|&nbsp; Easy 7 Day Returns &nbsp;|&nbsp; Free Pickup
//     </div>

//     {/* Cart Item */}
//     <div className="flex justify-between items-center mb-4">
//       <img
//         src="https://via.placeholder.com/60"
//         alt="Product"
//         className="w-16 h-16 object-cover"
//       />
//       <div className="flex-1 mx-4">
//         <p className="text-sm font-medium">LivIn Culottes - Navy</p>
//         <p className="text-xs text-gray-500">28</p>
//         <p className="text-sm text-gray-700">₹1,885</p>
//       </div>
//       <button className="text-sm text-red-500 hover:underline">Remove</button>
//     </div>

//     {/* Price Breakdown */}
//     <div className="border-t border-gray-200 pt-4 mb-4">
//       <div className="flex justify-between text-sm mb-2">
//         <span>MRP Subtotal</span>
//         <span>₹2,695</span>
//       </div>

//       <div className="flex justify-between text-sm mb-4">
//         <span>Shipping Fee</span>
//         <span>To be calculated</span>
//       </div>
//       <div className="flex justify-between font-medium text-lg">
//         <span>Amount Payable</span>
//         <span>₹1,885</span>
//       </div>
//     </div>

//     {/* Best Offers */}
//     <div className="border-t border-gray-200 pt-4">
//       <h3 className="text-sm font-medium mb-2">Best Offers</h3>
//       <ul className="text-sm text-gray-600 space-y-2">
//         <li>
//           <strong>Get Extra 5% Off</strong> - Min Spend ₹4,999
//           <br />
//           Use Coupon Code: <span className="text-rose-500 font-medium">CART5</span>
//         </li>
//         <li>
//           <strong>Get Extra 10% Off</strong> - Min Spend ₹6,999
//           <br />
//           Use Coupon Code: <span className="text-rose-500 font-medium">CART10</span>
//         </li>
//         <li>
//           <strong>Get Additional ₹2500 OFF</strong> - Min Spend ₹19,999
//           <br />
//           Use Coupon Code: <span className="text-rose-500 font-medium">DEAL20K</span>
//         </li>
//         <li>
//           <strong>Get Extra 10% Off on Prepaid Order</strong>
//           <br />
//           Avail this in Cashfree Offers sections after checkout
//         </li>
//       </ul>
//     </div>
//   </div>

//   {/* Checkout Buttons (Sticky Bottom) */}
//   <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
//     <button className="w-full bg-yellow-500 text-white py-2 rounded-md mb-2 hover:bg-yellow-600">
//       Checkout
//     </button>
//     <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
//       For International Orders
//     </button>
//   </div>
// </div>
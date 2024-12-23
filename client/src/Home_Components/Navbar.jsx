import React, { useState, useEffect } from "react";
import { FaUser, FaHeart, FaShoppingBag } from "react-icons/fa";
import axios from "axios";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

import Option from './Option'

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };


  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };


  // Fetch user data and cart details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          // Fetch user's name
          const response = await axios.get(
            `http://localhost:5000/auth/user/${userId}`
          );
          setUserName(response.data.name);

          // Fetch user's cart
          const cartResponse = await axios.get(
            `http://localhost:5000/cart/get-cart`,
            { params: { userId } }
          );

          const cartData = cartResponse.data.cart;

          // Fetch product details and quantity for each item in the cart
          const updatedCartItems = await Promise.all(
            cartData.productsInCart.map(async (item) => {
              const productResponse = await axios.get(
                `http://localhost:5000/product/${item.productId}`
              );
              return {
                ...item,
                productDetails: productResponse.data.product,
              };
            })
          );

          setCart({ ...cartData, productsInCart: updatedCartItems });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setUserName("");
    setCart(null);
    navigate("/");
  };

  // Toggle the cart visibility
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  // Handle quantity update in the cart
// Handle quantity update in the cart
const handleQuantityChange = async (productId, newQuantity) => {
  try {
    const userId = localStorage.getItem("userId");
    if (userId && newQuantity > 0) {
      // Update the quantity in the backend
      await axios.put("http://localhost:5000/cart/update-quantity", {
        userId,
        productId,
        quantity: newQuantity,
      });

      // Update the cart on the frontend by re-fetching
      const cartResponse = await axios.get("http://localhost:5000/cart/get-cart", {
        params: { userId },
      });

      const cartData = cartResponse.data.cart;

      const updatedCartItems = await Promise.all(
        cartData.productsInCart.map(async (item) => {
          const productResponse = await axios.get(
            `http://localhost:5000/product/${item.productId}`
          );
          return {
            ...item,
            productDetails: productResponse.data.product,
          };
        })
      );

      setCart({ ...cartData, productsInCart: updatedCartItems });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};


  // Handle removing an item from the cart
  const handleRemoveItem = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");
      if (userId && productId) {
        // Send request to delete the item from the cart
        await axios.post("http://localhost:5000/cart/delete-items", {
          userId,
          productId,
        });

        // Re-fetch the updated cart data after item removal
        const cartResponse = await axios.get(
          "http://localhost:5000/cart/get-cart",
          {
            params: { userId },
          }
        );

        const cartData = cartResponse.data.cart;

        const updatedCartItems = await Promise.all(
          cartData.productsInCart.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:5000/product/${item.productId}`
            );
            return {
              ...item,
              productDetails: productResponse.data.product,
            };
          })
        );

        setCart({ ...cartData, productsInCart: updatedCartItems });
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <div className="border-b border-gray-200 relative">
      {/* Top Bar with Scrolling Text */}
      <div className="bg-rose-200 text-sm text-center py-2 text-gray-800 font-medium overflow-hidden">
        <div className="scrolling-text">
          SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          SALE - UPTO 80% OFF + EXTRA 10% OFF ON PREPAID ORDERS
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-wrap  justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-serif flex-shrink-0">
          <span className="font-light">Mytalorzone</span>
          <span className="font-medium">By Sahiba</span>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-4">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          </form>
        </div>

        {/* Icons */}
        <div className="flex space-x-6 text-gray-600 relative">
          {userName ? (
            <div className="text-xl font-medium text-gray-700">
              Welcome, {userName}
            </div>
          ) : (
            <div className="text-xl cursor-pointer hover:text-rose-500">
              <FaUser />
            </div>
          )}


          


          {/* <FaUser className="text-xl cursor-pointer hover:text-rose-500" /> */}

          {/* User Dropdown */}
          <div className="relative">
            <FaUser
              className="text-xl cursor-pointer hover:text-rose-500"
              onClick={toggleUserMenu}
            />
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg border border-gray-200 rounded-md w-40 z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/myorder")}
                >
                  Your Orders
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/complaint")}
                >
                  Complaints
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => navigate("/address")}
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
          





          <div className="relative" onClick={toggleCart}>
            <FaShoppingBag className="text-xl cursor-pointer hover:text-rose-500" />
            <span className="absolute -top-3 -right-1 bg-red-600 text-white text-xs px-1 rounded-full">
              {cart && cart.productsInCart ? cart.productsInCart.length : 0}
            </span>
          </div>
          <CiLogout
            className="text-xl cursor-pointer hover:text-rose-500"
            onClick={handleLogout}
          />
        </div>
      </div>
      <Option />

      {/* Overlay when cart is open */}
      {isCartOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
          onClick={toggleCart}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
        style={{ width: "25%" }}
      >
        {/* Cart Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium">
            {cart && cart.productsInCart
              ? `${cart.productsInCart.length} item(s)`
              : "No items in cart"}
          </h2>
          <button
            className="text-gray-500 text-sm hover:text-gray-800"
            onClick={toggleCart}
          >
            ✕
          </button>
        </div>

        {/* Cart Content */}
        <div className="p-4 flex flex-col h-full">
          <div className="text-center text-sm mb-4 p-2 border-5 border-black text-white bg-black">
            Free India Shipping &nbsp;|&nbsp; Easy 7 Day Returns &nbsp;|&nbsp; Free Pickup
          </div>

          {/* Cart Items */}
          {cart && cart.productsInCart && cart.productsInCart.length > 0 ? (
            cart.productsInCart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-4">
                <img
                  src={item.productDetails.img || "https://via.placeholder.com/60"}
                  alt={item.productDetails.name}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1 mx-4">
                  <p className="text-sm font-medium">{item.productDetails.name}</p>
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      className="text-xs text-gray-500"
                      onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">₹{item.productDetails.price}</p>
                </div>
                <button
                  className="text-sm text-red-500 hover:underline"
                  onClick={() => handleRemoveItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          {/* Price Breakdown */}
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>MRP Subtotal</span>
              <span>
                ₹
                {cart && cart.productsInCart
                  ? cart.productsInCart.reduce(
                      (acc, item) => acc + (Number(item.productDetails.price) * item.quantity || 0),
                      0
                    )
                  : 0}
              </span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Shipping Fee</span>
              <span>To be calculated</span>
            </div>

            <div className="flex justify-between font-medium text-lg">
              <span>Amount Payable</span>
              <span>
                ₹
                {cart && cart.productsInCart
                  ? cart.productsInCart.reduce(
                      (acc, item) => acc + (Number(item.productDetails.price) * item.quantity || 0),
                      0
                    )
                  : 0}
              </span>
            </div>
          </div>

          {/* Checkout Buttons */}
          <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
            <button className="w-full bg-yellow-500 text-white py-2 rounded-md mb-2 hover:bg-yellow-600"
               onClick={() => navigate(`/checkout`)}
            >
              Checkout
              
            </button>
            <button className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300">
              For International Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

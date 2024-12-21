import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeliveryModel = () => {
  try {
    const gltf = useGLTF("/assets/3D_Model/scene.gltf");
    return <primitive object={gltf.scene} />;
  } catch (error) {
    console.error("Error loading GLTF model:", error);
    return null;
  }
};

const Checkout = () => {
  const [cart, setCart] = useState({
    productsInCart: [],
    subtotal: 0,
    totalAmount: 0,
  });
  const [userName, setUserName] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [originalTotalAmount, setOriginalTotalAmount] = useState(0); // New state for the original total amount
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(
            `http://localhost:5000/auth/user/${userId}`
          );
          setUserName(response.data.name);

          const cartResponse = await axios.get(
            `http://localhost:5000/cart/get-cart`,
            { params: { userId } }
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

          const subtotal = updatedCartItems.reduce(
            (acc, item) => acc + item.productDetails.price * item.quantity,
            0
          );

          setCart({
            ...cartData,
            productsInCart: updatedCartItems,
            subtotal,
            totalAmount: subtotal,
          });
          setOriginalTotalAmount(subtotal); // Store original total amount
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post("http://localhost:5000/coupon/verify-coupon", {
        code: couponCode,
      });

      const discountPercentage = response.data.discountPercentage;
      const discountAmount = (cart.subtotal * discountPercentage) / 100;

      setDiscount(discountAmount);
      setCart((prevCart) => ({
        ...prevCart,
        totalAmount: prevCart.subtotal - discountAmount,
      }));

      setMessage(`Coupon applied! You saved ₹${discountAmount.toFixed(2)}.`);
    } catch (error) {
      setMessage("Invalid coupon code. Please try again.");
      // Reset the total amount and discount when the coupon is invalid
      setCart((prevCart) => ({
        ...prevCart,
        totalAmount: originalTotalAmount, // Resetting to the original total
      }));
      setDiscount(0); // Resetting discount to zero
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Content */}
      <div className="w-full h-full md:w-1/2 p-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        <div className="border rounded-lg p-4 shadow-lg">
          <div className="max-h-64 overflow-y-auto">
            {cart.productsInCart.length > 0 ? (
              cart.productsInCart.map((item) => (
                <div
                  key={item.productDetails._id}
                  className="flex items-center mb-4"
                >
                  <img
                    src={
                      item.productDetails.img ||
                      "https://via.placeholder.com/100"
                    }
                    alt={item.productDetails.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="ml-4">
                    <p className="font-semibold">{item.productDetails.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.size || "N/A"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Estimated Delivery: Dec 24 - Dec 25
                    </p>
                  </div>
                  <p className="ml-auto font-semibold">
                    ₹{item.productDetails.price * item.quantity}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Discount code or gift card"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full border p-2 rounded-lg mb-4"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-gray-300 px-4 py-2 rounded-lg text-gray-700 mb-4"
          >
            Apply Coupon
          </button>
          {message && <p className="text-green-600 mb-4">{message}</p>}

          <div className="mt-4">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cart.subtotal.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-gray-500">
              <span>Discount</span>
              <span>-₹{discount.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span>Free</span>
            </p>
            <hr className="my-2" />
            <p className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{cart.totalAmount.toFixed(2)}</span>
            </p>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Proceed to Checkout
        </button>
      </div>

      {/* Right Side - 3D Model */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100">
        <Canvas>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <OrbitControls />
          <DeliveryModel />
        </Canvas>
      </div>
    </div>
  );
};

export default Checkout;

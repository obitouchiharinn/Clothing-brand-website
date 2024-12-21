import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaSmile, FaTruck, FaExchangeAlt, FaGlobe } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import sizeChartImage from "../assets/images/banner.webp";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null); // New state to handle selected size
  const [activeSection, setActiveSection] = useState(null);


  // const productIdString = productId ? productId.toString() : null;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${productId}`);
        if (response.data.success) {
          setProduct(response.data.product);
          console.log("Product ID:", productId);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to add items to the cart.");
      return;
    }

    if (!product || !product._id) {
      console.error("Product or Product ID is undefined:", product);
      alert("Product details are not available. Please try again.");
      return;
    }
  

    try {
      const response = await axios.post("http://localhost:5000/cart/addtocart", {
        userId,
        productId:productId.toString(),
        quantity: 1, // You can adjust the quantity if needed
        size: selectedSize, // Send the selected size to the backend
      });

      if (response.data.success) {
        alert("Product added to cart!");
        console.log(response.data.productId)
        console.log(response.data.quantity)

        console.log("Fetched Product:", product);
        console.log("Product ID (ObjectId):", product._id);
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("There was an error adding the product to your cart");
    }
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>No product details available</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Product Details Section */}
      <div className="bg-white p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side: Images */}
          <div className="flex gap-4">
            <div className="flex-1">
              <img
                src={product.img}
                alt="Main Product"
                className="w-full h-[970px] object-cover rounded-md"
              />
            </div>
          </div>

          {/* Right Side: Details */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500 text-sm">
                ⭐ {product.rating}
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price}
              </span>
            </div>

            <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>

            <div className="mt-4">
              <img
                src={sizeChartImage}
                alt="Size Chart"
                className="w-full object-cover rounded-md"
              />
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Size Chart:</p>
              <div className="flex gap-2 mt-2">
                {"XS S M L XL XXL".split(" ").map((size) => (
                  <button
                    key={size}
                    className={`py-2 px-4 border rounded-md hover:bg-gray-100 focus:outline-none ${
                      selectedSize === size ? 'bg-gray-200' : ''
                    }`}
                    onClick={() => setSelectedSize(size)} // Set the selected size
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                className="w-full bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800"
                onClick={handleAddToCart} // Add to Cart handler
              >
                ADD TO CART
              </button>
              <button className="w-full bg-white border border-gray-900 text-gray-900 py-3 rounded-md font-medium mt-4 hover:bg-gray-100">
                BUY NOW
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <FaSmile className="text-green-500" />
                <span>1 Mn + Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTruck className="text-blue-500" />
                <span>Free Shipping in India</span>
              </div>
              <div className="flex items-center gap-2">
                <FaExchangeAlt className="text-orange-500" />
                <span>7 day Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-purple-500" />
                <span>Global Delivery</span>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="mt-6">
              {[ 
                {
                  title: "Description",
                  content: (
                    <ul className="list-disc pl-5">
                      <li>Fitted</li>
                      <li>Gathered detail</li>
                      <li>High neck</li>
                      <li>Stretchable</li>
                      <li>Non-transparent</li>
                    </ul>
                  ),
                },
                {
                  title: "Size and Fit",
                  content: (
                    <div>
                      <p>Relaxed fit</p>
                      <p>Garment length: 21 inches</p>
                      <p>Model wearing size S</p>
                      <p>Bust - 32.5 Waist - 26 Hip - 38.5 Height - 5'6"</p>
                      <p>Designed for someone who is 5'2" to 5'6" tall</p>
                      <p>Created with 1 lakh+ measurements of Indian women</p>
                    </div>
                  ),
                },
                {
                  title: "Fabric and Care",
                  content: (
                    <div>
                      <p>Polyester Knit</p>
                      <p>Machine wash with similar colours</p>
                      <p>Do not Bleach</p>
                      <p>Do not Tumble dry</p>
                    </div>
                  ),
                },
                {
                  title: "Shipping and Delivery",
                  content: <p>Ships in 5-7 days</p>,
                },
                {
                  title: "More Information",
                  content: (
                    <div>
                      <p>Country Of Origin: India</p>
                      <p>Manufactured By: Fable Street Lifestyle Solutions Private Limited 362, Phase II, Udyog Vihar, Sector 20, Gurugram, Haryana 122016</p>
                      <p>Customer care no: 011 408787575</p>
                    </div>
                  ),
                },
              ].map((section) => (
                <div key={section.title} className="mb-4">
                  <button
                    className="w-full text-left font-medium text-gray-800 py-2 border-b flex items-center justify-between"
                    onClick={() => toggleSection(section.title)}
                  >
                    {section.title}
                    <span>
                      {activeSection === section.title ? (
                        <FaChevronUp className="text-gray-600" />
                      ) : (
                        <FaChevronDown className="text-gray-600" />
                      )}
                    </span>
                  </button>
                  {activeSection === section.title && (
                    <div className="mt-2 text-sm text-gray-600">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

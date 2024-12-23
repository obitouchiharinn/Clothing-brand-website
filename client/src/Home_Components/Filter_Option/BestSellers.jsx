import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Ensure you have 'react-router-dom' installed
import Nav from "../Navbar";


const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setError(""); // Clear any previous errors
        const response = await axios.get("http://localhost:5000/api/product/na");
        setProducts(response.data.products);
      } catch (error) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div><Nav />
    <div className="p-4">
    <div className="flex items-center justify-center">
  <h1 className="text-3xl font-medium pr-10 mb-6">Best Sellers</h1>
</div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="p-6 bg-gray-100 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-md rounded-md overflow-hidden relative"
                >
                  {/* Image Section with Hover Effect */}
                  <Link to={`/product/${product._id}`} className="relative group">
                    <img
                      src={product.img || "https://via.placeholder.com/150"} // Default image if not available
                      alt={product.name}
                      className="w-full h-[350px] object-contain bg-gray-200 transition-transform transform group-hover:scale-110 group-hover:opacity-90"
                    />
                    {/* Like Button */}
                    <button className="absolute top-2 right-2 bg-white rounded-full shadow p-2 text-gray-600 hover:text-red-500">
                      ❤️
                    </button>
                    {/* Rating */}
                    {product.rating && (
                      <div className="absolute bottom-2 left-2 bg-yellow-500 text-white text-sm px-2 py-1 rounded">
                        ⭐ {product.rating}
                      </div>
                    )}
                  </Link>

                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        ₹{product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No products available.</div>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default BestSellers;

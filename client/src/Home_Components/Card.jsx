import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get-product");
        if (response.data.success) {
          setProducts(response.data.products);
        } else {
          setError("Error fetching products");
        }
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-100 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id} // product._id should now be a string
            className="bg-white shadow-md rounded-md overflow-hidden relative"
          >
            {/* Image Section with Hover Effect */}
            <Link to={`/product/${product._id}`} className="relative group">
              <img
                src={product.img} // Assuming the `img` field stores the image URL
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
        ))}
      </div>
    </div>
  );
};

export default Card;

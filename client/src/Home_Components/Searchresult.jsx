import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from '../Home_Components/Navbar';


const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post("http://localhost:5000/product/category", {
          category: query,
        });
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div><Nav />
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Search Results for "{query}"</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-md p-4">
              <img
                src={product.img || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h2 className="text-sm font-medium">{product.name}</h2>
              <p className="text-sm text-gray-500">₹{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
    </div>
  );
};

export default SearchResults;

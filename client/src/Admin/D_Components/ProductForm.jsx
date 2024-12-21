import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    img: "",
    category: "",
    rating: "",
    productId: "",
    inStockValue: "",
    soldStockValue: "",
    visibility: "on",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/create-product", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setMessage("Product created successfully!");
        setFormData({
          name: "",
          price: "",
          img: "",
          category: "",
          rating: "",
          productId: "",
          inStockValue: "",
          soldStockValue: "",
          visibility: "on",
        });
        setTimeout(() => setMessage(""), 4000); // Hide message after 4 seconds
      } else {
        setMessage("Error creating product.");
      }
    } catch (error) {
      setMessage("Error creating product.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-product");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setMessage("Error fetching products.");
      }
    } catch (error) {
      setMessage("Error fetching products.");
    }
  };

  const toggleVisibility = async (productId, visibility) => {
    try {
      const response = await axios.put("http://localhost:5000/update-visibility", { productId, visibility });
      if (response.data.success) {
        setMessage("Product visibility updated successfully!");
        fetchProducts(); // Refresh product list after update
      } else {
        setMessage("Error updating visibility.");
      }
    } catch (error) {
      setMessage("Error updating visibility.");
    }
  };

  const updateStockStatus = async (productId, inStockValue, soldStockValue) => {
    try {
      const response = await axios.post("http://localhost:5000/instock-update", {
        productId,
        inStockValue,
        soldStockValue,
      });

      if (response.data.success) {
        setMessage("Stock status updated successfully!");
        fetchProducts(); // Refresh product list after update
      } else {
        setMessage("Error updating stock status.");
      }
    } catch (error) {
      setMessage("Error updating stock status.");
    }
  };

  useEffect(() => {
    if (!showForm) {
      fetchProducts(); // Fetch products when not showing the form
    }
  }, [showForm]);

  return (
    <div className="flex flex-col items-center h-full py-8 px-4 bg-gradient-to-r ">
      {/* Toggle Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transform hover:scale-105 transition"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>
        <button
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transform hover:scale-105 transition"
          onClick={() => setShowForm(false)}
        >
          View Product
        </button>
      </div>

      {/* Product Form */}
      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-2xl space-y-6 w-4/5 md:w-2/3 lg:w-1/2"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Add New Product</h2>

          {["name", "price", "img", "category", "rating", "productId", "inStockValue", "soldStockValue"].map((field) => (
            <div key={field} className="relative">
              <input
                type={field === "rating" || field.includes("Value") ? "number" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                className="peer w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder-transparent"
                required
              />
              <label
                htmlFor={field}
                className="absolute left-5 top-2.5 text-sm text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-sm peer-focus:text-teal-500 peer-focus:top-2.5 peer-focus:left-5 transition-all"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}

          <select
            name="visibility"
            value={formData.visibility}
            onChange={handleChange}
            className="peer w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
          >
            <option value="on">On</option>
            <option value="off">Off</option>
          </select>

          <button
            type="submit"
            className={`w-full bg-gradient-to-r from-teal-500 to-teal-700 text-white px-6 py-3 rounded-lg hover:shadow-xl transform hover:scale-105 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Success or Error Message */}
          {message && (
            <p className={`text-center mt-4 ${message.includes("successfully") ? "text-green-500" : "text-red-500"} transition-all opacity-100`}>
              {message}
            </p>
          )}
        </form>
      ) : (
        <div className="w-full md:w-4/5 lg:w-4/5">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Products List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="bg-teal-500 text-white">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Visibility</th>
                  <th className="px-6 py-3 text-left">In Stock</th>
                  <th className="px-6 py-3 text-left">Sold Stock</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100 transition duration-300">
                    <td className="px-6 py-4 text-left">{product.name}</td>
                    <td className="px-6 py-4 text-left">{product.price}</td>
                    <td className="px-6 py-4 text-left">{product.visibility}</td>
                    <td className="px-6 py-4 text-left">
                      <input
                        type="number"
                        value={product.inStockValue}
                        onChange={(e) => updateStockStatus(product.productId, e.target.value, product.soldStockValue)}
                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                    </td>
                    <td className="px-6 py-4 text-left">
                      <input
                        type="number"
                        value={product.soldStockValue}
                        onChange={(e) => updateStockStatus(product.productId, product.inStockValue, e.target.value)}
                        className="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => toggleVisibility(product.productId, product.visibility === "on" ? "off" : "on")}
                        className="text-teal-500 hover:text-teal-700 transition-all"
                      >
                        {product.visibility === "on" ? "Hide" : "Show"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

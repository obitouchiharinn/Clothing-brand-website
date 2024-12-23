import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Option = () => {
 
  return (
    
 <div className="flex justify-center space-x-8 text-gray-700 text-sm font-medium py-2">
  <Link to="/home" className="hover:text-rose-500">
   HOME
 </Link>
 <Link to="/new-arrivals" className="hover:text-rose-500">
        NEW ARRIVALS
      </Link>
 <a href="#" className="hover:text-rose-500">
   <span className="bg-rose-500 text-white px-2 py-1 rounded-full">SALE</span>
 </a>

   <Link to="/best-sellers" className="hover:text-rose-500">
        BEST SELLERS
      </Link>
      <Link to="/dresses" className="hover:text-rose-500">
        DRESSES
      </Link>

 <a href="#" className="hover:text-rose-500">
   TOPS & SHIRTS
 </a>
 <Link to="/under1500" className="hover:text-rose-500">
        UNDER ₹ 1499
      </Link>
 </div> 

  );
};

export default Option;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Option = () => {
 
  return (
    
 <div className="flex justify-center space-x-8 text-gray-700 text-sm font-medium py-2">
 <a href="#" className="hover:text-rose-500">
   NEW ARRIVALS
 </a>
 <a href="#" className="hover:text-rose-500">
   <span className="bg-rose-500 text-white px-2 py-1 rounded-full">SALE</span>
 </a>
 <a href="#" className="hover:text-rose-500">
   ETHNIC WEAR
 </a>
 <a href="#" className="hover:text-rose-500">
   BEST SELLERS
 </a>
 <a href="#" className="hover:text-rose-500">
   DRESSES
 </a>
 <a href="#" className="hover:text-rose-500">
   CO-ORDS & JUMPSUITS
 </a>
 <a href="#" className="hover:text-rose-500">
   TOPS & SHIRTS
 </a>
 <a href="#" className="hover:text-rose-500">
   UNDER 1499 STORE
 </a>
 </div> 
  );
};

export default Option;

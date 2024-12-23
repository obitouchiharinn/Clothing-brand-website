import React from "react";
import { FaLock, FaTruck, FaGlobe, FaHeadset, FaFlag } from "react-icons/fa";

const IconsBanner = () => {
  return (
    <div className="bg-[#83534a] py-6 flex justify-center items-center space-x-10">
      {/* Icon 1: Secure Payment */}
      <div className="flex flex-col items-center text-white">
        <FaLock className="w-12 h-12 mb-2" />
        <p className="text-center text-sm">Secure Payment</p>
      </div>

      {/* Icon 2: Cash on Delivery */}
      <div className="flex flex-col items-center text-white">
        <FaTruck className="w-12 h-12 mb-2" />
        <p className="text-center text-sm">Cash On Delivery</p>
      </div>

      {/* Icon 3: Made In India */}
      <div className="flex flex-col items-center text-white">
        <FaFlag className="w-12 h-12 mb-2" />
        <p className="text-center text-sm">Made In India</p>
      </div>

      {/* Icon 4: Prompt Customer Service */}
      <div className="flex flex-col items-center text-white">
        <FaHeadset className="w-12 h-12 mb-2" />
        <p className="text-center text-sm">Prompt Customer Service</p>
      </div>

      {/* Icon 5: Shipping Worldwide */}
      <div className="flex flex-col items-center text-white">
        <FaGlobe className="w-12 h-12 mb-2" />
        <p className="text-center text-sm">Shipping Worldwide</p>
      </div>
    </div>
  );
};

export default IconsBanner;

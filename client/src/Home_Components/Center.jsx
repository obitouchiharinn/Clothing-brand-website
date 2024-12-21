import React, { useState, useEffect } from "react";
import slide1 from "../assets/images/slide-1.webp";
import slide2 from "../assets/images/slide-2.webp";
import slide3 from "../assets/images/slide-3.webp";
import slide4 from "../assets/images/slide-4.webp";
import slide5 from "../assets/images/slide-5.webp";

// Slide data
const slides = [
  {
    // title: "PERSONALISED GIFT",
    // description: "FIND YOUR PERFECT GIFT HERE",
    price: "PRICE STARTING AT Rs. 99/- ONLY",
    buttonText: "ORDER NOW",
    background: slide1, 
    images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"], // Replace with actual paths
  },
  {
    // title: "EXCLUSIVE GIFTS",
    // description: "GIFT SOMETHING UNIQUE",
    price: "PRICE STARTING AT Rs. 199/- ONLY",
    buttonText: "SHOP NOW",
    background: slide2,  // Background image path
    images: ["/path/to/image4.jpg", "/path/to/image5.jpg", "/path/to/image6.jpg"], // Replace with actual paths
  },
  {
    // title: "CELEBRATION GIFTS",
    // description: "MAKE EVERY OCCASION SPECIAL",
    price: "PRICE STARTING AT Rs. 299/- ONLY",
    buttonText: "BUY NOW",
    background: slide3,  // Background image path
    images: ["/path/to/image7.jpg", "/path/to/image8.jpg", "/path/to/image9.jpg"], // Replace with actual paths
  },
  {
    // title: "TRENDING GIFTS",
    // description: "TRENDY GIFTS FOR ALL AGES",
    price: "PRICE STARTING AT Rs. 149/- ONLY",
    buttonText: "EXPLORE NOW",
    background: slide4, // Background image path
    images: ["/path/to/image10.jpg", "/path/to/image11.jpg", "/path/to/image12.jpg"], // Replace with actual paths
  },
  {
    // title: "FESTIVE SPECIAL",
    // description: "LIGHT UP THE FESTIVITIES",
    price: "PRICE STARTING AT Rs. 249/- ONLY",
    buttonText: "DISCOVER NOW",
    background: slide5,  // Background image path
    images: ["/path/to/image13.jpg", "/path/to/image14.jpg", "/path/to/image15.jpg"], // Replace with actual paths
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const getPositionClass = (index) => {
    const position = (index - currentSlide + slides.length) % slides.length;

    switch (position) {
      case 0:
        return "transform scale-110 opacity-100 z-20";
      case 1:
        return "transform translate-x-40 scale-100 opacity-75 z-10";
      case slides.length - 1:
        return "transform -translate-x-40 scale-100 opacity-75 z-10";
      default:
        return "opacity-0 z-0 hidden";
    }
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-12">
      {/* Slide Container */}
      <div className="relative flex justify-center items-center h-[550px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out ${getPositionClass(
              index
            )}`}
            style={{
              backgroundImage: `url(${slide.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Card Content */}
            <div className="flex flex-col justify-between items-center bg-white bg-opacity-10 shadow-xl p-8 rounded-lg w-[900px] h-[500px]">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">{slide.title}</h1>
                <p className="text-lg text-gray-600 mt-4">{slide.description}</p>
                <p className="text-md text-rose-600 font-semibold mt-6">{slide.price}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {slide.images.map((image, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-md bg-cover bg-center shadow-md"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                ))}
              </div>
              <button className="mt-8 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

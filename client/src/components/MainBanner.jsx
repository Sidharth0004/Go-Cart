import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const MainBanner = () => {
  return (
    <div className="relative w-full">
      {/* Background Images */}
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-0">
        <h1 className="text-black text-2xl md:text-5xl font-bold mb-6">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Mobile Button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary text-white rounded-full"
          >
            Shop Now
            <img
              className="md:hidden transition-transform group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
          </Link>

          {/* Desktop Button */}
          <Link
            to="/products"
            className="group hidden md:flex items-center gap-2 px-9 py-3 text-black bg-white rounded-full"
          >
            Explore Deals
            <img
              className="transition-transform group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;

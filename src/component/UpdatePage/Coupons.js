import React from 'react';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';

const Coupons = () => {
  return (
    <div className="w-full h-20 bg-[#EAFFE2] flex items-center justify-between p-4 rounded-md shadow-md">
      {/* Left side with image */}
      <img 
        src="https://github.com/shiyamPrasath/Images/blob/main/Discount.png?raw=true" 
        alt="Discount" 
        className="h-12 w-12"  // Adjusted image size to fit within the box
      />

      {/* Middle section with text */}
      <div className="flex flex-col">
        <p className="text-[#1E8F65] text-base font-semibold">₹133 Saved</p>
        <p className="text-primary text-sm">
          Include Delivery Fees, Packaging Charges.
        </p>
      </div>

      {/* Right side with arrow icon */}
      <ExpandCircleDownRoundedIcon className="text-secondary" sx={{ fontSize: '2.5rem' }} />
    </div>
  );
};

export default Coupons;

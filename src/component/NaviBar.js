// NaviBar.js
import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../Asset/Image/Logo.png'; // Adjust the path as necessary
import Cart from '../component/HomePage/Cart';  // Import the Cart component
import { useCart } from '../component/HomePage/CartContext'; // Import Cart Context

const NaviBar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for Sidebar
  const [isCartOpen, setIsCartOpen] = useState(false); // State for Cart Modal
  const { cartQuantity } = useCart(); // Get the total cart quantity from Cart Context

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);  // Toggle Cart Modal
  };

  return (
    <>
      {/* Navbar for large screens */}
      <div className="hidden lg:flex items-center justify-between py-4 w-full">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 md:h-20 lg:h-24" />
        </div>

        {/* Right Section: Menu and Icons */}
        <div className="flex items-center space-x-12 lg:space-x-16 text-primary font-emilys-candy">
          <a href="#" className="text-2xl lg:text-[28px] hover:text-third">Main</a>
          <a href="#" className="text-2xl lg:text-[28px] hover:text-third">About</a>
          <a href="#" className="text-2xl lg:text-[28px] hover:text-third">Assortment</a>

          {/* Icons Section */}
          <div className="flex items-center space-x-6">
            <div className="bg-third rounded-full p-4">
              <PersonIcon className="text-primary h-10 w-10 md:h-12 md:w-12" />
            </div>
            <div className="relative bg-third rounded-full p-4" onClick={toggleCartModal}>
              <LocalMallIcon className="text-primary h-10 w-10 md:h-12 md:w-12 cursor-pointer" />
              {cartQuantity > 0 && ( // Show badge if cart has items
                <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </div>
            <div className="bg-third rounded-full p-4">
              <LocationOnIcon className="text-primary h-10 w-10 md:h-12 md:w-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className="lg:hidden flex justify-between items-center py-4 relative">
        <img src={logo} alt="Logo" className="h-12" />
        <div className="flex items-center space-x-2 md:space-x-4 absolute right-0">
          <div className="bg-third rounded-full p-2 md:p-3">
            <PersonIcon style={{ color: '#9C634F' }} className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <div className="relative bg-third rounded-full p-2 md:p-3" onClick={toggleCartModal}>
            <LocalMallIcon style={{ color: '#9C634F' }} className="h-6 w-6 md:h-8 md:w-8 cursor-pointer" />
            {cartQuantity > 0 && ( // Show badge if cart has items
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                {cartQuantity}
              </span>
            )}
          </div>
          <div className="bg-third rounded-full p-2 md:p-3">
            <LocationOnIcon style={{ color: '#9C634F' }} className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <button onClick={toggleSidebar} className="ml-2 md:ml-4">
            <MenuIcon style={{ color: '#9C634F' }} className="h-8 w-8 md:h-10 md:w-10" />
          </button>
        </div>
      </div>

      {/* Sidebar and Cart Modal remain unchanged */}

      {/* Cart Modal */}
      {isCartOpen && (
        <div className="lg:hidden xl:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative">
            {/* Close Button */}
            <button onClick={toggleCartModal} className="absolute top-4 right-4">
              <CloseIcon className="relative top-10 right-2 text-primary h-8 w-8" />
            </button>
            {/* Cart Component */}
            <Cart />
          </div>
        </div>
      )}
    </>
  );
};

export default NaviBar;

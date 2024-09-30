import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../Asset/Image/Logo.png'; // Adjust the path as necessary
import Cart from '../component/HomePage/Cart';  // Import the Cart component
import { useCart } from '../component/HomePage/CartContext'; // Import Cart Context
import { Link } from 'react-router-dom';

const NaviBar = ({ onAboutClick, onAssortmentClick, onAddUsClick }) => {
  const [isOpen, setIsOpen] = useState(false); // State for Sidebar
  const [isCartOpen, setIsCartOpen] = useState(false); // State for Cart Modal
  const [isMapOpen, setIsMapOpen] = useState(false); // State for Map Modal
  const { cartQuantity } = useCart(); // Get the total cart quantity from Cart Context
  


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCartModal = () => {
    setIsCartOpen(!isCartOpen);  // Toggle Cart Modal
  };

  const toggleMapModal = () => {
    setIsMapOpen(!isMapOpen);  // Toggle Map Modal
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <>
      {/* Navbar for large screens */}
      <div className="hidden lg:flex items-center justify-between py-4 w-full"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      >
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-16 md:h-20 lg:h-24" />
        </div>

        {/* Right Section: Menu and Icons */}
        <div className="flex items-center space-x-12 lg:space-x-16 text-primary font-emilys-candy">
        <Link to="/" onClick={() => scrollToSection('main')} className="text-2xl lg:text-[28px] hover:text-third">Main</Link>
          <Link to="/" onClick={() => scrollToSection('about')} className="text-2xl lg:text-[28px] hover:text-third">About</Link>
          <Link to="/" onClick={() => scrollToSection('assortment')} className="text-2xl lg:text-[28px] hover:text-third">Assortment</Link>
          <Link to="/" onClick={() => scrollToSection('aboutUs')} className="text-2xl lg:text-[28px] hover:text-third">About Us</Link>
          <div className="flex items-center space-x-6">
            <div className="bg-third rounded-full p-2 md:p-3">
              <PersonIcon style={{ color: '#9C634F' }} className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <div className="relative bg-third rounded-full p-4" onClick={toggleCartModal}>
              <LocalMallIcon className="text-primary h-10 w-10 md:h-12 md:w-12 cursor-pointer" />
              {cartQuantity > 0 && ( // Show badge if cart has items
                <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </div>
            {/* Location Icon with Map Modal */}
            <div onClick={toggleMapModal} className="bg-third rounded-full p-2 md:p-3 cursor-pointer">
              <LocationOnIcon style={{ color: '#9C634F' }} className="h-6 w-6 md:h-8 md:w-8" />
            </div>
          </div>
        </div>
      </div>

      {/* Navbar for small screens */}
      <div className="lg:hidden flex justify-between items-center py-4 relative"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
      >
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
          {/* Location Icon with Map Modal */}
          <div onClick={toggleMapModal} className="bg-third rounded-full p-2 md:p-3 cursor-pointer">
            <LocationOnIcon style={{ color: '#9C634F' }} className="h-6 w-6 md:h-8 md:w-8" />
          </div>
          <button onClick={toggleSidebar} className="ml-2 md:ml-4">
            <MenuIcon style={{ color: '#9C634F' }} className="h-8 w-8 md:h-10 md:w-10" />
          </button>
        </div>
      </div>

      {/* Sidebar (Right-Side) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50">
            <button onClick={toggleSidebar} className="p-4">
              <CloseIcon className="text-primary h-8 w-8" />
            </button>
            <div className="flex flex-col space-y-4 mt-10 px-6 text-primary font-emilys-candy">
              <a href="#" className="text-2xl ">Main</a>
              <a href="#" onClick={onAboutClick} className="text-2xl">About</a>
              <a href="#" onClick={onAssortmentClick} className="text-2xl ">Assortment</a>
              <a href="#" onClick={onAddUsClick} className="text-2xl ">Add Us</a> {/* New Add Us link in Sidebar */}
            </div>
          </div>
        </div>
      )}

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

      {/* Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative w-3/4 h-3/4 bg-white rounded-lg overflow-hidden">
            <button onClick={toggleMapModal} className="absolute top-4 right-4 text-primary">
              <CloseIcon className="h-8 w-8" />
            </button>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119712.14073908355!2d77.6588031!3d10.0208038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab3831ec800013%3A0x9f4198dc5a07cb62!2sForest%20Road%2C%203rd%20Street%2C%20Theni!5e0!3m2!1sen!2sin!4v1636356719067!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Shop Location"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default NaviBar;
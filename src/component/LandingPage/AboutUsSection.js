import React from 'react';
import Logo from '../../Asset/Image/Logo.png'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
          
          {/* Left Section: Logo and Description */}
          <div className="text-center md:text-left md:w-1/3">
            <img
              src={Logo} // Replace with the path to your logo
              alt="Bakery Logo"
              className="mx-auto md:mx-0 w-28 h-auto"
            />
            <p className="mt-4 ">
              Welcome to our online bakery shop where we serve freshly baked
              goods with love and care. Come experience the best assortment of cakes, cookies, and more!
            </p>
          </div>

          {/* Middle Section: Navigation and Social Media */}
          <div className="md:w-1/3 text-center space-y-4">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:underline">About</a>
              </li>
              <li>
                <a href="#assortment" className="hover:underline">Assortment</a>
              </li>
              <li>
                <a href="#licence" className="hover:underline">Licence</a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:underline">Privacy Policy</a>
              </li>
              <li>
                <a href="#copyright" className="hover:underline">Copyright</a>
              </li>
            </ul>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://wa.me/919384732012" target="_blank" rel="noopener noreferrer" className=" hover:text-white">
                <FaWhatsapp size={20} />
              </a>
              <a href="tel:+919384732012" className=" hover:text-white">
                <FaPhoneAlt size={20} />
              </a>
            </div>
          </div>

          {/* Right Section: Contact Info and Map */}
          <div className="md:w-1/3 text-center md:text-right space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col items-center md:items-end space-y-2">
              <div className="flex items-center space-x-2">
                <FaPhoneAlt />
                <p className="">+91 93847 32012</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope />
                <p className="">shiyamparasth@trithiz.com</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt />
                <p className="">130, Forest Road, 3rd Street, Theni</p>
              </div>
              {/* Embed Google Map */}
              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119712.14073908355!2d77.6588031!3d10.0208038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bab3831ec800013%3A0x9f4198dc5a07cb62!2sForest%20Road%2C%203rd%20Street%2C%20Theni!5e0!3m2!1sen!2sin!4v1636356719067!5m2!1sen!2sin"
                  width="300"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Shop Location"
                ></iframe>
              </div> 
            </div>
          </div>
        </div>

        {/* Bottom Section: Footer Info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="">© {new Date().getFullYear()} Your Bakery Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';  
import Cart from './Cart';

// Single ToggleSwitch Component
const ToggleSwitch = ({ categoryName, imageUrl, isOn, handleToggle }) => {
  return (
    <div
      className={`relative mt-10 w-16 h-28 sm:w-20 sm:h-32 cursor-pointer rounded-[2.6rem] transition-colors duration-300 flex ml-4 md:ml-6 lg:ml-9 justify-center items-center ${isOn ? 'bg-primary' : 'bg-third'}`}
      onClick={handleToggle}
    >
      {/* Name Label */}
      <span className={`absolute w-full px-2 text-[10px] sm:text-xs text-center truncate transition-all duration-300 ${isOn ? 'top-3 text-secondary' : 'bottom-3 text-primary'}`}>
        {categoryName}
      </span>

      {/* Circle */}
      <div
        className={`absolute w-12 h-12 sm:w-14 sm:h-14 bg-secondary rounded-full flex justify-center items-center transition-all duration-300 transform ${isOn ? 'translate-y-[50%]' : 'translate-y-[-50%]'}`}
      >
        <img
          src={imageUrl}
          alt={categoryName}
          className="h-8 w-8 sm:h-10 sm:w-10 object-cover"
        />
      </div>
    </div>
  );
};

// Main Component to Render Multiple ToggleSwitches
const ToggleSwitchGroup = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(''); // State for selected category

  useEffect(() => {
    // Fetch categories (e.g., cupcakes, brownies, etc.) from Django API
    axios.get('http://127.0.0.1:8000/api/original-products/')
      .then(response => {
        if (response.data.length > 0) {
          setCategories(response.data);
          setActiveCategory(response.data[0].name);  // Set the default category to the first one
        }
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Slider settings for the category selector
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 9 } },
      { breakpoint: 1024, settings: { slidesToShow: 7 } },
      { breakpoint: 768, settings: { slidesToShow: 6 } },
      { breakpoint: 640, settings: { slidesToShow: 4 } },
    ],
  };

  const handleToggle = (categoryName) => {
    setActiveCategory(categoryName); // Set the selected category
  };

  return (
    <div className="w-full  px-8">
      {categories.length > 0 ? (
        <>
          {/* Slider with categories */}
          <Slider {...settings}>
            {categories.map((category, index) => (
              <ToggleSwitch
                key={index}
                categoryName={category.name}
                imageUrl={category.imageUrl}
                isOn={activeCategory === category.name} // Highlight selected category
                handleToggle={() => handleToggle(category.name)} // Set active category on click
              />
            ))}
          </Slider>
          <div className="w-full flex flex-col lg:flex-row justify-between">
  <div className="w-full lg:w-[70%] xl:w-[70%]">
    {/* Pass the selected category to ProductCard */}
    <ProductCard selectedCategory={activeCategory} />
  </div>
  <div className="hidden lg:block lg:w-[30%] xl:w-[30%]">
    {/* Cart component, hidden on smaller screens */}
    <Cart />
  </div>
</div>

        </>
      ) : (
        <p>Loading categories...</p>
      )}
    </div>
  );
};

export default ToggleSwitchGroup;

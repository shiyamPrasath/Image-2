import React, { useState, useEffect } from 'react';
import ProductsList from './Card';
import Section_image from '../../Asset/Image/Section3.png';
import './Style.css';  // Ensure this points to your CSS file

const AssortmentSection = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);  // Start with index 1 as the middle

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/original-products/')
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const paddedData = ['', ...data, '']; // Add padding for empty categories
          setCategories(paddedData);
        }
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (index) => {
    setCurrentIndex(index); // Set clicked category as middle
  };

  const getLeftCategory = () => categories[currentIndex - 1]?.name || '';
  const getMiddleCategory = () => categories[currentIndex]?.name || '';
  const getRightCategory = () => categories[currentIndex + 1]?.name || '';

  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${Section_image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          
        }}
      />

      {/* Centered Categories */}
      <div className="flex justify-center items-center space-x-8 my-4 mt-10 ">
        {/* Left Category */}
        <div 
          className={`category-item ${currentIndex > 0 ? 'scale-down' : 'invisible'}`} 
          onClick={() => handleCategoryClick(currentIndex - 1)} // Click to go left
        >
          {getLeftCategory()}
        </div>

        {/* Middle Category */}
        <div className={`category-item scale-up`} onClick={() => handleCategoryClick(currentIndex)}>
          {getMiddleCategory()}
        </div>

        {/* Right Category */}
        <div 
          className={`category-item ${currentIndex < categories.length - 2 ? 'scale-down' : 'invisible'}`} 
          onClick={() => handleCategoryClick(currentIndex + 1)} // Click to go right
        >
          {getRightCategory()}
        </div>
      </div>

      {/* Bottom Border with Centered Circle */}
      <div className="relative w-full flex justify-center mt-8">
        <div className="w-3/4  border-b border-2 border-white relative">
          {/* Circle in the center */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full h-8 w-8 border-2 "></div>
        </div>
      </div>

      {/* Products List */}
      <ProductsList categories={categories} currentIndex={currentIndex} />
    </div>
  );
};

export default AssortmentSection;

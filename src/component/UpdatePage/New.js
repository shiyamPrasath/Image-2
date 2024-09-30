import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Individual Card component for each product
const Card = ({ imageUrl, name, detail, isCenter }) => {
  return (
    <div className="flex flex-col text-white px-4 sm:px-6 md:px-8 lg:px-10">
      <img 
        src={imageUrl} 
        alt={name} 
        className="
          rounded-[15px] 
          w-24 h-24  /* Default size */
          sm:w-28 sm:h-28  /* Small screens */
          md:w-36 md:h-36  /* Medium screens */
          lg:w-48 lg:h-48  /* Large screens */
          xl:w-60 xl:h-60  /* Extra large screens */
          2xl:w-64 2xl:h-64  /* Extra extra large screens */
          object-cover
          xl:rounded-[35px]
        " 
      />
      {/* Conditionally render the name, detail, and button only if it's the center card */}
      {isCenter && (
        <>
          <h2 className="
            mt-4 
            text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl
            font-bold 
            truncate
          ">
            {name}
          </h2>
          <p className="
            mt-2 
            text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 
            sm:line-clamp-2 md:line-clamp-2  /* Clamp on small and medium screens */
            lg:line-clamp-none xl:line-clamp-none  /* Full display on large and extra large screens */
          ">
            {detail}
          </p>
          <a href="#" className="mt-4 text-sm sm:text-base md:text-lg text-white">
            See More
          </a>
        </>
      )}
    </div>
  );
};

// Empty Space component
const EmptySpace = () => {
  return (
    <div 
      className="
        w-full 
        h-48  /* Adjust height as needed */
        flex justify-center items-center"
    >
      <div className="w-24 h-24 rounded-lg bg-transparent" /> {/* Optional transparent div for design */}
    </div>
  );
};

const ProductsList = ({ categories, currentIndex }) => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track the active slide
  const currentCategory = categories[currentIndex];

  if (!currentCategory || !Array.isArray(currentCategory.products)) {
    return <div>No products available</div>; // Safeguard against missing or undefined products
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,   // Set a fixed number of slides to show
    slidesToScroll: 1, // Set a fixed number of slides to scroll
    beforeChange: (current, next) => setActiveSlide(next), // Track the active slide
    responsive: [
      {
        breakpoint: 1536,  // Extra large screens (2xl)
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1280,  // Large screens (xl)
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1024,  // Medium screens (lg)
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,   // Small screens (md)
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,   // Extra small screens (sm)
        settings: {
          slidesToShow: 3,
        }
      }
    ]
  };

  return (
    <div className="px-4 sm:px-8 md:px-10 lg:px-12 xl:px-14 mt-10 ">
      {/* Product slider for the middle category */}
      <Slider {...settings}>
        {/* Add an empty space at the start */}
        <div key="empty-start">
          <EmptySpace />
        </div>
        
        {/* Map through products and render each card */}
        {currentCategory.products.map((product, index) => (
          <div key={product.id}>
            <Card
              imageUrl={product.Image_URL} // Pass the Image_URL prop
              name={product.name}          // Pass the name prop
              detail={product.Detail}      // Pass the Detail prop
              isCenter={index === activeSlide} // Check if the current card is in the center
            />
          </div>
        ))}

        {/* Add an empty space at the end */}
        <div key="empty-end">
          <EmptySpace />
        </div>
      </Slider>
    </div>
  );
};

export default ProductsList;

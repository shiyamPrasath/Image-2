import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import backgroundImg from '../../Asset/Image/Section3.png';


const Page3 = () => {
  const scrollContainer = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the second item centered (index 1)
  const [subCategories, setSubCategories] = useState([]); // State to store subcategories

  // Fetch subcategories from MongoDB using Axios
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/products/');
        // Extract unique subcategories from the data
        const uniqueSubcategories = [
          ...new Set(response.data.map((item) => item.subCategory)),
        ];
        setSubCategories(uniqueSubcategories); // Store subcategories in the state
      } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
      }
    };

    fetchSubCategories(); // Call the function to fetch data
  }, []);

  // Limit the visible subcategories to only the center, left, and right ones
  const getVisibleSubcategories = (index) => {
    const leftIndex = index - 1 >= 0 ? index - 1 : null;
    const rightIndex = index + 1 < subCategories.length ? index + 1 : null;

    return [
      leftIndex !== null ? subCategories[leftIndex] : '', // Empty for the leftmost end
      subCategories[index],
      rightIndex !== null ? subCategories[rightIndex] : '', // Empty for the rightmost end
    ];
  };

  // Handle scroll and center the clicked item
  const handleScrollToIndex = (index) => {
    if (index < 0 || index >= subCategories.length) return; // Prevent invalid index

    if (scrollContainer.current) {
      const childWidth = scrollContainer.current.children[0].offsetWidth;
      const newScrollLeft =
        index * childWidth -
        scrollContainer.current.offsetWidth / 2 +
        childWidth / 2;

      // Slower scroll animation
      scrollContainer.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });

      setCurrentIndex(index); // Only set index within bounds
    }
  };

  // Prevent scroll beyond start or end
  useEffect(() => {
    const handleScrollPosition = () => {
      if (scrollContainer.current) {
        const scrollLeft = scrollContainer.current.scrollLeft;
        const childWidth = scrollContainer.current.children[0].offsetWidth;
        const centerIndex = Math.round(scrollLeft / childWidth);

        if (centerIndex >= 0 && centerIndex < subCategories.length) {
          setCurrentIndex(centerIndex);
        }
      }
    };

    const container = scrollContainer.current;
    container.addEventListener('scroll', handleScrollPosition);
    return () => {
      container.removeEventListener('scroll', handleScrollPosition);
    };
  }, [subCategories]);

  // Get the visible subcategories based on the current index
  const visibleSubcategories = getVisibleSubcategories(currentIndex);

  // Set the width dynamically based on screen size
  const getItemWidth = () => {
    if (window.innerWidth < 640) {
      return '80%'; // for small screens
    } else if (window.innerWidth < 1024) {
      return '40%'; // for medium screens
    }
    return '30%'; // for large screens and above
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Scrollable subCategory content */}
      <div className="flex flex-col items-center h-full w-full relative p-10 z-10">
        {/* Horizontal scroll container */}
        <div
          ref={scrollContainer}
          className="flex space-x-8 overflow-hidden w-full max-w-4xl" // Disable overflow-x scroll here
        >
          {visibleSubcategories.map((subCategory, index) => {
            const actualIndex = currentIndex + (index - 1); // Calculate actual index for correct position
            const isCenter = index === 1; // Middle item (center)
            const isLeftOrRight = index === 0 || index === 2; // Left or right items

            return (
              <div
                key={actualIndex}
                className={`flex-shrink-0 text-center transition-all duration-300 ease-in-out cursor-pointer ${
                  isCenter
                    ? 'text-white text-3xl font-bold md:text-2xl lg:text-3xl xl:text-3xl' // Middle item (responsive)
                    : isLeftOrRight
                    ? 'text-gray-400 text-2xl md:text-xl lg:text-2xl xl:text-2xl' // Left and right items (responsive)
                    : 'text-gray-500 text-xl md:text-lg lg:text-xl xl:text-xl' // Faded out items (responsive)
                }`}
                style={{
                  minWidth: getItemWidth(), // Set dynamically based on screen size
                  maxWidth: getItemWidth(),
                }}
                onClick={() => handleScrollToIndex(actualIndex)} // Clicking moves item to the center
              >
                {subCategory}
              </div>
            );
          })}
        </div>

        {/* Horizontal Line with Dot */}
        <div className=" w-full mt-8">
          <div className="relative border-t border-gray-300 absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-10" />
          <div
            className="relative w-6 h-6 bg-white rounded-full border-2 border-gray-300 z-20"
            style={{
              left: `calc(50% - 1.5rem)`, // Center the dot horizontally
              top: `10%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page3;

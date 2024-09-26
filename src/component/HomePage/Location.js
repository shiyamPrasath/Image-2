import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search'; 
import MyLocationIcon from '@mui/icons-material/MyLocation'; 

const Location = ({ onSetAddress, pickupAddress }) => {
  const [location, setLocation] = useState(null); 
  const [address, setAddress] = useState(pickupAddress); 
  const [error, setError] = useState(null); 
  const [suggestions, setSuggestions] = useState([]); // State to hold location suggestions
  const [searchQuery, setSearchQuery] = useState(''); // Track user input

  // Function to get the current location
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setError(null); // Clear any previous errors
          // Call reverse geocoding to get the address using Nominatim (OSM)
          getGeocodedAddress(latitude, longitude);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  // Function to get the real address from latitude and longitude using Nominatim (OSM)
  const getGeocodedAddress = (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log('Nominatim API Response:', data); // Log the entire response for debugging
        if (data && data.address) {
          const formattedAddress = data.display_name; // OSM returns a display_name
          setAddress(formattedAddress); // Set the address to the state
          onSetAddress(formattedAddress); // Pass the address back to the parent
        } else {
          setError('Failed to get address from coordinates.');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err); // Log any fetch errors
        setError('Failed to fetch geocoded address.');
      });
  };

  // Function to fetch location suggestions from Nominatim
  const fetchSuggestions = (query) => {
    if (query.length > 2) {  // Start fetching after 3 characters
      // Include country code IN for India and search query
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=IN&addressdetails=1&limit=5`;
  
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Filter results to only include places in Tamil Nadu
          const filteredData = data.filter((item) => {
            // Check if the address contains the state as Tamil Nadu
            return item.address && item.address.state === 'Tamil Nadu';
          });
          setSuggestions(filteredData);  // Update the suggestions with filtered results
        })
        .catch((err) => {
          console.error('Error fetching suggestions:', err);
        });
    } else {
      setSuggestions([]); // Clear suggestions if input is less than 3 characters
    }
  };
  

  // Handle input change for search
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    fetchSuggestions(value); // Fetch suggestions based on user input
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion) => {
    const selectedAddress = suggestion.display_name;
    setAddress(selectedAddress);  // Update the address state
    onSetAddress(selectedAddress); // Pass the selected address back to the parent
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div>
      {/* Search Input Box */}
      <div className='border-2 p-2 flex items-center  mt-10'>
        <SearchIcon />
        <input 
          type="text" 
          placeholder="Search for location, area, lat long, plug code, etc." 
          className='ml-2 w-full outline-none text-md text-primary placeholder-fourth bg-white'
          value={searchQuery} // Bind input value to state
          onChange={handleInputChange} // Handle input change
        />
      </div>

      {/* Display suggestions if any */}
      {suggestions.length > 0 && (
        <ul className="border border-gray-300 mt-2 max-h-48 overflow-y-auto bg-white shadow-md">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)} // Handle click on suggestion
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}

      {/* Current Location Button */}
      <div className='flex mt-4 ml-4 cursor-pointer' onClick={handleGetLocation}>
        <MyLocationIcon />
        <p className='text-large font-bold text-primary px-2'>Use Current Location</p>
      </div>
     
      {/* Display Address or Error Message */}
      {address && (
        <div className='mt-4 ml-4'>
          <p className='text-sm text-primary'>Address: {address}</p>
        </div>
      )}

      {error && (
        <div className='mt-4 ml-4 text-red-500'>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
};

export default Location;

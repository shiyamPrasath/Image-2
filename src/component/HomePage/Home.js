import React, { useState, useEffect } from 'react';
import NaviBar from '../NaviBar';
import Breadcrumb from '../Breadcrumb';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import DirectionsIcon from '@mui/icons-material/Directions';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ToggleSwitch from './ToggleSwitch';
import Location from './Location';
import Update from '../UpdatePage/Update'; // Import Update component

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  width: '100%',
  maxWidth: '400px',
  margin: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '12ch',
    [theme.breakpoints.up('md')]: {
      '&:focus': {
        width: '20ch',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: '12ch',
    },
  },
}));

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); // State for update modal
  const [pickupAddress, setPickupAddress] = useState('Pickup Location'); 
  const [selectedCategory, setSelectedCategory] = useState('');

  

  useEffect(() => {
    const savedAddress = localStorage.getItem('pickupAddress');
    if (savedAddress) {
      setPickupAddress(savedAddress);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen || isUpdateOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen, isUpdateOpen]);

  const handleLocationClick = () => {
    setIsModalOpen(true); 
  };

  const closeLocationModal = () => {
    setIsModalOpen(false);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };

  const handleSetAddress = (address) => {
    setPickupAddress(address);
    localStorage.setItem('pickupAddress', address); 
    setIsModalOpen(false);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) {
      setSelectedCategory(''); 
    } else {
      setSelectedCategory(category); 
    }
  };

  const clearPickupAddress = () => {
    setPickupAddress('Pickup Location'); 
  };

  const openUpdateModal = () => {
    setIsUpdateOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-secondary text-primary px-4 sm:px-4 md:px-8 lg:px-7 xl:px-8 overflow-auto ">
      <NaviBar />
      <Breadcrumb />

      <div className="flex flex-col md:flex-row justify-between items-start mt-6 space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/2 h-20 bg-white rounded-lg shadow-lg p-4 flex justify-between">
          <div className="flex items-center space-x-2 text-primary">
            <LocationOnIcon onClick={handleLocationClick} className="cursor-pointer" />
            <span className="font-semibold">{pickupAddress}</span>
            {pickupAddress !== 'Pickup Location' && (
              <CloseIcon
                onClick={clearPickupAddress} 
                className="cursor-pointer text-primary ml-2"
              />
            )}
          </div>
          <div className="flex space-x-4 text-white">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary rounded-full" onClick={openUpdateModal}>
                <CallIcon className="text-secondary" />
              </div>
              <div className="p-2 bg-primary rounded-full">
                <DirectionsIcon className="text-secondary" />
              </div>
              <div className="p-2 bg-primary rounded-full">
                <InfoIcon className="text-secondary" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 sm:w-3/6 h-20 bg-white rounded-lg shadow-lg p-4 flex justify-between">
          <div className="mb-4">
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </div>

          <div className="flex space-x-2">
            <div
              onClick={() => handleCategorySelect('Veg')}
              className={`w-20 sm:w-24 md:w-28 lg:w-32 h-10 bg-white border rounded-lg flex items-center justify-center space-x-2 shadow-md cursor-pointer ${selectedCategory === 'Veg' ? 'bg-green-100' : ''}`}
            >
              {selectedCategory === 'Veg' ? (
                <>
                  <span className="text-sm sm:text-base">Veg</span>
                  <CloseIcon onClick={() => handleCategorySelect('Veg')} className="h-4 w-4 text-primary" />
                </>
              ) : (
                <>
                  <img
                    src="https://github.com/shiyamPrasath/Images/blob/main/Veg.png?raw=true"
                    alt="Veg"
                    className="h-5 w-5"
                  />
                  <span className="text-sm sm:text-base">Veg</span>
                </>
              )}
            </div>

            <div
              onClick={() => handleCategorySelect('Non-Veg')}
              className={`w-20 sm:w-24 md:w-28 lg:w-32 h-10 bg-white border rounded-lg flex items-center justify-center space-x-2 shadow-md cursor-pointer ${selectedCategory === 'Non-Veg' ? 'bg-red-100' : ''}`}
            >
              {selectedCategory === 'Non-Veg' ? (
                <>
                  <span className="text-sm sm:text-base">Non-Veg</span>
                  <CloseIcon onClick={() => handleCategorySelect('Non-Veg')} className="h-4 w-4 text-primary" />
                </>
              ) : (
                <>
                  <img
                    src="https://github.com/shiyamPrasath/Images/blob/main/Non-Veg.png?raw=true"
                    alt="Non-Veg"
                    className="h-5 w-5"
                  />
                  <span className="text-sm sm:text-base">Non-Veg</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <ToggleSwitch />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-lg min-h-[400px]">
            <button
              onClick={closeLocationModal}
              className="absolute top-4 right-4 bg-primary text-secondary rounded-full h-8 w-8 flex items-center justify-center shadow-md"
            >
              &times;
            </button>

            <Location 
              onSetAddress={handleSetAddress} 
              pickupAddress={pickupAddress} 
            />
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isUpdateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-lg min-h-[400px]">
            <button
              onClick={closeUpdateModal}
              className="absolute top-4 right-4 bg-primary text-secondary rounded-full h-8 w-8 flex items-center justify-center shadow-md"
            >
              &times;
            </button>

            <Update 
              pickupAddress={pickupAddress} 
              onSetAddress={handleSetAddress} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
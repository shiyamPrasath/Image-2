import React, { useState, useRef } from "react";
import Breadcrumb from "../Breadcrumb";
import NaviBar from "../NaviBar";
import Coupons from "./Coupons";
import { useCart } from "../HomePage/CartContext";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import LocationIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/AssuredWorkload";
import ExpandCircleDownRoundedIcon from "@mui/icons-material/ExpandCircleDownRounded";
import DeliveryIcon from "@mui/icons-material/LocalShipping";
import DeliveryLaterIcon from "@mui/icons-material/Schedule";
import { Radio, FormControlLabel } from "@mui/material"; 
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import DatePicker from "react-datepicker";
import { format, addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


const Update = () => {
  const { cartItems, updateCartQuantity, updatePickupAddress } = useCart();
  const [isDeliveryExpanded, setDeliveryExpanded] = useState(true);
  const [isLocationExpanded, setLocationExpanded] = useState(false);
  const [isPaymentExpanded, setPaymentExpanded] = useState(false);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState("tomorrow");
  const [selectedDate, setSelectedDate] = useState(null); 
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedLocationOption, setSelectedLocationOption] = useState("current");
  const datePickerRef = useRef(null);
  



  
  
  

  // Calculate the subtotal of cart items
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 0;
    return total + price * quantity;
  }, 0);

  const formattedSubtotal = subtotal ? subtotal.toFixed(2) : "0.00";

  // Calculate total item count in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleQuantityChange = (id, product, change) => {
    const newQuantity = product.quantity + change;
    if (newQuantity > 0) {
      updateCartQuantity(id, newQuantity);
    } else {
      updateCartQuantity(id, 0);
    }
  };

  // Toggle expand state for Delivery box
  const toggleDeliveryExpand = () => {
    setDeliveryExpanded(!isDeliveryExpanded);
  };

  // Handle radio selection for delivery options
  const handleDeliveryOptionChange = (option) => {
    setSelectedDeliveryOption(option);
    if (option === "later") {
      setShowDatePicker(true);
    } else {
      setShowDatePicker(false);
      setSelectedDate(null); // Reset selected date if switching to tomorrow
    }
  };

  // Format the date as dd/mm/yy
  const formatDate = (date) => {
    return format(date, "dd/MM/yy");
  };

  // Handle click on "Proceed to Location Update" button
  const handleProceedToLocation = () => {
    setLocationExpanded(true); // Expand Location box
    setDeliveryExpanded(false); // Collapse Delivery box
  };
  
  // Handle location radio selection
  const handleLocationOptionChange = (option) => {
    setSelectedLocationOption(option);
  };

  
  return (
    <div className="w-full min-h-screen bg-secondary text-primary px-4 sm:px-4 md:px-8 lg:px-7 xl:px-8 ">
      {/* NaviBar at the top */}
      <NaviBar />

      {/* Main content section */}
      <div className="w-full flex flex-col lg:flex-row mt-8 space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left side with Breadcrumb and 3 boxes */}
        <div className="w-full lg:w-3/5 space-y-6 mb-8">
          {/* Breadcrumb */}
          <Breadcrumb />

          {/* 3 boxes */}
          <div className="flex flex-col space-y-6 ">
            {/* Delivery Box */}
            <div
              className={`w-full border bg-third p-4 transition-all duration-300 ease-in-out ${
                isDeliveryExpanded ? "h-auto border-b-2" : "h-24"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex justify-center items-center rounded-full bg-primary">
                    <CalendarIcon
                      className="text-secondary"
                      sx={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xl font-bold">Delivery</span>
                </div>
                <ExpandCircleDownRoundedIcon
                  onClick={toggleDeliveryExpand}
                  className={`text-secondary cursor-pointer transition-transform duration-300 ${
                    isDeliveryExpanded ? "rotate-[-180deg]" : ""
                  }`}
                  sx={{ fontSize: "2.5rem" }}
                />
              </div>

              {/* Expanded content */}
              {isDeliveryExpanded && (
                <div className="mt-4 space-y-4">
                  {/* Delivery Tomorrow option */}
                  <div className="w-full flex justify-between items-center px-6 py-4 border-t-2 border-b-2 border-primary ">
                    <div className="flex items-center space-x-4">
                      <DeliveryIcon
                        className="text-primary"
                        sx={{ fontSize: "2rem" }}
                      />
                      <span>Delivery Tomorrow (10:00)AM TO (9:00)PM </span>
                    </div>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedDeliveryOption === "tomorrow"}
                          onChange={() =>
                            handleDeliveryOptionChange("tomorrow")
                          }
                          sx={{
                            color: "#673A23", // Unchecked color
                            "&.Mui-checked": {
                              color: "#673A23", // Checked color
                            },
                          }}
                          value="tomorrow"
                          name="deliveryOption"
                        />
                      }
                    />
                  </div>

                  {/* Delivery Later option */}
                  <div className="w-full flex justify-between items-center px-6 py-4 border-b-2 border-primary">
                    <div className="flex items-center space-x-4">
                      <DeliveryLaterIcon
                        className="text-primary"
                        sx={{ fontSize: "2rem" }}
                      />
                      <span>Delivery Later</span>
                    </div>
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedDeliveryOption === "later"}
                          onChange={() => handleDeliveryOptionChange("later")}
                          sx={{
                            color: "#673A23", // Unchecked color
                            "&.Mui-checked": {
                              color: "#673A23", // Checked color
                            },
                          }}
                          value="later"
                          name="deliveryOption"
                        />
                      }
                    />
                  </div>

                  {/* Date picker */}
                  {showDatePicker && (
                    <div className="w-full flex justify-between items-center px-6 py-4 border-primary">
                      <span className="w-[30%]">Select Date Of Delivery</span>
                      <div className="flex items-center space-x-4">
                        <div className="border-2 border-primary p-2 flex justify-between items-center">
                          <DatePicker
                            ref={datePickerRef}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            minDate={addDays(new Date(), 1)} // Tomorrow onwards
                            placeholderText="Select a date"
                            onClick={() => setShowDatePicker(true)} // Show calendar when placeholder is clicked
                            className="cursor-pointer bg-third" // Add cursor pointer for better UX
                          />
                          <CalendarIcon
                            onClick={() => datePickerRef.current.setOpen(true)} // Show calendar when icon is clicked
                            className="text-primary cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Button */}
                  <div className="flex justify-center mt-4">
                    {" "}
                    {/* Added a div wrapper to center the button */}
                    <button
                      className="bg-secondary text-primary py-2 rounded w-[40%]"
                      onClick={handleProceedToLocation}
                    >
                      Proceed to Location Update
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Location Box */}
            <div className={`w-full border bg-third p-4 transition-all duration-300 ease-in-out ${isLocationExpanded ? "h-auto border-b-2" : "h-24"}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 flex justify-center items-center rounded-full bg-primary">
                <LocationIcon className="text-secondary" sx={{ fontSize: "2rem" }} />
              </div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-xl font-bold">Location</span>
            </div>
            <ExpandCircleDownRoundedIcon
              onClick={() => setLocationExpanded(!isLocationExpanded)}
              className={`text-secondary cursor-pointer transition-transform duration-300 ${isLocationExpanded ? "rotate-[-180deg]" : ""}`}
              sx={{ fontSize: "2.5rem" }}
            />
          </div>

          {/* Expanded content */}
          {isLocationExpanded && (
            <div className="mt-4 space-y-4">
              {/* Use Current Location option */}
              <div className="w-full flex justify-between items-center px-6 py-4 border-t-2 border-b-2 border-primary">
                <div className="flex items-center space-x-4">
                  <MyLocationIcon />
                  <span>Current Location</span>
                </div>
                <FormControlLabel
                  control={
                    <Radio
                    checked={selectedLocationOption === "current"}
                    onChange={() =>
                      handleLocationOptionChange("current")
                    }
                      sx={{
                        color: "#673A23",
                        "&.Mui-checked": {
                          color: "#673A23",
                        },
                      }}
                      value="current"
                      name="locationOption"
                    />
                  }
                />
              </div>

              {/* Manual Location option */}
              <div className="w-full flex justify-between items-center px-6 py-4 border-b-2 border-primary">
                <div className="flex items-center space-x-4">
                  <LocationCityIcon />
                  <span>Add Manual Location</span>
                </div>
                <FormControlLabel
                  control={
                    <Radio
                      checked={selectedLocationOption === "manual"}
                      onChange={() => handleLocationOptionChange("manual")}
                      sx={{
                        color: "#673A23",
                        "&.Mui-checked": {
                          color: "#673A23",
                        },
                      }}
                      value="manual"
                      name="locationOption"
                    />
                  }
                />
              </div>
            </div>
          )}
        </div>

            {/* Payment Box */}
            <div
              className={`w-full border bg-third p-4 transition-all duration-300 ease-in-out ${
                isPaymentExpanded ? "h-auto border-b-2" : "h-24"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex justify-center items-center rounded-full bg-primary">
                    <PaymentIcon
                      className="text-secondary"
                      sx={{ fontSize: "2rem" }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xl font-bold">Payment</span>
                </div>
                <ExpandCircleDownRoundedIcon
                  onClick={() => setPaymentExpanded(!isPaymentExpanded)}
                  className={`text-secondary cursor-pointer transition-transform duration-300 ${
                    isPaymentExpanded ? "rotate-[-180deg]" : ""
                  }`}
                  sx={{ fontSize: "2.5rem" }}
                />
              </div>

              {/* Expanded content */}
              {isPaymentExpanded && (
                <div className="mt-4 space-y-4">
                  {/* Payment content */}
                  <div className="w-full flex justify-between items-center px-6 py-4 border-t-2 border-b-2 border-primary">
                    <span>Payment content</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side with Cart */}
        <div className="w-full lg:w-2/5 bg-third p-4 shadow-lg rounded-[50px] space-y-6 max-h-[600px] overflow-y-auto mb-8">
          {/* Cart summary header with item count and subtotal */}
          <h2 className="text-xl font-bold mt-2 flex justify-between">
            Cart Summary{" "}
            <span className="text-xl font-bold">
              ({itemCount} item{itemCount > 1 ? "s" : ""} | ₹{formattedSubtotal}
              )
            </span>
          </h2>
          <Coupons />
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center">
              <img
                src={
                  "https://github.com/shiyamPrasath/Images/blob/main/Cart%20(1).png?raw=true"
                }
                alt="Cart"
                className="w-2/4 h-auto mt-10"
              />
              <div className="text-lg font-bold">Your Cart is Empty</div>
              <div className="text-sm">
                We Know Your Food Cravings. Add <br /> Your Favorite Meal Now!
              </div>
            </div>
          ) : (
            <div className="flex flex-col space-y-6 mt-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="w-full p-2 border-dotted border-b border-primary flex flex-col space-y-2"
                >
                  <div className="text-sm font-medium">
                    {item.name} ({item.Categorie}) [{item.quantity} Piece
                    {item.quantity > 1 ? "s" : ""}]
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">
                      {item.quantity} x ₹{item.price} = ₹
                      {item.quantity * item.price}
                    </span>

                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item, -1)}
                        className="border border-primary text-primary px-2 py-1 rounded-l-md"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item, 1)}
                        className="border border-primary text-primary px-2 py-1 rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Subtotal */}
              <div className="flex justify-between items-center mt-4 ">
                <span className="font-bold">Subtotal:</span>
                <span className="font-bold">₹{formattedSubtotal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../HomePage/CartContext'; // Import the Cart context
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductCard = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const { addToCart, updateCartQuantity, cartItems } = useCart(); // Adding `updateCartQuantity`
  const [quantities, setQuantities] = useState({}); // Manage quantities for each product
  const [favorites, setFavorites] = useState({}); // Manage favorite status for each product

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/original-products/')
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const allProducts = response.data.flatMap(category => category.products);
          setProducts(allProducts);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Toggle favorite status for a product
  const handleFavoriteToggle = (productId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [productId]: !prevFavorites[productId]
    }));
  };

  const handleQuantityChange = (productId, product, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[productId] || 0) + change;

      // If quantity is zero or more, update the cart and quantities
      if (newQuantity > 0) {
        addToCart(product, newQuantity); // Adds or updates the product in the cart
        updateCartQuantity(productId, newQuantity); // Updates quantity in the cart
      } else if (newQuantity === 0) {
        updateCartQuantity(productId, 0); // Removes product when quantity is 0
      }

      return {
        ...prevQuantities,
        [productId]: newQuantity < 0 ? 0 : newQuantity,
      };
    });
  };

  const filteredProducts = products.filter(product => product.Categorie === selectedCategory);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 mb-20 mt-20">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => {
          const quantity = quantities[product.id] || 0; // Get the quantity for the current product
          const isFavorite = favorites[product.id] || product.isFavorite; // Get the favorite status for the product

          return (
            <div key={product.id} className="relative w-[250px] h-[350px] rounded-[50px] p-4 shadow-lg border bg-third flex flex-col justify-between">
              {/* Product Image */}
              <img src={product.imageUrl} alt={product.name} className="w-24 h-24 object-cover mx-auto -mt-12" />

              {/* Heart Icon */}
              <div
                className="absolute top-7 right-10 cursor-pointer"
                onClick={() => handleFavoriteToggle(product.id)} // Add favorite toggle
              >
                {isFavorite ? (
                  <FavoriteIcon className="text-red-500" />
                ) : (
                  <FavoriteBorderIcon className="text-red-500" />
                )}
              </div>

              {/* Non-Veg Icon and New/Best Seller Tag */}
              <div className="flex items-center mt-4 w-full justify-between px-2">
                {/* Conditional rendering based on the type (veg/non-veg) */}
                <img
                  src={
                    product.type === 'non-veg'
                      ? 'https://github.com/shiyamPrasath/Images/blob/main/Non-Veg.png?raw=true'
                      : 'https://github.com/shiyamPrasath/Images/blob/main/Veg.png?raw=true'
                  }
                  alt={product.type === 'non-veg' ? 'Non-Veg' : 'Veg'}
                  className="w-6 h-6"
                />

                {/* Conditional rendering of the "New" and "Best Seller" tag */}
                <div className="flex space-x-2">
                  {product.new && (
                    <span className="px-2 py-1 rounded-full bg-[#C5DFC5] text-black text-sm">
                      New
                    </span>
                  )}
                  {product.bestseller && (
                    <span className="px-2 py-1 rounded-full bg-[#F7C6C7] text-black text-sm">
                      Best Seller
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <p className="font-bold text-lg">{product.name}</p>
                <p className="text-md">{product.Categorie}</p>
              </div>

              <div className="mt-4 flex items-center justify-between mb-5">
                <p className="text-sm font-bold">₹{product.price}</p>

                {/* Conditional rendering for Add/Remove buttons */}
                {quantity > 0 ? (
                  <div className="flex items-center">
                    <button onClick={() => handleQuantityChange(product.id, product, -1)} className="border border-primary text-primary px-2 py-1 rounded-l-md">-</button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={() => handleQuantityChange(product.id, product, 1)} className="border border-primary text-primary px-2 py-1 rounded-r-md">+</button>
                  </div>
                ) : (
                  <button onClick={() => handleQuantityChange(product.id, product, 1)} className="border border-primary text-primary px-3 py-1 rounded-md">
                    Add +
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductCard;
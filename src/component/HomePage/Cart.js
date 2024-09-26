import React from 'react';
import { useCart } from '../HomePage/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, updateCartQuantity } = useCart();
  const navigate = useNavigate();  // Use navigate from react-router-dom

  const handleQuantityChange = (id, product, change) => {
    const newQuantity = product.quantity + change;
    if (newQuantity > 0) {
      updateCartQuantity(id, newQuantity);
    } else {
      updateCartQuantity(id, 0);
    }
  };

  // Calculate the subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/update');  // Navigate to the update page on checkout
  };

  return (
    <div className='w-full min-h-[440px] rounded-[50px] p-10 shadow-lg border bg-third mt-10 mb-10'>
      <h2 className='text-lg font-bold'>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center text-center'>
          <img 
            src={'https://github.com/shiyamPrasath/Images/blob/main/Cart%20(1).png?raw=true'} 
            alt="Cart" 
            className='w-2/3 h-auto mt-10'  
          />
          <div className='text-lg font-bold'>Your Cart is Empty</div>
          <div className='text-sm'>
            We Know Your Food Cravings. Add <br /> Your Favorite Meal Now!
          </div>
        </div>
      ) : (
        <div className='flex flex-col space-y-6'>
          {cartItems.map((item) => (
            <div key={item.id} className='w-full p-2 border-dotted border-b border-primary flex flex-col space-y-2'>
              <div className='text-sm font-medium'>
                {item.name} ({item.Categorie}) [{item.quantity} Piece{item.quantity > 1 ? 's' : ''}]
              </div>

              <div className='flex justify-between items-center mt-2'>
                <span className='text-sm'>
                  {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
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
          {/* Subtotal and Checkout Button */}
          <div className='flex justify-between items-center mt-4'>
            <span className='font-bold'>Subtotal:</span>
            <span className='font-bold'>₹{subtotal.toFixed(2)}</span>
          </div>

          {/* Instruction for home delivery */}
          <span className='text-red-500 text-sm'>
            Orders for above ₹500 and get free delivery.
          </span>

          {/* Checkout Button */}
          <button
            className={`mt-8 w-full py-2 text-white rounded-md bg-primary`} 
            onClick={handleCheckout}  // Add onClick to navigate to the update page
          >
            Checkout ₹{subtotal.toFixed(2)}
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

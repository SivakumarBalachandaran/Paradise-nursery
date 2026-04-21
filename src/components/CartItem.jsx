import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from '../CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);

  const handleCheckout = () => {
    alert('🌿 Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  return (
    <div className="cart-page">
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-brand">🌿 Paradise Nursery</span>
        <div className="navbar-links">
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => onNavigate('products')}>Plants</button>
          <button onClick={() => onNavigate('about')}>About Us</button>
          <button className="cart-icon-btn" onClick={() => onNavigate('cart')}>
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>

      <div className="cart-container">
        <h2>🛒 Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty.</p>
            <br />
            <button
              className="continue-shopping-btn"
              style={{ maxWidth: 240, margin: '0 auto', display: 'block' }}
              onClick={() => onNavigate('products')}
            >
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-unit-price">Unit price: ${item.price.toFixed(2)}</div>
                  <div className="cart-item-total">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                  >−</button>
                  <span className="qty-count">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >+</button>
                </div>
                <button
                  className="delete-btn"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-summary">
              <div className="cart-total-line">
                <span>Total Amount</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button
                  className="continue-shopping-btn"
                  onClick={() => onNavigate('products')}
                >
                  ← Continue Shopping
                </button>
                <button className="checkout-btn" onClick={handleCheckout}>
                  Checkout — Coming Soon
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCartCount } from './CartSlice';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import AboutUs from './components/AboutUs';

function App() {
  const [page, setPage] = useState('home');
  const cartCount = useSelector(selectCartCount);

  if (page === 'products') return <ProductList onNavigate={setPage} />;
  if (page === 'cart') return <CartItem onNavigate={setPage} />;
  if (page === 'about') return (
    <div>
      <nav className="navbar">
        <span className="navbar-brand">🌿 Paradise Nursery</span>
        <div className="navbar-links">
          <button onClick={() => setPage('home')}>Home</button>
          <button onClick={() => setPage('products')}>Plants</button>
          <button onClick={() => setPage('about')}>About Us</button>
          <button className="cart-icon-btn" onClick={() => setPage('cart')}>
            🛒 Cart
            <span className="cart-badge">{cartCount}</span>
          </button>
        </div>
      </nav>
      <AboutUs />
    </div>
  );

  // Landing page
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Where Every Plant Finds Its Home</p>
        <button className="get-started-btn" onClick={() => setPage('products')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;

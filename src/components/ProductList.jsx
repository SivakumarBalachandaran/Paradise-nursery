import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCartCount } from '../CartSlice';

const plantsData = [
  // ── Category 1: Air-Purifying Plants ──
  {
    id: 1,
    category: 'Air-Purifying Plants',
    name: 'Snake Plant',
    description: 'Thrives in low light, removes toxins from the air.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=400&q=80',
  },
  {
    id: 2,
    category: 'Air-Purifying Plants',
    name: 'Peace Lily',
    description: 'Elegant white blooms, excellent air cleaner.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&q=80',
  },
  {
    id: 3,
    category: 'Air-Purifying Plants',
    name: 'Spider Plant',
    description: 'Fast-growing, pet-friendly, removes formaldehyde.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400&q=80',
  },
  {
    id: 4,
    category: 'Air-Purifying Plants',
    name: 'Pothos',
    description: 'Hardy trailing vine, perfect for beginners.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1631246547346-fb4a7d53a89d?w=400&q=80',
  },
  {
    id: 5,
    category: 'Air-Purifying Plants',
    name: 'Rubber Plant',
    description: 'Bold dark leaves, excellent air purifier.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?w=400&q=80',
  },
  {
    id: 6,
    category: 'Air-Purifying Plants',
    name: 'Areca Palm',
    description: 'Tropical palm, humidifies and purifies the air.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
  // ── Category 2: Flowering Plants ──
  {
    id: 7,
    category: 'Flowering Plants',
    name: 'African Violet',
    description: 'Compact bloomer with vibrant purple flowers.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1585702601064-5b87e738fc6b?w=400&q=80',
  },
  {
    id: 8,
    category: 'Flowering Plants',
    name: 'Orchid',
    description: 'Exotic and elegant, blooms for months.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&q=80',
  },
  {
    id: 9,
    category: 'Flowering Plants',
    name: 'Anthurium',
    description: 'Waxy red spathes, lush tropical feel.',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1e8a5e1?w=400&q=80',
  },
  {
    id: 10,
    category: 'Flowering Plants',
    name: 'Bromeliad',
    description: 'Striking colour, thrives in bright indirect light.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80',
  },
  {
    id: 11,
    category: 'Flowering Plants',
    name: 'Kalanchoe',
    description: 'Cheerful clusters of long-lasting flowers.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400&q=80',
  },
  {
    id: 12,
    category: 'Flowering Plants',
    name: 'Bird of Paradise',
    description: 'Statement plant with dramatic tropical blooms.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015faf1?w=400&q=80',
  },
  // ── Category 3: Succulents & Cacti ──
  {
    id: 13,
    category: 'Succulents & Cacti',
    name: 'Echeveria',
    description: 'Rosette-shaped succulent, pastel shades.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&q=80',
  },
  {
    id: 14,
    category: 'Succulents & Cacti',
    name: 'Aloe Vera',
    description: 'Soothing gel inside, easy to care for.',
    price: 10.99,
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400&q=80',
  },
  {
    id: 15,
    category: 'Succulents & Cacti',
    name: 'Jade Plant',
    description: 'Lucky charm plant, can live for decades.',
    price: 13.99,
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&q=80',
  },
  {
    id: 16,
    category: 'Succulents & Cacti',
    name: 'Golden Barrel Cactus',
    description: 'Round and spiky, very low maintenance.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&q=80',
  },
  {
    id: 17,
    category: 'Succulents & Cacti',
    name: 'Haworthia',
    description: 'Striped zebra-like leaves, loves shade.',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=400&q=80',
  },
  {
    id: 18,
    category: 'Succulents & Cacti',
    name: 'String of Pearls',
    description: 'Cascading bead-like leaves, stunning in hanging pots.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1491147334573-44cbb4602074?w=400&q=80',
  },
];

const categories = [...new Set(plantsData.map(p => p.category))];

const categoryEmojis = {
  'Air-Purifying Plants': '🌿',
  'Flowering Plants': '🌸',
  'Succulents & Cacti': '🌵',
};

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(state => state.cart.items);
  const [addedIds, setAddedIds] = useState(new Set());

  const isInCart = (id) => cartItems.some(item => item.id === id);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => new Set(prev).add(plant.id));
  };

  return (
    <div className="product-list-page">
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

      <div className="page-header">
        <h2>Our Plant Collection</h2>
        <p>Handpicked for your home & happiness</p>
      </div>

      {categories.map(category => (
        <div key={category} className="category-section">
          <h3 className="category-title">
            {categoryEmojis[category]} {category}
          </h3>
          <div className="plant-grid">
            {plantsData
              .filter(p => p.category === category)
              .map(plant => (
                <div key={plant.id} className="plant-card">
                  <img src={plant.image} alt={plant.name} />
                  <div className="plant-card-body">
                    <div className="plant-name">{plant.name}</div>
                    <div className="plant-description">{plant.description}</div>
                    <div className="plant-price">${plant.price.toFixed(2)}</div>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.id)}
                    >
                      {isInCart(plant.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;

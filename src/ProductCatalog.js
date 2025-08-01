import React, { useState, useEffect } from 'react';
import { API_BASE_URL, PRODUCTS_ENDPOINT } from './config';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}${PRODUCTS_ENDPOINT}?limit=30`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="catalog-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-container">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="retry-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="catalog-container">
        <div className="error">
          <h2>No products found</h2>
          <p>No products are available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Product Catalog</h1>
        <p>Discover our amazing collection of {products.length} products</p>
      </div>
      
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={product.thumbnail || product.images?.[0]} 
                alt={product.title}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                }}
              />
              {product.discountPercentage > 0 && (
                <div className="discount-badge">
                  -{Math.round(product.discountPercentage)}%
                </div>
              )}
            </div>
            
            <div className="product-info">
              <div className="product-brand">
                {product.brand || product.category}
              </div>
              
              <h3 className="product-title">{product.title}</h3>
              
              <p className="product-description">
                {product.description.length > 100 
                  ? `${product.description.substring(0, 100)}...` 
                  : product.description
                }
              </p>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < Math.floor(product.rating || 0) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating ? product.rating.toFixed(1) : 'N/A'}
                </span>
              </div>
              
              <div className="product-price">
                <span className="current-price">${product.price}</span>
                {product.discountPercentage > 0 && (
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="product-actions">
                <button className="view-details-btn">
                  View Details
                </button>
                <button className="add-to-cart-btn">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;

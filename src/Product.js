import React, { useState, useEffect } from 'react';
import { API_BASE_URL, PRODUCTS_ENDPOINT } from './config';
import './Product.css';

const Product = ({ productId = 1 }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}${PRODUCTS_ENDPOINT}/${productId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }
        
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="product-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-container">
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

  if (!product) {
    return (
      <div className="product-container">
        <div className="error">
          <h2>Product not found</h2>
          <p>The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-container">
      <div className="product-card">
        <div className="product-image-section">
          <img 
            src={product.thumbnail || product.images?.[0]} 
            alt={product.title}
            className="product-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
            }}
          />
          {product.images && product.images.length > 1 && (
            <div className="product-gallery">
              {product.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className="gallery-thumbnail"
                  onClick={(e) => {
                    document.querySelector('.product-image').src = image;
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-details">
          <div className="product-header">
            <h1 className="product-title">{product.title}</h1>
            {product.brand && (
              <span className="product-brand">by {product.brand}</span>
            )}
          </div>
          
          <div className="product-price-section">
            <div className="price-container">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="current-price">${product.price}</span>
                  <span className="original-price">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="discount-badge">
                    {product.discountPercentage}% OFF
                  </span>
                </>
              ) : (
                <span className="current-price">${product.price}</span>
              )}
            </div>
            
            {product.rating && (
              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating} ({product.stock} in stock)
                </span>
              </div>
            )}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          {product.category && (
            <div className="product-meta">
              <span className="category-tag">
                Category: {product.category}
              </span>
            </div>
          )}
          
          <div className="product-actions">
            <button className="add-to-cart-btn">
              Add to Cart
            </button>
            <button className="buy-now-btn">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

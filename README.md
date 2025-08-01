# Product Detail Component - React App

A React application featuring a Product Detail Component with API integration, built as an intern assignment project.

## Features

- **API Integration**: Fetches product data from DummyJSON API using native `fetch()`
- **Product Display**: Shows product title, image, price, and description
- **React Hooks**: Uses `useState` and `useEffect` for state management
- **Loading States**: Graceful loading spinner during API calls
- **Error Handling**: User-friendly error messages with retry functionality
- **Responsive Design**: Mobile-first responsive layout
- **Image Gallery**: Multiple product images with thumbnail navigation
- **Dynamic Pricing**: Shows discounts and original prices
- **Rating System**: Star-based product ratings
- **Modern UI**: Clean, professional styling with CSS animations

## Project Structure

```
src/
├── config.js          # API configuration constants
├── Product.js          # Main Product Detail Component
├── Product.css         # Component-specific styles
├── App.js             # Main App component
├── App.css            # App-level styles
├── index.js           # React entry point
└── index.css          # Global styles
```

## Requirements Implemented

✅ **API Integration**: Uses `fetch()` to make API calls  
✅ **Data Source**: Fetches from `https://dummyjson.com/products/{id}`  
✅ **Product Details**: Displays title, image, price, and description  
✅ **React Hooks**: Implements `useEffect` and `useState`  
✅ **Loading/Error States**: Graceful handling with user feedback  

## Bonus Features Implemented

✅ **Styling**: Beautiful, modern CSS with animations and responsive design  
✅ **Config File**: API URL extracted to `config.js`  
✅ **Dynamic Product ID**: Accepts `productId` as a prop  

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm start
   ```

3. **Open Browser**: Navigate to `http://localhost:3000`

## Usage

The app displays a product detail page with:
- High-quality product images with gallery navigation
- Comprehensive product information
- Pricing with discount calculations
- Star ratings and stock information
- Responsive design for all devices

To change the displayed product, modify the `productId` prop in `App.js`:

```javascript
<Product productId={5} /> // Shows product with ID 5
```

## API Configuration

The API settings are centralized in `src/config.js`:
- Base URL: `https://dummyjson.com`
- Endpoint: `/products`
- Default Product ID: `1`

## Technologies Used

- **React 18** - Modern React with Hooks
- **CSS3** - Custom styling with animations
- **Fetch API** - Native browser API for HTTP requests
- **DummyJSON** - Mock REST API for product data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

This project demonstrates:
- Modern React development patterns
- Proper error handling and loading states
- Responsive web design principles
- Clean code organization and structure
- Professional UI/UX design

Built with ❤️ as an intern assignment project.

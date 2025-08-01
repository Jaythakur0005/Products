import React from 'react';
import ProductCatalog from './ProductCatalog';
import './App.css';

function App() {
  return (
    <div className="App">
      <main>
        {/* Product Catalog Component showing all products */}
        <ProductCatalog />
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2024 Product Catalog. Built with React.</p>
      </footer>
    </div>
  );
}

export default App;

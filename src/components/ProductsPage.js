import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const location = useLocation(); // React Router's hook to access the current location
  const [products, setProducts] = useState([
    { name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
    { name: 'Cool Gadget', price: '$30', image: 'https://via.placeholder.com/150' },
    { name: 'Awesome Widget', price: '$40', image: 'https://via.placeholder.com/150' },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const params = new URLSearchParams(location.search); // Extract query parameters
    const search = params.get('search') || ''; // Get the search term
    const lowerCaseSearch = search.toLowerCase();

    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch) // Filter products based on search term
      )
    );
  }, [location.search, products]); // Re-run the effect when location.search or products change

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: `Product ${products.length + 1}`,
        price: `$${products.length * 10 + 10}`,
        image: 'https://via.placeholder.com/150',
      },
    ]);
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              margin: '10px',
              width: '150px',
            }}
          >
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <p>{product.name}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default ProductsPage;

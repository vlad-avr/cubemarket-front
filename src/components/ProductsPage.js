import React, { useState } from 'react';

const ProductsPage = () => {
  const [products, setProducts] = useState([
    { name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
    { name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  ]);

  const addProduct = () => {
    setProducts([
      ...products, 
      { name: `Product ${products.length + 1}`, price: `$${products.length * 10 + 10}`, image: 'https://via.placeholder.com/150' }
    ]);
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '150px' }}>
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
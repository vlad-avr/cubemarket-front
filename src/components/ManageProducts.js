import React, { useState } from 'react';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: '$10', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', price: '$20', image: 'https://via.placeholder.com/150' },
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: '', price: '', image: '' });
  };

  const handleRemoveProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button className="pp_button" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <h3>Add New Product</h3>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Image URL"
        value={newProduct.image}
        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
      />
      <button className="pp_button" onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default ManageProducts;
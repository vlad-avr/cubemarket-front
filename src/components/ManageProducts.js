import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding JWT
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '' });
  const navigate = useNavigate();

  // Decode JWT token to extract user information
  const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token); // Decode the token
    } catch (err) {
      console.error('Invalid JWT token:', err);
      return null;
    }
  };

  const user = decodeToken();

  if (!user) {
    console.error('User is not authenticated or token is invalid.');
    navigate('/'); // Redirect to home if the user is not authenticated
  }

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        user: user.id,       // Extract user ID from decoded token
        delete: 'false',     // Ensure boolean is stringified
        limit: '10',         // Required parameter as a string
        offset: '0',         // Required parameter as a string
      });

      const response = await fetch(`http://localhost:5051/product/list?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
      });

      if (response.ok) {
        const productList = await response.json();
        setProducts(productList);
      } else {
        console.error('Failed to fetch products:', response.statusText);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add a new product
  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5051/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseInt(newProduct.price, 10),
          picture: newProduct.image,
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        setProducts([...products, { ...newProduct, id }]);
        setNewProduct({ name: '', price: '', image: '' });
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  // Remove a product
  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:5051/product/setDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
        body: JSON.stringify({
          id: productId,
          delete: true,
        }),
      });

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
      } else {
        console.error('Failed to delete product:', response.statusText);
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.picture || 'https://via.placeholder.com/150'} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button className="pp_button" onClick={() => handleRemoveProduct(product.id)}>
              Remove
            </button>
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
      <button className="pp_button" onClick={handleAddProduct}>
        Add Product
      </button>

      <div className="navigation-buttons">
        <button className="pp_button" onClick={() => navigate('/personal')}>
          Back to Personal Page
        </button>
      </div>
    </div>
  );
};

export default ManageProducts;

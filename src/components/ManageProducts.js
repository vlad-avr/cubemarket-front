import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './ManageProducts.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: '', leftover: '', description: '' });
  const [editingProduct, setEditingProduct] = useState(null); // Product being edited
  const [editValues, setEditValues] = useState({}); // Values for editing
  const navigate = useNavigate();

  const decodeToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (err) {
      console.error('Invalid JWT token:', err);
      return null;
    }
  };

  const user = decodeToken();

  if (!user) {
    console.error('User is not authenticated or token is invalid.');
    navigate('/');
  }

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        user: user.id,
        delete: 'false',
        limit: '10',
        offset: '0',
      });

      const response = await fetch(`http://localhost:5051/product/list?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const handleAddProduct = async () => {
    try {
      const response = await fetch('http://localhost:5051/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseInt(newProduct.price, 10),
          picture: newProduct.image,
          leftover: parseInt(newProduct.leftover, 10),
          description: newProduct.description,
        }),
      });

      if (response.ok) {
        const { id } = await response.json();
        setProducts([...products, { ...newProduct, id }]);
        setNewProduct({ name: '', price: '', image: '', leftover: '', description: '' });
      } else {
        console.error('Failed to add product:', response.statusText);
      }
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:5051/product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id: productId,
          ...editValues,
          leftover: parseInt(editValues.leftover, 10),
          price: parseInt(editValues.price, 10),
        }),
      });

      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? { ...product, ...editValues } : product
          )
        );
        setEditingProduct(null);
        setEditValues({});
      } else {
        console.error('Failed to edit product:', response.statusText);
      }
    } catch (err) {
      console.error('Error editing product:', err);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch('http://localhost:5051/product/setDelete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
            {editingProduct === product.id ? (
              <>
                <input
                  type="text"
                  value={editValues.name || ''}
                  onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
                  placeholder="Edit name"
                />
                <textarea
                  value={editValues.description || ''}
                  onChange={(e) => setEditValues({ ...editValues, description: e.target.value })}
                  placeholder="Edit description"
                />
                <input
                  type="number"
                  value={editValues.price || ''}
                  onChange={(e) => setEditValues({ ...editValues, price: e.target.value })}
                  placeholder="Edit price"
                />
                <input
                  type="number"
                  value={editValues.leftover || ''}
                  onChange={(e) => setEditValues({ ...editValues, leftover: e.target.value })}
                  placeholder="Edit stock"
                />
                <button onClick={() => handleEditProduct(product.id)}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{product.name}</p>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.leftover}</p>
                <button onClick={() => { setEditingProduct(product.id); setEditValues(product); }}>
                  Edit
                </button>
                <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
              </>
            )}
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
      <textarea
        placeholder="Product Description"
        value={newProduct.description}
        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
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
      <input
        type="text"
        placeholder="Product Stock"
        value={newProduct.leftover}
        onChange={(e) => setNewProduct({ ...newProduct, leftover: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>

      <div className="navigation-buttons">
        <button onClick={() => navigate('/personal')}>Back to Personal Page</button>
      </div>
    </div>
  );
};

export default ManageProducts;

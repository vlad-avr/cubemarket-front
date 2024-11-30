import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUserSignedIn = !!localStorage.getItem('user'); // Check if the user is signed in

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5051/product');
        if (response.ok) {
          const productList = await response.json();
          setProducts(productList);
          setFilteredProducts(productList); // Initialize filtered products
        } else {
          console.error('Failed to fetch products:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const lowerCaseSearch = search.toLowerCase();

    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      )
    );
  }, [location.search, products]);

  const handlePurchase = async (e) => {
    e.preventDefault();
    const amount = parseInt(purchaseAmount, 10);

    if (isNaN(amount) || amount <= 0 || amount > selectedProduct.stock) {
      alert('Invalid purchase amount. Please enter a valid number.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const requestBody = {
      productId: selectedProduct.id,
      quantity: amount,
    };

    try {
      const response = await fetch('http://localhost:5051/product/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`, // Include token for authentication
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setFilteredProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );

        alert(`Successfully purchased ${amount} of ${selectedProduct.name}!`);
        setSelectedProduct(null);
        setPurchaseAmount('');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Purchase failed.');
      }
    } catch (err) {
      console.error('Error purchasing product:', err);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const handleProductClick = (product) => {
    if (isUserSignedIn) {
      setSelectedProduct(product);
    } else {
      alert('You must be signed in to make a purchase.');
      navigate('/auth'); // Redirect to sign-in page
    }
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-item"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
            <p className="product-name">{product.name}</p>
            <p className="product-price">${product.price}</p>
            <p className="product-stock">In stock: {product.stock}</p>
          </div>
        ))}
      </div>

      {selectedProduct && isUserSignedIn && (
        <div className="purchase-form">
          <h3>Purchase {selectedProduct.name}</h3>
          <form onSubmit={handlePurchase}>
            <label>
              Amount (max {selectedProduct.stock}):
              <input
                type="number"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
                min="1"
                max={selectedProduct.stock}
                required
              />
            </label>
            <div className="form-buttons">
              <button type="submit" className="pp_button">Buy</button>
              <button
                type="button"
                className="pp_button cancel"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="navigation-buttons">
        <button className="pp_button back-to-main" onClick={() => navigate('/')}>
          Back to Main
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;

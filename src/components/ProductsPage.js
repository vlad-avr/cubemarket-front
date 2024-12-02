import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed
import './ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Store user data from the token
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [queryParams, setQueryParams] = useState({
    limit: 10,
    offset: 0,
    name: '',
    lowPrice: null,
    highPrice: null,
    delete: false,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [productLimit, setProductLimit] = useState(10);

  // Decode and validate the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          // Token has expired
          console.error('Token has expired');
          localStorage.removeItem('token');
          setUser(null);
          navigate('/auth'); // Redirect to authentication page
        } else {
          setUser(decoded);
        }
      } catch (err) {
        console.error('Error decoding token:', err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [navigate]);

  // Fetch products based on query parameters
  const fetchProducts = async (params) => {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '')
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    ).toString();

    try {
      const response = await fetch(`http://localhost:5051/product/list?${query}`);
      if (response.ok) {
        const productList = await response.json();
        setProducts(productList);
        setFilteredProducts(productList);
      } else {
        console.error('Failed to fetch products:', response.statusText);
        setErrorMessage('Failed to fetch products.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  // Trigger fetch on query parameter change
  useEffect(() => {
    fetchProducts(queryParams);
  }, [queryParams]);

  // Handle search query update
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchName = params.get('name') || '';
    setQueryParams((prev) => ({ ...prev, name: searchName }));
  }, [location.search]);

  const handleSearchClick = () => {
    setQueryParams((prev) => ({
      ...prev,
      name: searchTerm,
      limit: productLimit,
    }));
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    const amount = parseInt(purchaseAmount, 10);

    if (isNaN(amount) || amount <= 0 || amount > selectedProduct.stock) {
      alert('Invalid purchase amount. Please enter a valid number.');
      return;
    }

    const requestBody = {
      product: selectedProduct.id,
      amount_sold: amount,
    };

    try {
      await fetch('http://localhost:5051/product/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authentication
        },
        body: JSON.stringify(requestBody),
      });

      fetchProducts(queryParams);
      setSelectedProduct(false)
      // if (response.ok) {
      //   const updatedProduct = await response.json();
      //   setProducts((prevProducts) =>
      //     prevProducts.map((product) =>
      //       product.id === updatedProduct.id ? updatedProduct : product
      //     )
      //   );
      //   setFilteredProducts((prevProducts) =>
      //     prevProducts.map((product) =>
      //       product.id === updatedProduct.id ? updatedProduct : product
      //     )
      //   );

      //   alert(`Successfully purchased ${amount} of ${selectedProduct.name}!`);
      //   setSelectedProduct(null);
      //   setPurchaseAmount('');
      // } else {
      //   const error = await response.json();
      //   setErrorMessage(error.message || 'Purchase failed.');
      // }
    } catch (err) {
      console.error('Error purchasing product:', err);
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const handleProductClick = (product) => {
    if (user) {
      setSelectedProduct(product);
    } else {
      alert('You must be signed in to make a purchase.');
      navigate('/auth'); // Redirect to sign-in page
    }
  };

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="search-container">
        <div>
          <label htmlFor="searchTerm">Search:</label>
          <input
            id="searchTerm"
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productLimit">Limit:</label>
          <input
            id="productLimit"
            type="number"
            placeholder="Number of products"
            value={productLimit}
            onChange={(e) => setProductLimit(parseInt(e.target.value, 10) || 10)}
            min="1"
          />
        </div>
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>

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
            <p className="product-stock">In stock: {product.leftover}</p>
          </div>
        ))}
      </div>

      {selectedProduct && user && (
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

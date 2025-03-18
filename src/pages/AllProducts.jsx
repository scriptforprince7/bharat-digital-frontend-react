import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "../AllProducts.css"; // Ensure you style the icon properly

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products/", {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_DJANGO_TOKEN}` },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    updateCartCount(); // Update cart count on page load
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalQuantity);
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1>All Products</h1>
        <Link to="/cart" className="cart-icon">
          🛒 <span className="cart-count">{cartCount}</span>
        </Link>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} updateCartCount={updateCartCount} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

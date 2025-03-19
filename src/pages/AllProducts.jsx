import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import "../AllProducts.css";
import DarkModeToggle from "../components/DarkModeToggle";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://bharat-digital-backend.onrender.com/api/products/", {
          headers: { Authorization: `Bearer ${process.env.REACT_APP_DJANGO_TOKEN}` },
        });
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially, show all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    updateCartCount();
  }, []);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalQuantity);
  };

  // 🌟 Live Search Logic
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  // 🛠️ Sort Function
  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);

    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (option === "price") return a.price - b.price;
      if (option === "date") return new Date(b.date_added) - new Date(a.date_added);
      return 0;
    });

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1>All Products</h1>
        <DarkModeToggle /> {/* Add Dark Mode Toggle here */}
        <Link to="/cart" className="cart-icon">
          🛒 <span className="cart-count">{cartCount}</span>
        </Link>
      </div>

      {/* 🔎 Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 🛠️ Filter Dropdown */}
        <select value={sortOption} onChange={handleSortChange}>
          <option value="date">Sort by Date Added</option>
          <option value="price">Sort by Price (Low to High)</option>
        </select>
      </div>

      {/* Display Products */}
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} updateCartCount={updateCartCount} />
          ))
        ) : (
          <p>No products found!</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;

import React, { useState } from "react";
import "../../../src/AddProduct.css"; // Add a CSS file for styling

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product added:", product);
    alert("Product added successfully!");
    setProduct({
      name: "",
      description: "",
      price: "",
      stock_quantity: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          rows="4"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={product.stock_quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">➕ Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../src/AddProduct.css"; // Styling file
import { toast } from "react-toastify";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
  });

  const navigate = useNavigate(); // Hook for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bharat-digital-backend.onrender.com/api/products/",
        product,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_DJANGO_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product added:", response.data);
      toast.success("Product Add Successfully");

      setProduct({
        name: "",
        description: "",
        price: "",
        stock_quantity: "",
      });

      navigate("/dashboard/all-products"); // Redirect after success
    } catch (error) {
      console.error("Failed to add product:", error.response?.data || error);
      toast.error("Failed to add product");
    }
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

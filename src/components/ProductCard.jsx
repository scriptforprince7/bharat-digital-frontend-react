import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.qty) {
        existingProduct.quantity += 1;
      } else {
        toast.error("Not enough stock available!", { position: "top-right" });
        return;
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`, { position: "top-right" });
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.qty}</p>
      <button onClick={handleAddToCart} disabled={product.qty <= 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

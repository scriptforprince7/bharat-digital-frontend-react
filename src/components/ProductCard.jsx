import React from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product, updateCartCount }) => {
  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      if (existingProduct.quantity < product.stock_quantity) {
        existingProduct.quantity += 1;
      } else {
        toast.error("Not enough stock available!");
        return;
      }
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
    updateCartCount(); // Update cart count in real-time
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock_quantity}</p>
      <button onClick={handleAddToCart} disabled={product.stock_quantity <= 0}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

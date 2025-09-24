import { useState } from "react";
import styles from "../styles/ShoppingCart.module.css";
import ProductGrid from "./ProductGrid";
import Cart from "./Cart.jsx";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    quantity: 5,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    quantity: 5,
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    quantity: 1,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    quantity: 2,
  },
  {
    id: 5,
    name: "Phone Case",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=300&h=300&fit=crop",
    quantity: 1,
  },
  {
    id: 6,
    name: "USB Cable",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop",
    quantity: 1,

  },
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({ name: "", email: "" });
  const [productsList, setProductsList] = useState(products);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    // Check if product has available quantity
    const productInList = productsList.find((p) => p.id === product.id);
    if (!productInList || productInList.quantity === 0) {
      alert("Sorry, this product is out of stock!");
      return;
    }

    // Update cart
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    // Update productsList quantity
    setProductsList(
      productsList.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cartItems.find((item) => item.id === productId);

    if (itemToRemove) {
      setProductsList(
        productsList.map((p) =>
          p.id === productId
            ? { ...p, quantity: p.quantity + itemToRemove.quantity }
            : p
        )
      );
      setCartItems(cartItems.filter((item) => item.id !== productId));
    }
  };

  // Get Total
  const getTotalAmount = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    if (!customerInfo.name || !customerInfo.email) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(
      `Order submitted!\nName: ${customerInfo.name}\nEmail: ${
        customerInfo.email
      }\nTotal: $${getTotalAmount()}`
    );

    setProductsList(
      productsList.map((product) => {
        const cartItem = cartItems.find((item) => item.id === product.id);
        if (cartItem) {
          const newQuantity = product.quantity - cartItem.quantity;
          return { ...product, quantity: newQuantity > 0 ? newQuantity : 0 };
        }
        return product;
      })
    );

    setCartItems([]);
    setCustomerInfo({ name: "", email: "" });
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Shopping Cart App</h1>
      <section className={styles.mainContent}>
        <ProductGrid products={productsList} addToCart={addToCart} />

        <Cart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          getTotalAmount={getTotalAmount}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
          handleCheckout={handleCheckout}
        />
      </section>
    </main>
  );
};

export default ShoppingCart;

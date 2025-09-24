import styles from '../styles/ShoppingCart.module.css';
import CheckoutForm from './CheckoutForm';

const Cart = ({ cartItems, removeFromCart, getTotalAmount,customerInfo,setCustomerInfo,handleCheckout }) => {
  return (
    <aside className={styles.cartSection}>
      <h2 className={styles.sectionTitle}>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCart}>Your cart is empty</p>
      ) : (
        <ul className={styles.cartItems}>
          {cartItems.map(item => (
            <li key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h4 className={styles.cartItemName}>{item.name}</h4>
                <p className={styles.cartItemPrice}>
                  ${item.price} x {item.quantity}
                </p>
                <p className={styles.cartItemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className={styles.removeButton}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.totalSection}>
        <h3 className={styles.totalAmount}>Total: ${getTotalAmount()}</h3>
      </div>

     <CheckoutForm customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} handleCheckout={handleCheckout} />

    </aside>
  );
};

export default Cart;

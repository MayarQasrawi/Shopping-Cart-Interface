import styles from '../styles/ShoppingCart.module.css';

const CheckoutForm = ({ customerInfo, setCustomerInfo, handleCheckout }) => {
  return (
    <div className={styles.checkoutSection}>
      <h3 className={styles.checkoutTitle}>Checkout</h3>
      <form onSubmit={handleCheckout} className={styles.checkoutForm}>
        <input
          type="text"
          placeholder="Your Name"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.checkoutButton}>
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;

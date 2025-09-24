import styles from "../styles/ShoppingCart.module.css";

const ProductGrid = ({ products, addToCart }) => {
  return (
    <section className={styles.productsSection}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <article key={product.id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>

            <button
              onClick={() => addToCart(product)}
              disabled={!product.quantity || product.quantity <= 0}
              className={styles.addToCartButton}
            >
              {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;

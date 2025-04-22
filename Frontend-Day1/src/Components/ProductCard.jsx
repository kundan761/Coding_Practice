import "./ProductCard.css";

const ProductCard = ({ product, isFav, toggleFav }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">₹{product.price}</p>
      <button
        onClick={() => toggleFav(product.id)}
        className={`fav-button ${isFav ? "active" : ""}`}
        aria-label="Toggle Favourite"
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default ProductCard;

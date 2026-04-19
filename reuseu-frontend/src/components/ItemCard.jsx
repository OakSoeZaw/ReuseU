import "../styles/ItemCard.css";

function ItemCard({ itemName, userName, deadline, image, onClaim }) {
  return (
    <div className="item-card">
      <div className="card-image">
        {image ? (
          <img src={image} alt={itemName} />
        ) : (
          <div className="image-placeholder">picture</div>
        )}
      </div>

      <div className="card-bottom">
        <div className="card-avatar">👤</div>

        <div className="card-text">
          <h3 className="card-title">{itemName}</h3>
          <div className="card-meta">
            <span className="card-name">{userName}</span>
            <span className="card-deadline">{deadline}</span>
          </div>
        </div>
      </div>
      <button className="claim-btn" onClick={onClaim}>
        Claim
      </button>
    </div>
  );
}

export default ItemCard;

import "./ItemCard.css";
import NavBar from "./NavBar"

function ItemCard({ title, deadline, description, image }) {
    return (
        <div className="item-card">
            <div className="card-top">
                <div className="card-image">
                    <img src={image} alt={title} />
                </div>

                <div className="card-info">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-deadline">deadline: {deadline}</p>
                </div>
            </div>

            <p className="card-description">
                {description}
            </p>
        </div>
    );
}

export default ItemCard;
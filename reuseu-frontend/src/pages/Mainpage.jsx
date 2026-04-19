import "../styles/Mainpage.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { getAvailableItems } from "../services/itemServices";

const CATEGORIES = [
  "All",
  "Books",
  "Furniture",
  "Clothing",
  "Shoes",
  "Kitchen",
  "Electronics",
  "Dorm Essentials",
  "Miscellaneous",
];
const CONDITIONS = [
  "Any Condition",
  "New",
  "Like New",
  "Gently Used",
  "Heavily Used",
];
import ItemCard from "../components/ItemCard";

import { useState, useEffect } from "react";

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAvailableItems()
      .then((data) => setItems(data))
      .catch((err) => console.error(err.message));
  }, []);

  function toggleCondition(cond) {
    if (cond === "Any Condition") {
      setSelectedConditions([]);
      return;
    }
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter((c) => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  }

  const filtered = items.filter((item) => {
    const categoryMatch =
      selectedCategory === "All" || item.category === selectedCategory;
    const conditionMatch =
      selectedConditions.length === 0 ||
      selectedConditions.includes(item.condition);
    return categoryMatch && conditionMatch;
  });

  return (
    <>
      <main className="main-container">
        <NavBar />
        <div className="filters">
          <div className="filter-row">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="filter-row">
            {CONDITIONS.map((cond) => (
              <button
                key={cond}
                className={`filter-btn ${cond === "Any Condition" && selectedConditions.length === 0 ? "active" : ""} ${selectedConditions.includes(cond) ? "active" : ""}`}
                onClick={() => toggleCondition(cond)}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="no-items">No items match your filters.</p>
        ) : (
          <div className="items-grid">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                itemName={item.title}
                userName={item.postedById}
                deadline={new Date(item.postedAt).toLocaleDateString()}
                image={`${import.meta.env.VITE_API_URL}/${item.imagePath}`}
              />
            ))}
          </div>
        )}
        <button className="fab" onClick={() => navigate("/postpage")}>
          +
        </button>
      </main>
    </>
  );
}

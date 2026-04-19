import "../styles/Mainpage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const CATEGORIES = ["All", "Books", "Furniture", "Clothing", "Shoes", "Kitchen", "Electronics", "Dorm Essentials", "Miscellaneous"];
const CONDITIONS = ["Any Condition", "New", "Like New", "Gently Used", "Heavily Used"];

const items = [
  { id: 1, name: "Calculus Textbook", category: "Books", condition: "New", date: "Apr 15" },
  { id: 2, name: "Desk Lamp", category: "Electronics", condition: "Like New", date: "Apr 14" },
  { id: 3, name: "Winter Jacket", category: "Clothing", condition: "New", date: "Apr 13" },
  { id: 4, name: "Mini Fridge", category: "Dorm Essentials", condition: "Heavily Used", date: "Apr 12" },
  { id: 5, name: "Running Shoes", category: "Shoes", condition: "Gently Used", date: "Apr 11" },
  { id: 6, name: "Coffee Maker", category: "Kitchen", condition: "Like New", date: "Apr 10" },
  { id: 7, name: "Wooden Chair", category: "Furniture", condition: "Gently Used", date: "Apr 9" },
  { id: 8, name: "Backpack", category: "Miscellaneous", condition: "New", date: "Apr 8" },
  { id: 9, name: "Physics Textbook", category: "Books", condition: "Gently Used", date: "Apr 7" },
  { id: 10, name: "Headphones", category: "Electronics", condition: "Like New", date: "Apr 6" },
];

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedConditions, setSelectedConditions] = useState([]);
  const navigate = useNavigate();

  function toggleCondition(cond) {
    if (cond === "Any Condition") { setSelectedConditions([]); return; }
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter(c => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  }

  const filtered = items.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const conditionMatch = selectedConditions.length === 0 || selectedConditions.includes(item.condition);
    return categoryMatch && conditionMatch;
  });

  return (
    <main className="main-container">
      <NavBar />
      <div className="filters">
        <div className="filter-row">
          {CATEGORIES.map(cat => (
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
          {CONDITIONS.map(cond => (
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
          {filtered.map(item => (
            <div key={item.id} className="item-card">
              <div className="item-image">No Image</div>
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-date">{item.date}</span>
              </div>
              <div className="item-condition">{item.condition}</div>
            </div>
          ))}
        </div>
      )}

      <button className="fab" onClick={() => navigate("/postpage")}>+</button>
    </main>
  );
}
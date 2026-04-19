import "./MainPage.css";
import Header from "./Header";
import { useState } from "react";

const CATEGORIES = ["All", "Books", "Furniture", "Clothing", "Shoes", "Kitchen", "Electronics", "Dorm Essentials", "Miscellaneous"];
const CONDITIONS = ["Any Condition", "New", "Like New", "Gently Used", "Heavily Used"];

const items = [
  { id: 1, name: "Calculus Textbook", category: "Books", condition: "Gently Used", date: "Apr 15, 2026", image: "" },
  { id: 2, name: "Desk Lamp", category: "Electronics", condition: "Like New", date: "Apr 14, 2026", image: "" },
  { id: 3, name: "Winter Jacket", category: "Clothing", condition: "New", date: "Apr 13, 2026", image: "" },
  { id: 4, name: "Mini Fridge", category: "Dorm Essentials", condition: "Heavily Used", date: "Apr 12, 2026", image: "" },
  { id: 5, name: "Running Shoes", category: "Shoes", condition: "Gently Used", date: "Apr 11, 2026", image: "" },
  { id: 6, name: "Coffee Maker", category: "Kitchen", condition: "Like New", date: "Apr 10, 2026", image: "" },
  { id: 7, name: "Wooden Chair", category: "Furniture", condition: "Gently Used", date: "Apr 9, 2026", image: "" },
  { id: 8, name: "Backpack", category: "Miscellaneous", condition: "New", date: "Apr 8, 2026", image: "" },
];

export default function MainPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("Any Condition");

  const filtered = items.filter(item => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
    const conditionMatch = selectedCondition === "Any Condition" || item.condition === selectedCondition;
    return categoryMatch && conditionMatch;
  });

  return (
    <>
      <Header />
      <main className="main-container">

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
                className={`filter-btn ${selectedCondition === cond ? "active" : ""}`}
                onClick={() => setSelectedCondition(cond)}
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
                <div className="item-image">
                  {item.image ? <img src={item.image} alt={item.name} /> : <span>No Image</span>}
                </div>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-date">{item.date}</span>
                </div>
                <div className="item-condition">{item.condition}</div>
              </div>
            ))}
          </div>
        )}

      </main>
    </>
  );
}
import NavBar from "../components/NavBar";
import "../styles/Mainpage.css";
import { useState } from "react";

import {useState, useEffect} from "react";

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



export default function MainPage() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedConditions, setSelectedConditions] = useState([]);

  useEffect(() => {
    fetch("http://localhose:8080/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
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
      <NavBar />
      <main className="main-container">
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
      </main>
    </>
  );
}

import NavBar from "../components/NavBar";
import "../styles/ProfilePage.css";
import { getUserById } from "../services/userServices";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getClaimedItems,
  getPostedItems,
  confirmPickup,
} from "../services/itemServices";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [claimedItems, setClaimedItems] = useState([]);
  const [postedItems, setPostedItems] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    getUserById(stored.id).then((data) => setUser(data));
    getClaimedItems(stored.id).then((data) => setClaimedItems(data));
    getPostedItems(stored.id).then((data) => {
      console.log("posted items:", data); // ← add this
      setPostedItems(data);
    });
  }, []);

  const handleConfirm = async (itemId) => {
    try {
      await confirmPickup(itemId);
      const stored = JSON.parse(localStorage.getItem("user"));
      getUserById(stored.id).then((data) => setUser(data));
      getPostedItems(stored.id).then((data) => setPostedItems(data));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">👤</div>
        <p className="profile-name">{user.name}</p>
        <p className="profile-email">{user.email}</p>
        <p className="profile-rating">Rating</p>
        <p className="profile-leaderboard">
          Leaderboard <span className="profile-rank">#{user.greenScore}</span>
        </p>
      </div>

      <hr className="profile-divider" />

      <div className="profile-sections">
        <div className="profile-section-card">
          <h2>Donations</h2>
          <p className="profile-count">{user.donatedCount} items donated</p>
          {/* Show all posted items */}
          {postedItems.map((item) => (
            <div key={item.id} className="claimed-item">
              <img src={`${import.meta.env.VITE_API_URL}/${item.imagePath}`} />
              <div>
                <p>{item.title}</p>
                <p className="item-status">
                  {item.status === "AVAILABLE" && "🟢 Available"}
                  {item.status === "CLAIMED" && "🔔 Someone claimed this!"}
                  {item.status === "TAKEN" && "✅ Donated"}
                </p>
              </div>
              {/* Show confirm button only if claimed */}
              {item.status === "CLAIMED" && (
                <button
                  className="confirm-btn"
                  onClick={() => handleConfirm(item.id)}
                >
                  Confirm Pickup ✅
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="profile-section-card">
          <h2>Claims</h2>
          {claimedItems.length === 0 ? (
            <p className="profile-count">No items claimed yet</p>
          ) : (
            claimedItems.map((item) => (
              <div key={item.id} className="claimed-item">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.imagePath}`}
                />
                <p>{item.title}</p>
                <p className="item-status">
                  {item.status === "CLAIMED"
                    ? "⏳ Waiting for pickup"
                    : "✅ Picked up"}
                </p>
              </div>
            ))
          )}
        </div>{" "}
        {/* ← closes profile-section-card */}
      </div>

      <button className="donate-btn" onClick={() => navigate("/postpage")}>
        DONATE
      </button>
    </div>
  );
}

export default ProfilePage;

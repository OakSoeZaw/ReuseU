import NavBar from "../components/NavBar";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const user = {
    name: "Ko",
    rating: 5,
    leaderboard: 4,
    donations: 91,
    claims: 12,
  };

  return (
    <div className="profile-page">
      <main className="profile-main">
        <section className="profile-card">
          <div className="profile-top">
            <h1 className="profile-greeting">Hi, {user.name}!</h1>

            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                <span>👤</span>
              </div>
            </div>

            <div className="profile-stats-row">
              <div className="profile-rating">
                <span className="profile-label">Rating</span>
                <span className="profile-stars">{"★".repeat(user.rating)}</span>
              </div>

              <div className="profile-leaderboard">
                <span className="profile-label">Leaderboard</span>
                <span className="profile-rank">#{user.leaderboard}</span>
              </div>
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-bottom">
            <div className="profile-section">
              <h2 className="section-title">Donations</h2>
              <div className="stat-badge">{user.donations}</div>
            </div>

            <div className="profile-section">
              <h2 className="section-title">Claims</h2>
              <div className="stat-badge">{user.claims}</div>
            </div>
          </div>

          <div className="profile-action-row">
            <button className="donate-button">DONATE</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProfilePage;

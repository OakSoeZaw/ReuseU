import "./WelcomePage.css"

function WelcomePage({ onStart }){
  return (
      <div className="welcome-page">
          <div className="welcome-overlay"></div>

          <div className="welcome-card">
              <p className="welcome-tag">UNIVERSITY REUSE PLATFORM</p>
              <h1 className="welcome-title">ReuseU</h1>

              <p className="welcome-description">
                  A refined donation platform for university communities,
                  helping students pass meaningful items to the next person
                  who truly needs them.
              </p>

              <button className="welcome-button" onClick={onStart}>
                  Go to Login
              </button>
          </div>
      </div>
  );
}

export default WelcomePage;
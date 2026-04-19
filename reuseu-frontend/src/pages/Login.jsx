// LoginPage.jsx
import "../styles/LoginPage.css";
import { useState } from "react";
import { login } from "../services/authServices";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(email, password);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/feed";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-logo">🌱 ReuseU</h1>
        <p className="login-tagline">Give more, waste less</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="University email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember me
          </label>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

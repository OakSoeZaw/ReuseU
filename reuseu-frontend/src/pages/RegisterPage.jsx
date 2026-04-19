import "../styles/LoginPage.css";
import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { register } from "../services/authServices";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await register(name, email, password);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/feed";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-wrapper">
      {" "}
      {/* reuse same CSS */}
      <div className="login-card">
        <h1 className="login-logo">🌱 ReuseU</h1>
        <p className="login-tagline">Create your account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleRegister}>
          {/* Name input */}
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email input */}
          <input
            type="email"
            placeholder="University email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password input with eye toggle */}
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
              className="show-hide"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm password input with eye toggle */}

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Sign up
          </button>
        </form>

        <p className="signup-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

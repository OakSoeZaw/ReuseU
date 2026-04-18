import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { height: 100%; width: 100%; }

  .login-root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
    padding: 48px 24px;
  }

  .login-inner {
    width: 100%;
    max-width: 460px;
  }

  .card-logo {
    font-family: 'Playfair Display', serif;
    font-size: 44px;
    font-weight: 700;
    color: #52d9a0;
    line-height: 1;
    margin-bottom: 2px;
  }

  .card-portal {
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 44px;
  }

  .form-title {
    font-family: 'Playfair Display', serif;
    font-size: 34px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 32px;
  }

  .form-group { margin-bottom: 16px; }

  .form-label {
    display: block;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 7px;
    text-align: left;
  }

  .name-row { display: flex; gap: 14px; }
  .name-row .form-group { flex: 1; }

  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.07);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    padding: 14px 18px;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .form-input::placeholder { color: rgba(255,255,255,0.25); }
  .form-input:focus {
    border-color: #52d9a0;
    background: rgba(255,255,255,0.11);
  }
  .form-input.error { border-color: #ff6b6b; }
  .form-input.has-toggle { padding-right: 48px; }

  .input-wrap { position: relative; }

  .pw-toggle {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255,255,255,0.35);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    transition: color 0.2s;
  }
  .pw-toggle:hover { color: rgba(255,255,255,0.8); }

  .error-msg {
    font-size: 12px;
    color: #ff8f8f;
    margin-top: 5px;
  }

  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 14px 0 24px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    user-select: none;
  }

  .checkbox-label input[type="checkbox"] {
    width: 15px;
    height: 15px;
    accent-color: #52d9a0;
    cursor: pointer;
  }

  .forgot-link {
    font-size: 13px;
    color: #52d9a0;
    text-decoration: none;
    font-weight: 600;
  }
  .forgot-link:hover { color: #7ee8b8; }

  .terms-row {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin: 14px 0 24px;
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
  }

  .terms-row input[type="checkbox"] {
    margin-top: 2px;
    width: 15px;
    height: 15px;
    accent-color: #52d9a0;
    cursor: pointer;
    flex-shrink: 0;
  }

  .terms-row a {
    color: #52d9a0;
    text-decoration: none;
    font-weight: 600;
  }

  .submit-btn {
    width: 100%;
    padding: 15px;
    background: #52d9a0;
    color: #0f2027;
    border: none;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
    letter-spacing: 0.03em;
  }
  .submit-btn:hover { background: #6ee8b0; }
  .submit-btn:active { transform: scale(0.99); }
  .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 18px 0;
    color: rgba(255,255,255,0.2);
    font-size: 12px;
  }
  .divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.1);
  }

  .sso-btn {
    width: 100%;
    padding: 14px;
    background: rgba(255,255,255,0.07);
    border: 1.5px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: background 0.2s, border-color 0.2s;
  }
  .sso-btn:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.2);
  }

  .form-switch {
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: rgba(255,255,255,0.4);
  }

  .form-switch a {
    color: #52d9a0;
    text-decoration: none;
    font-weight: 600;
  }
  .form-switch a:hover { color: #7ee8b8; }

  .success-banner {
    background: rgba(82,217,160,0.1);
    border: 1px solid rgba(82,217,160,0.3);
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 13px;
    color: #52d9a0;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(15,32,39,0.3);
    border-top-color: #0f2027;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    display: inline-block;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
`;

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function LoginForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = "School email is required.";
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  return (
    <>
      <h1 className="form-title">Log In</h1>
      {success && <div className="success-banner">✓ Logged in successfully! Redirecting...</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label">School Email</label>
          <input
            className={`form-input${errors.email ? " error" : ""}`}
            type="email" placeholder="you@school.edu"
            value={email}
            onChange={ev => { setEmail(ev.target.value); setErrors(p => ({...p, email: ""})); }}
            autoComplete="email"
          />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrap">
            <input
              className={`form-input has-toggle${errors.password ? " error" : ""}`}
              type={showPw ? "text" : "password"} placeholder="Enter your password"
              value={password}
              onChange={ev => { setPassword(ev.target.value); setErrors(p => ({...p, password: ""})); }}
              autoComplete="current-password"
            />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}>
              <EyeIcon open={showPw} />
            </button>
          </div>
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </div>

        <div className="form-row">
          <label className="checkbox-label">
            <input type="checkbox" checked={remember} onChange={() => setRemember(v => !v)} />
            Remember me
          </label>
          <a href="#" className="forgot-link">Forgot password?</a>
        </div>

        <button className="submit-btn" type="submit" disabled={loading || success}>
          {loading ? <span className="spinner" /> : success ? "Logged In ✓" : "Log In"}
        </button>

        <div className="divider">or continue with</div>
        <button type="button" className="sso-btn"><GoogleIcon /> Log in with Google</button>
      </form>

      <p className="form-switch">
        Don't have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch(); }}>Create one here</a>
      </p>
    </>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key) => (ev) => {
    setForm(p => ({ ...p, [key]: ev.target.value }));
    setErrors(p => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required.";
    if (!form.lastName.trim()) e.lastName = "Required.";
    if (!form.email) e.email = "School email is required.";
    else if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Enter a valid email address.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 6) e.password = "At least 6 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.confirm !== form.password) e.confirm = "Passwords do not match.";
    if (!agreed) e.terms = "You must agree to the terms.";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  return (
    <>
      <h1 className="form-title">Create Account</h1>
      {success && <div className="success-banner">✓ Account created! Welcome to ReuseU.</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="name-row">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input className={`form-input${errors.firstName ? " error" : ""}`} type="text" placeholder="Jane" value={form.firstName} onChange={set("firstName")} />
            {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input className={`form-input${errors.lastName ? " error" : ""}`} type="text" placeholder="Smith" value={form.lastName} onChange={set("lastName")} />
            {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">School Email</label>
          <input className={`form-input${errors.email ? " error" : ""}`} type="email" placeholder="you@school.edu" value={form.email} onChange={set("email")} autoComplete="email" />
          {errors.email && <div className="error-msg">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="input-wrap">
            <input className={`form-input has-toggle${errors.password ? " error" : ""}`} type={showPw ? "text" : "password"} placeholder="Create a password" value={form.password} onChange={set("password")} autoComplete="new-password" />
            <button type="button" className="pw-toggle" onClick={() => setShowPw(v => !v)}><EyeIcon open={showPw} /></button>
          </div>
          {errors.password && <div className="error-msg">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="input-wrap">
            <input className={`form-input has-toggle${errors.confirm ? " error" : ""}`} type={showConfirm ? "text" : "password"} placeholder="Repeat your password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
            <button type="button" className="pw-toggle" onClick={() => setShowConfirm(v => !v)}><EyeIcon open={showConfirm} /></button>
          </div>
          {errors.confirm && <div className="error-msg">{errors.confirm}</div>}
        </div>

        <div className="terms-row">
          <input type="checkbox" checked={agreed} onChange={() => { setAgreed(v => !v); setErrors(p => ({...p, terms: ""})); }} />
          <span>I agree to the <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a></span>
        </div>
        {errors.terms && <div className="error-msg" style={{marginTop: -8, marginBottom: 14}}>{errors.terms}</div>}

        <button className="submit-btn" type="submit" disabled={loading || success}>
          {loading ? <span className="spinner" /> : success ? "Account Created ✓" : "Create Account"}
        </button>

        <div className="divider">or register with</div>
        <button type="button" className="sso-btn"><GoogleIcon /> Sign up with Google</button>
      </form>

      <p className="form-switch">
        Already have an account? <a href="#" onClick={e => { e.preventDefault(); onSwitch(); }}>Log in here</a>
      </p>
    </>
  );
}

// export default function Login() {
//   const [view, setView] = useState("login");
export default function Login({ onSuccess }) {
  const [view, setView] = useState("login");

  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        <div className="login-inner">
          <div className="card-logo">ReuseU</div>
          <div className="card-portal">Student Portal</div>
          {view === "login"
            ? <LoginForm
            onSwitch={() => setView("register")}
            onSuccess={onSuccess}
            />
            : <RegisterForm onSwitch={() => setView("login")} />
          }
        </div>
      </div>
    </>
  );
}
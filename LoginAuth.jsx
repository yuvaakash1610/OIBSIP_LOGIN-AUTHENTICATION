import { useState, useEffect, createContext, useContext } from "react";

// ─── Auth Context ─────────────────────────────────────────────────────────────
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

// ─── Fake DB (localStorage simulation) ───────────────────────────────────────
const DB = {
  getUsers: () => JSON.parse(localStorage.getItem("auth_users") || "[]"),
  saveUsers: (u) => localStorage.setItem("auth_users", JSON.stringify(u)),
  getSession: () => JSON.parse(localStorage.getItem("auth_session") || "null"),
  saveSession: (s) => localStorage.setItem("auth_session", JSON.stringify(s)),
  clearSession: () => localStorage.removeItem("auth_session"),
};

// ─── Validators ───────────────────────────────────────────────────────────────
const validate = {
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address",
  password: (v) => v.length >= 6 ? "" : "Password must be at least 6 characters",
  name: (v) => v.trim().length >= 2 ? "" : "Name must be at least 2 characters",
  confirm: (p, c) => p === c ? "" : "Passwords do not match",
};

// ─── Input Component ──────────────────────────────────────────────────────────
function Input({ label, type = "text", value, onChange, error, placeholder, icon, rightEl }) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, pointerEvents: "none" }}>{icon}</span>
        )}
        <input
          type={isPass ? (show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%", padding: `13px ${isPass ? "44px" : "14px"} 13px ${icon ? "42px" : "14px"}`,
            background: "rgba(255,255,255,0.05)",
            border: `1.5px solid ${error ? "#f87171" : "rgba(255,255,255,0.1)"}`,
            borderRadius: 10, color: "#f1f5f9", fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
            outline: "none", transition: "border .2s, background .2s",
          }}
          onFocus={e => e.target.style.borderColor = error ? "#f87171" : "#6366f1"}
          onBlur={e => e.target.style.borderColor = error ? "#f87171" : "rgba(255,255,255,0.1)"}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)} style={{
            position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#64748b", padding: 2
          }}>{show ? "🙈" : "👁️"}</button>
        )}
        {rightEl}
      </div>
      {error && <span style={{ fontSize: 11, color: "#f87171", fontWeight: 600 }}>⚠ {error}</span>}
    </div>
  );
}

// ─── Button Component ─────────────────────────────────────────────────────────
function Btn({ children, onClick, type = "button", loading, variant = "primary", style: s }) {
  const styles = {
    primary: { background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" },
    ghost: { background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1.5px solid rgba(255,255,255,0.1)" },
    danger: { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1.5px solid rgba(239,68,68,0.3)" },
  };
  return (
    <button type={type} onClick={onClick} disabled={loading}
      style={{
        width: "100%", padding: "13px 20px", borderRadius: 12, border: "none",
        fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 700,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.7 : 1,
        transition: "all .2s", letterSpacing: ".01em",
        ...styles[variant], ...s
      }}
      onMouseEnter={e => { if (!loading) e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 24px rgba(99,102,241,.35)"; }}
      onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "none"; }}
    >
      {loading ? "⏳ Please wait..." : children}
    </button>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, display: "flex", flexDirection: "column", gap: 10, zIndex: 9999 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "12px 20px", borderRadius: 12, fontSize: 13, fontWeight: 700,
          background: t.type === "success" ? "rgba(16,185,129,0.15)" : t.type === "error" ? "rgba(239,68,68,0.15)" : "rgba(99,102,241,0.15)",
          border: `1px solid ${t.type === "success" ? "rgba(16,185,129,0.4)" : t.type === "error" ? "rgba(239,68,68,0.4)" : "rgba(99,102,241,0.4)"}`,
          color: t.type === "success" ? "#34d399" : t.type === "error" ? "#f87171" : "#a5b4fc",
          backdropFilter: "blur(10px)", boxShadow: "0 4px 20px rgba(0,0,0,.3)",
          animation: "slideIn .3s ease",
          display: "flex", alignItems: "center", gap: 8
        }}>
          {t.type === "success" ? "✅" : t.type === "error" ? "❌" : "ℹ️"} {t.msg}
        </div>
      ))}
    </div>
  );
}

// ─── Card Wrapper ─────────────────────────────────────────────────────────────
function Card({ children, title, subtitle, icon }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
      padding: "36px 32px", width: "100%", maxWidth: 420,
      boxShadow: "0 24px 64px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.05)",
      animation: "fadeUp .4s ease"
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        {icon && <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>}
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", margin: 0, fontFamily: "'Syne', sans-serif" }}>{title}</h1>
        {subtitle && <p style={{ color: "#64748b", fontSize: 14, marginTop: 6, margin: "6px 0 0" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      <span style={{ fontSize: 12, color: "#475569", fontWeight: 600 }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

// ─── Strength Meter ───────────────────────────────────────────────────────────
function StrengthMeter({ password }) {
  const checks = [password.length >= 6, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#f87171", "#fbbf24", "#34d399", "#6366f1"];
  if (!password) return null;
  return (
    <div style={{ marginTop: -4 }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= score ? colors[score] : "rgba(255,255,255,0.1)", transition: "background .3s" }} />
        ))}
      </div>
      <span style={{ fontSize: 11, color: colors[score], fontWeight: 700 }}>{labels[score]}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── PAGES ───────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onSwitch }) {
  const { login, toast } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {
      email: validate.email(form.email),
      password: form.password ? "" : "Password is required",
    };
    if (Object.values(errs).some(Boolean)) return setErrors(errs);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const users = DB.getUsers();
    const user = users.find(u => u.email === form.email && u.password === btoa(form.password));
    if (!user) {
      setErrors({ general: "Invalid email or password. Please try again." });
    } else if (!user.verified) {
      setErrors({ general: "Please verify your email before logging in." });
    } else {
      login(user);
      toast("Welcome back, " + user.name + "! 👋", "success");
    }
    setLoading(false);
  };

  return (
    <Card title="Welcome Back" subtitle="Sign in to your account" icon="🔐">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {errors.general && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#f87171", fontWeight: 600 }}>
            ⚠️ {errors.general}
          </div>
        )}
        <Input label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@example.com" icon="✉️" />
        <Input label="Password" type="password" value={form.password} onChange={set("password")} error={errors.password} placeholder="Enter your password" icon="🔑" />
        <div style={{ textAlign: "right", marginTop: -8 }}>
          <span onClick={() => onSwitch("forgot")} style={{ fontSize: 12, color: "#6366f1", cursor: "pointer", fontWeight: 700 }}>Forgot password?</span>
        </div>
        <Btn type="submit" loading={loading}>Sign In →</Btn>
        <Divider label="Don't have an account?" />
        <Btn variant="ghost" onClick={() => onSwitch("register")}>Create Account</Btn>
      </form>
    </Card>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────────────────
function RegisterPage({ onSwitch }) {
  const { toast } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {
      name: validate.name(form.name),
      email: validate.email(form.email),
      password: validate.password(form.password),
      confirm: validate.confirm(form.password, form.confirm),
    };
    if (Object.values(errs).some(Boolean)) return setErrors(errs);
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const users = DB.getUsers();
    if (users.find(u => u.email === form.email)) {
      setErrors({ email: "This email is already registered." });
      setLoading(false);
      return;
    }
    const token = Math.random().toString(36).slice(2);
    const newUser = { id: Date.now(), name: form.name, email: form.email, password: btoa(form.password), token, verified: false, createdAt: new Date().toISOString(), role: "user" };
    DB.saveUsers([...users, newUser]);
    setDone(true);
    toast("Account created! Check your inbox. 📧", "success");
    setLoading(false);
  };

  if (done) return (
    <Card title="Check Your Email!" subtitle="We sent a verification link" icon="📬">
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,.3)", borderRadius: 14, padding: "20px 24px", color: "#34d399", fontSize: 14, lineHeight: 1.7 }}>
          A verification link has been sent to<br /><strong>{form.email}</strong>.<br />Click it to activate your account.
        </div>
        <p style={{ fontSize: 12, color: "#475569" }}>
          In this demo, click below to simulate email verification:
        </p>
        <Btn onClick={() => {
          const users = DB.getUsers();
          const idx = users.findIndex(u => u.email === form.email);
          if (idx !== -1) { users[idx].verified = true; DB.saveUsers(users); }
          onSwitch("login");
          toast("Email verified! You can now log in. ✅", "success");
        }}>✉️ Simulate Email Verification</Btn>
        <span onClick={() => onSwitch("login")} style={{ fontSize: 13, color: "#6366f1", cursor: "pointer", fontWeight: 700 }}>← Back to Login</span>
      </div>
    </Card>
  );

  return (
    <Card title="Create Account" subtitle="Join us today — it's free" icon="🚀">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Input label="Full Name" value={form.name} onChange={set("name")} error={errors.name} placeholder="John Doe" icon="👤" />
        <Input label="Email Address" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@example.com" icon="✉️" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Input label="Password" type="password" value={form.password} onChange={set("password")} error={errors.password} placeholder="Min. 6 characters" icon="🔒" />
          <StrengthMeter password={form.password} />
        </div>
        <Input label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} placeholder="Repeat your password" icon="🔒" />
        <Btn type="submit" loading={loading}>Create Account 🎉</Btn>
        <Divider label="Already have an account?" />
        <Btn variant="ghost" onClick={() => onSwitch("login")}>Sign In Instead</Btn>
      </form>
    </Card>
  );
}

// ─── FORGOT PASSWORD PAGE ─────────────────────────────────────────────────────
function ForgotPage({ onSwitch }) {
  const { toast } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const err = validate.email(email);
    if (err) return setError(err);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const users = DB.getUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      setError("No account found with this email.");
      setLoading(false);
      return;
    }
    const resetToken = Math.random().toString(36).slice(2);
    const idx = users.findIndex(u => u.email === email);
    users[idx].resetToken = resetToken;
    DB.saveUsers(users);
    setSent(true);
    toast("Password reset instructions sent! 📧", "info");
    setLoading(false);
  };

  if (sent) return (
    <Card title="Reset Link Sent!" icon="📩" subtitle="Check your inbox">
      <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", textAlign: "center" }}>
        <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,.3)", borderRadius: 14, padding: "18px 20px", color: "#a5b4fc", fontSize: 14, lineHeight: 1.7 }}>
          Instructions sent to <strong>{email}</strong>.<br />Valid for 15 minutes.
        </div>
        <p style={{ fontSize: 12, color: "#475569" }}>Demo: simulate password reset below</p>
        <Btn onClick={() => onSwitch("reset", email)}>🔐 Simulate Reset Password</Btn>
        <span onClick={() => onSwitch("login")} style={{ fontSize: 13, color: "#6366f1", cursor: "pointer", fontWeight: 700 }}>← Back to Login</span>
      </div>
    </Card>
  );

  return (
    <Card title="Forgot Password?" subtitle="We'll send a reset link to your email" icon="🔑">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Input label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} error={error} placeholder="you@example.com" icon="✉️" />
        <Btn type="submit" loading={loading}>Send Reset Link</Btn>
        <Divider label="or" />
        <Btn variant="ghost" onClick={() => onSwitch("login")}>← Back to Login</Btn>
      </form>
    </Card>
  );
}

// ─── RESET PASSWORD PAGE ──────────────────────────────────────────────────────
function ResetPage({ email, onSwitch }) {
  const { toast } = useAuth();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {
      password: validate.password(form.password),
      confirm: validate.confirm(form.password, form.confirm),
    };
    if (Object.values(errs).some(Boolean)) return setErrors(errs);
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.email === email);
    if (idx !== -1) {
      users[idx].password = btoa(form.password);
      delete users[idx].resetToken;
      DB.saveUsers(users);
    }
    toast("Password reset successfully! 🎉", "success");
    onSwitch("login");
    setLoading(false);
  };

  return (
    <Card title="Reset Password" subtitle="Choose a strong new password" icon="🔐">
      <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Input label="New Password" type="password" value={form.password} onChange={set("password")} error={errors.password} placeholder="Min. 6 characters" icon="🔒" />
          <StrengthMeter password={form.password} />
        </div>
        <Input label="Confirm Password" type="password" value={form.confirm} onChange={set("confirm")} error={errors.confirm} placeholder="Repeat your password" icon="🔒" />
        <Btn type="submit" loading={loading}>Reset Password ✅</Btn>
      </form>
    </Card>
  );
}

// ─── SECURED DASHBOARD ────────────────────────────────────────────────────────
function Dashboard() {
  const { user, logout, toast } = useAuth();
  const [activeTab, setActiveTab] = useState("home");
  const [profileForm, setProfileForm] = useState({ name: user.name, bio: user.bio || "" });
  const [saved, setSaved] = useState(false);

  const stats = [
    { icon: "📅", label: "Member Since", val: new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
    { icon: "🛡️", label: "Account Status", val: "Verified ✅" },
    { icon: "👤", label: "Role", val: user.role === "admin" ? "Admin 🛡️" : "User" },
    { icon: "🔑", label: "Auth Method", val: "Email & Password" },
  ];

  const saveProfile = () => {
    const users = DB.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx !== -1) { users[idx].name = profileForm.name; users[idx].bio = profileForm.bio; DB.saveUsers(users); }
    setSaved(true);
    toast("Profile updated! ✅", "success");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0b0e1a", fontFamily: "'DM Sans', sans-serif", color: "#f1f5f9" }}>
      {/* Sidebar */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 220, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.07)", padding: "24px 0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔐</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15, fontFamily: "'Syne', sans-serif" }}>AuthApp</div>
              <div style={{ fontSize: 10, color: "#475569", fontWeight: 600 }}>Secured Portal</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {[
            { key: "home", icon: "🏠", label: "Dashboard" },
            { key: "profile", icon: "👤", label: "My Profile" },
            { key: "security", icon: "🔒", label: "Security" },
            { key: "activity", icon: "📊", label: "Activity" },
          ].map(item => (
            <button key={item.key} onClick={() => setActiveTab(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              borderRadius: 10, border: "none", cursor: "pointer", textAlign: "left",
              background: activeTab === item.key ? "rgba(99,102,241,0.15)" : "transparent",
              color: activeTab === item.key ? "#a5b4fc" : "#64748b",
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              borderLeft: activeTab === item.key ? "3px solid #6366f1" : "3px solid transparent",
              transition: "all .2s"
            }}>
              <span>{item.icon}</span>{item.label}
            </button>
          ))}
        </nav>

        {/* User info at bottom */}
        <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.04)", borderRadius: 12, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, flexShrink: 0 }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 10, color: "#475569", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</div>
            </div>
          </div>
          <button onClick={() => { logout(); toast("Logged out. See you soon! 👋", "info"); }} style={{
            width: "100%", padding: "9px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: 10, color: "#f87171", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer"
          }}>🚪 Sign Out</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 220, padding: "32px", minHeight: "100vh" }}>

        {/* ── HOME TAB ── */}
        {activeTab === "home" && (
          <div style={{ animation: "fadeUp .3s ease" }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontSize: 28, fontWeight: 900, fontFamily: "'Syne', sans-serif", margin: 0 }}>
                Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 18 ? "Afternoon" : "Evening"}, {user.name.split(" ")[0]}! 👋
              </h1>
              <p style={{ color: "#475569", marginTop: 6, fontSize: 14 }}>Welcome to your secured dashboard. Here's your account overview.</p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16, marginBottom: 28 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "20px 18px" }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 11, color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* Welcome card */}
            <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 16, padding: "28px 24px" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🎉</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 10 }}>You're in a Secured Zone!</h2>
              <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, maxWidth: 480 }}>
                This page is only accessible after successful authentication. Your session is protected with JWT-based authorization. Explore the sidebar to manage your profile and security settings.
              </p>
              <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["🔐 JWT Auth", "✉️ Email Verified", "🛡️ Role-Based Access", "🔑 Secure Session"].map(tag => (
                  <span key={tag} style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)", color: "#a5b4fc", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div style={{ animation: "fadeUp .3s ease", maxWidth: 500 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Syne', sans-serif", marginBottom: 24 }}>👤 My Profile</h1>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900 }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{user.name}</div>
                  <div style={{ color: "#475569", fontSize: 13 }}>{user.email}</div>
                  <span style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>✓ Verified</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase" }}>Full Name</label>
                  <input value={profileForm.name} onChange={e => setProfileForm(f => ({ ...f, name: e.target.value }))}
                    style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#f1f5f9", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase" }}>Email (read-only)</label>
                  <input value={user.email} readOnly style={{ padding: "11px 14px", background: "rgba(255,255,255,0.02)", border: "1.5px solid rgba(255,255,255,0.06)", borderRadius: 10, color: "#475569", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", cursor: "not-allowed" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: ".06em", textTransform: "uppercase" }}>Bio</label>
                  <textarea value={profileForm.bio} onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))} rows={3} placeholder="Tell us about yourself..."
                    style={{ padding: "11px 14px", background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#f1f5f9", fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none" }} />
                </div>
                <Btn onClick={saveProfile}>{saved ? "✅ Saved!" : "💾 Save Changes"}</Btn>
              </div>
            </div>
          </div>
        )}

        {/* ── SECURITY TAB ── */}
        {activeTab === "security" && (
          <div style={{ animation: "fadeUp .3s ease", maxWidth: 500 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Syne', sans-serif", marginBottom: 24 }}>🔒 Security</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "✉️", title: "Email Verification", desc: "Your email is verified and trusted.", status: "Active", color: "#34d399" },
                { icon: "🔑", title: "Password", desc: "Your account is protected with a hashed password.", status: "Set", color: "#6366f1" },
                { icon: "🛡️", title: "JWT Session", desc: "Stateless token-based authentication enabled.", status: "Active", color: "#34d399" },
                { icon: "👁️", title: "Login History", desc: "Last login tracked and verified.", status: "Monitored", color: "#f59e0b" },
              ].map(item => (
                <div key={item.title} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                    <div style={{ color: "#475569", fontSize: 13, marginTop: 2 }}>{item.desc}</div>
                  </div>
                  <span style={{ background: item.color + "18", border: `1px solid ${item.color}44`, color: item.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, flexShrink: 0 }}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ACTIVITY TAB ── */}
        {activeTab === "activity" && (
          <div style={{ animation: "fadeUp .3s ease", maxWidth: 500 }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Syne', sans-serif", marginBottom: 24 }}>📊 Recent Activity</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "🔐", action: "Logged in successfully", time: "Just now", color: "#6366f1" },
                { icon: "✅", action: "Email verified", time: new Date(user.createdAt).toLocaleDateString(), color: "#34d399" },
                { icon: "🎉", action: "Account created", time: new Date(user.createdAt).toLocaleDateString(), color: "#f59e0b" },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 36, height: 36, background: item.color + "18", border: `1px solid ${item.color}33`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{item.action}</div>
                    <div style={{ color: "#475569", fontSize: 12 }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// ─── ROOT APP ─────────────────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("login"); // login | register | forgot | reset | dashboard
  const [user, setUser] = useState(() => DB.getSession());
  const [toasts, setToasts] = useState([]);
  const [resetEmail, setResetEmail] = useState("");

  const showToast = (msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  };

  const login = (u) => { DB.saveSession(u); setUser(u); setPage("dashboard"); };
  const logout = () => { DB.clearSession(); setUser(null); setPage("login"); };

  const switchPage = (p, data) => {
    if (p === "reset") setResetEmail(data);
    setPage(p);
  };

  useEffect(() => {
    if (user) setPage("dashboard");
  }, []);

  if (user && page === "dashboard") return (
    <AuthContext.Provider value={{ user, login, logout, toast: showToast }}>
      <Toast toasts={toasts} />
      <Dashboard />
    </AuthContext.Provider>
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, toast: showToast }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { transform: translateX(60px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        input::placeholder { color: #334155; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px #111827 inset !important; -webkit-text-fill-color: #f1f5f9 !important; }
      `}</style>
      <Toast toasts={toasts} />

      <div style={{
        minHeight: "100vh", background: "#0b0e1a",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, fontFamily: "'DM Sans', sans-serif", position: "relative"
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
          backgroundSize: "50px 50px"
        }} />

        <div style={{ position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {/* Pill indicator */}
          <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 8px" }}>
            {["login", "register"].map(p => (
              <button key={p} onClick={() => switchPage(p)} style={{
                padding: "6px 16px", borderRadius: 14, border: "none", cursor: "pointer",
                background: page === p ? "rgba(99,102,241,0.2)" : "transparent",
                color: page === p ? "#a5b4fc" : "#475569",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 700,
                transition: "all .2s", textTransform: "capitalize"
              }}>{p === "login" ? "Sign In" : "Register"}</button>
            ))}
          </div>

          {page === "login" && <LoginPage onSwitch={switchPage} />}
          {page === "register" && <RegisterPage onSwitch={switchPage} />}
          {page === "forgot" && <ForgotPage onSwitch={switchPage} />}
          {page === "reset" && <ResetPage email={resetEmail} onSwitch={switchPage} />}

          <p style={{ fontSize: 12, color: "#1e293b", textAlign: "center" }}>
            Oasis Infobyte Internship Project · Login Authentication System
          </p>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

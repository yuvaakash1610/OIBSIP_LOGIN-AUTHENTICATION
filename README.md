# OIBSIP_LOGIN-AUTHENTICATION


<div align="center">

```
 ██╗      ██████╗  ██████╗ ██╗███╗   ██╗    █████╗ ██╗   ██╗████████╗██╗  ██╗
 ██║     ██╔═══██╗██╔════╝ ██║████╗  ██║   ██╔══██╗██║   ██║╚══██╔══╝██║  ██║
 ██║     ██║   ██║██║  ███╗██║██╔██╗ ██║   ███████║██║   ██║   ██║   ███████║
 ██║     ██║   ██║██║   ██║██║██║╚██╗██║   ██╔══██║██║   ██║   ██║   ██╔══██║
 ███████╗╚██████╔╝╚██████╔╝██║██║ ╚████║   ██║  ██║╚██████╔╝   ██║   ██║  ██║
 ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝  ╚═╝ ╚═════╝    ╚═╝   ╚═╝  ╚═╝
```

### 🔐 Register · Login · Verify · Access · Secure

<br/>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![JWT](https://img.shields.io/badge/JWT-Auth-FB015B?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

> A **production-ready Login Authentication System** built as part of the  
> **Oasis Infobyte Web Development Internship**.  
> Features complete Register, Login, Email Verification, Forgot/Reset Password,  
> and a Role-Based Secured Dashboard — all wrapped in a sleek dark UI.

<br/>

[✨ Features](#-features) · [🛠 Tech Stack](#-tech-stack) · [📁 Structure](#-project-structure) · [⚙️ Setup](#️-installation--setup) · [🔐 Auth Flow](#-authentication-flow) · [📡 API Docs](#-api-reference) · [📸 Screenshots](#-screenshots)

</div>

---

## ✨ Features

### 🔓 Authentication Pages

| Page | What It Does |
|------|-------------|
| 📝 **Register** | Name, email, password with live strength meter, duplicate email check |
| 🔐 **Login** | Credential validation, unverified account warning, error handling |
| ✉️ **Email Verification** | Token-based verification link sent on registration |
| 🔑 **Forgot Password** | Email lookup + secure reset link generation |
| 🔄 **Reset Password** | New password with strength meter, token validation |

### 🛡️ Secured Dashboard (Post-Login)

| Tab | Features |
|-----|---------|
| 🏠 **Home** | Personalized greeting, account stats, security badges |
| 👤 **Profile** | Edit name & bio, avatar initials, read-only email |
| 🔒 **Security** | JWT status, email verification, password & session info cards |
| 📊 **Activity** | Login history, account creation, verification timeline |

### ⚙️ System Features

- ✅ JWT-based stateless session management
- ✅ Password hashing with bcrypt
- ✅ Email verification with expiring tokens
- ✅ Role-based access control (User / Admin)
- ✅ Live password strength meter (Weak → Fair → Good → Strong)
- ✅ Real-time field-level form validation
- ✅ Persistent sessions with localStorage / cookies
- ✅ Toast notification system
- ✅ Fully responsive layout
- ✅ Smooth page transition animations

---

## 🛠 Tech Stack

```
┌──────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│   React 18  ·  React Context API  ·  React Router v6        │
│   DM Sans & Syne (Google Fonts)  ·  CSS-in-JS               │
├──────────────────────────────────────────────────────────────┤
│                         BACKEND                              │
│   Node.js  ·  Express.js  ·  Nodemailer                     │
├──────────────────────────────────────────────────────────────┤
│                        DATABASE                              │
│   MongoDB  ·  Mongoose ODM                                   │
├──────────────────────────────────────────────────────────────┤
│                    AUTHENTICATION                            │
│   JSON Web Tokens (JWT)  ·  Bcrypt  ·  Crypto (tokens)      │
├──────────────────────────────────────────────────────────────┤
│                     DEMO / MOCK                              │
│   localStorage  ·  btoa() encoding  (replace in production) │
└──────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
login-auth-system/
│
├── 📂 client/                            # React Frontend
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/
│   │   │   │   ├── LoginPage.jsx         # Sign-in form with validation
│   │   │   │   ├── RegisterPage.jsx      # Registration + strength meter
│   │   │   │   ├── ForgotPassword.jsx    # Email reset request
│   │   │   │   ├── ResetPassword.jsx     # New password form
│   │   │   │   └── VerifyEmail.jsx       # Email verification handler
│   │   │   ├── 📂 dashboard/
│   │   │   │   ├── Dashboard.jsx         # Secured dashboard layout
│   │   │   │   ├── HomeTab.jsx           # Account overview
│   │   │   │   ├── ProfileTab.jsx        # Edit profile
│   │   │   │   ├── SecurityTab.jsx       # Security settings
│   │   │   │   └── ActivityTab.jsx       # Login history
│   │   │   └── 📂 ui/
│   │   │       ├── Input.jsx             # Reusable input field
│   │   │       ├── Button.jsx            # Primary / Ghost / Danger buttons
│   │   │       ├── Toast.jsx             # Notification system
│   │   │       ├── Card.jsx              # Auth card wrapper
│   │   │       └── StrengthMeter.jsx     # Password strength indicator
│   │   ├── 📂 context/
│   │   │   └── AuthContext.jsx           # Global auth state
│   │   ├── 📂 hooks/
│   │   │   └── useAuth.js                # Auth context consumer hook
│   │   ├── 📂 utils/
│   │   │   ├── validators.js             # Email, password, name validators
│   │   │   └── storage.js               # localStorage DB helper
│   │   ├── App.jsx                       # Root with routing
│   │   └── main.jsx
│   └── package.json
│
├── 📂 server/                            # Node.js Backend
│   ├── 📂 config/
│   │   ├── db.js                         # MongoDB connection
│   │   └── nodemailer.js                 # Email transporter setup
│   ├── 📂 controllers/
│   │   └── authController.js             # All auth business logic
│   ├── 📂 middleware/
│   │   ├── authMiddleware.js             # JWT verification
│   │   └── adminMiddleware.js            # Role guard (admin only)
│   ├── 📂 models/
│   │   └── User.js                       # Mongoose user schema
│   ├── 📂 routes/
│   │   └── authRoutes.js                 # All /api/auth/* routes
│   ├── 📂 utils/
│   │   ├── generateToken.js              # JWT creation helper
│   │   ├── sendEmail.js                  # Nodemailer send wrapper
│   │   └── emailTemplates.js             # HTML email templates
│   └── server.js                         # Express entry point
│
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

```bash
node -v    # v18 or higher
npm -v     # v9 or higher
mongod     # MongoDB running locally or Atlas URI ready
```

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/login-auth-system.git
cd login-auth-system
```

### 2️⃣ Install Dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 3️⃣ Configure Environment Variables

```bash
cd server
cp .env.example .env
# Fill in your values (see below)
```

### 4️⃣ Run the App

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

> 🟢 **Backend:** http://localhost:5000  
> 🔵 **Frontend:** http://localhost:5173

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` folder:

```env
# ── Server ──────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB ─────────────────────────────────────────
MONGO_URI=mongodb://localhost:27017/loginauth
# Atlas: mongodb+srv://<user>:<pass>@cluster.mongodb.net/loginauth

# ── JWT ─────────────────────────────────────────────
JWT_SECRET=your_super_secure_jwt_secret_key
JWT_EXPIRE=7d

# ── Email Verification & Reset ───────────────────────
EMAIL_VERIFY_EXPIRE=24h      # Verification link expiry
EMAIL_RESET_EXPIRE=15m       # Reset link expiry (15 minutes)

# ── Nodemailer (Gmail SMTP) ──────────────────────────
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password   # Use App Password, not your real password

# ── Client URL (for email links) ────────────────────
CLIENT_URL=http://localhost:5173
```

> ⚠️ `.env` is in `.gitignore` — never commit it to GitHub!

---

## 🔐 Authentication Flow

### 📝 Registration Flow

```
User fills Register form
        │
        ▼
Validate inputs (name, email, password strength)
        │
  ┌─────┴─────┐
  │ Email      │ Already exists?
  │ already    ├──────────────── → Show "Email already registered" error
  │ used?      │
  └─────┬─────┘
        │ New email
        ▼
Hash password (bcrypt, 10 rounds)
        │
        ▼
Save user to MongoDB (verified: false)
        │
        ▼
Generate email verification token (crypto.randomBytes)
        │
        ▼
Send verification email (Nodemailer)
        │
        ▼
User clicks link → GET /api/auth/verify-email/:token
        │
        ▼
Set verified: true in DB → Redirect to Login ✅
```

### 🔑 Login Flow

```
User enters email + password
        │
        ▼
Find user in MongoDB by email
        │
  ┌─────┴──────┐
  │ User not   │ → "Invalid credentials" error
  │ found?     │
  └─────┬──────┘
        │
  ┌─────┴──────┐
  │ Not        │ → "Please verify your email first"
  │ verified?  │
  └─────┬──────┘
        │
bcrypt.compare(password, hash)
        │
  ┌─────┴──────┐
  │ Wrong      │ → "Invalid credentials" error
  │ password?  │
  └─────┬──────┘
        │
Generate JWT (payload: id, role, email)
        │
        ▼
Return token → Store in localStorage / httpOnly cookie
        │
        ▼
Redirect to Secured Dashboard 🎉
```

### 🔄 Forgot Password Flow

```
User enters email
        │
        ▼
Find user in DB
        │
Generate crypto reset token (hashed, stored in DB)
        │
Set resetTokenExpiry = Date.now() + 15 minutes
        │
Send reset email with link: /reset-password/:token
        │
User clicks link (within 15 mins)
        │
        ▼
Validate token + expiry
        │
User enters new password
        │
bcrypt.hash new password → Save to DB
        │
Clear resetToken + expiry from DB
        │
        ▼
Redirect to Login ✅
```

---

## 📡 API Reference

Base URL: `http://localhost:5000/api/auth`

### Public Routes

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | `{ name, email, password }` | Register new user |
| `POST` | `/login` | `{ email, password }` | Login & receive JWT |
| `GET` | `/verify-email/:token` | — | Verify email address |
| `POST` | `/forgot-password` | `{ email }` | Send password reset email |
| `POST` | `/reset-password/:token` | `{ password }` | Set new password |

### Protected Routes (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/me` | Get current logged-in user |
| `PUT` | `/update-profile` | Update name & bio |
| `DELETE` | `/delete-account` | Delete user account |

### Request & Response Examples

**Register**
```json
// POST /api/auth/register
// Request
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Secret@123"
}

// Response 201
{
  "success": true,
  "message": "Verification email sent to jane@example.com"
}
```

**Login**
```json
// POST /api/auth/login
// Request
{
  "email": "jane@example.com",
  "password": "Secret@123"
}

// Response 200
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "user",
    "verified": true
  }
}
```

**Protected Route Usage**
```js
// Add Authorization header to all protected requests
fetch('/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
```

---

## 🗄️ MongoDB Schema

```js
// User Model — /server/models/User.js

const UserSchema = new mongoose.Schema({
  name:              { type: String, required: true, trim: true },
  email:             { type: String, required: true, unique: true, lowercase: true },
  password:          { type: String, required: true },          // bcrypt hashed
  role:              { type: String, enum: ['user','admin'], default: 'user' },
  verified:          { type: Boolean, default: false },
  bio:               { type: String, default: '' },

  verifyToken:       { type: String },                          // email verify
  resetToken:        { type: String },                          // password reset
  resetTokenExpiry:  { type: Date },                            // 15-min expiry
}, { timestamps: true });
```

---

## 🔒 Security Best Practices Used

```
✅ Passwords never stored in plain text — bcrypt with 10 salt rounds
✅ JWT tokens signed with a secret key, expire in 7 days
✅ Reset tokens are crypto.randomBytes(32) — not guessable
✅ Reset tokens expire in 15 minutes
✅ Email enumeration prevented — generic error on invalid credentials
✅ Input validation on both client and server sides
✅ .env secrets never committed to version control
✅ MongoDB injection prevented via Mongoose strict schemas
```

---

## 🔑 Password Strength Rules

The live strength meter checks 4 criteria in real-time:

| Level | Criteria Met | Color |
|-------|-------------|-------|
| 🔴 **Weak** | 1 of 4 | Red |
| 🟡 **Fair** | 2 of 4 | Amber |
| 🟢 **Good** | 3 of 4 | Green |
| 🔵 **Strong** | All 4 | Indigo |

**The 4 criteria:**
- At least **6 characters** long
- Contains an **uppercase** letter (A–Z)
- Contains a **number** (0–9)
- Contains a **special character** (!@#$%...)

---

## 📸 Screenshots

| Login Page | Register Page | Forgot Password |


<img width="476" height="843" alt="image" src="https://github.com/user-attachments/assets/5d2cc0fd-dadf-460e-97ce-28bd3da14cad" />

<img width="419" height="712" alt="image" src="https://github.com/user-attachments/assets/41eb80ec-ac8e-4792-9ba3-109cb8327e1b" />

<img width="440" height="605" alt="image" src="https://github.com/user-attachments/assets/b9a3959a-de3c-49d1-9ef6-67159211a519" />






---

## 🧪 Test Credentials (Demo Mode)

> In the demo (frontend-only mode with localStorage), use these steps:

```
1. Go to Register tab
2. Enter any name, email, and password (min. 6 chars)
3. Click "Simulate Email Verification" button
4. You'll be redirected to Login
5. Sign in with the same email & password
6. You're in the Secured Dashboard! 🎉
```

---

## 🚀 Deployment

### Frontend → Vercel

```bash
cd client
npm run build

# In Vercel dashboard:
# Build Command : npm run build
# Output Dir    : dist
# Env Variable  : VITE_API_URL = https://your-backend.railway.app
```

### Backend → Railway / Render

```bash
# Set all .env variables in your hosting dashboard
# Start Command: node server.js
```

---

## 🤝 Contributing

```bash
# 1. Fork this repo
# 2. Create a feature branch
git checkout -b feature/your-feature

# 3. Commit with convention
git commit -m "feat: add remember me functionality"

# 4. Push and open a PR
git push origin feature/your-feature
```

**Commit Convention:**

| Prefix | Use For |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `style:` | UI/CSS changes |
| `refactor:` | Code restructuring |
| `docs:` | Documentation update |

---

## 📄 License

```
MIT License — free to use, modify, and distribute.
See the LICENSE file for full details.
```

---

<div align="center">

**Built with 🔐 and ☕ for the Oasis Infobyte Internship**

<br/>

*If this helped you, please drop a ⭐ — it genuinely means a lot!*

<br/>

https://github.com/yuvaakash1610
[![Twitter Follow](https://img.shields.io/twitter/follow/yourusername?style=social)](https://twitter.com/yourusername)

</div>

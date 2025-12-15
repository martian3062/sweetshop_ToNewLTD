🍬 Sweet Shop Inventory & Analytics System

A full-stack Sweet Shop Inventory Management System built using React (Vite) for the frontend and Django REST Framework for the backend, featuring JWT authentication, inventory tracking, and analytics dashboards.

🚀 Tech Stack
Frontend

⚛️ React (JSX)

⚡ Vite

🎨 Tailwind CSS + Custom CSS

📊 Recharts

🔐 JWT Authentication

🌩️ Visual Effects (Lightning & StormCloud – TSX components)

Backend

🐍 Django

🧠 Django REST Framework

🔑 SimpleJWT

🗄️ SQLite / PostgreSQL

✨ Features
🔐 Authentication

User Signup

User Login

JWT Access & Refresh Tokens

Protected Routes

📦 Inventory

Add / Edit / Delete sweets

Purchase sweets

Category-based filtering

📊 Analytics

Stock by sweet (Bar Chart)

Category distribution (Pie Chart)

Click category → filter inventory

🌩️ UI Enhancements

Animated StormCloud

Lightning visual effect

Glassmorphism login cards

Responsive layout

📁 Project Structure
frontend/
├── src/
│   ├── api/
│   │   └── axios.js
│   ├── components/
│   │   ├── Lightning.tsx
│   │   ├── StormCloud.tsx
│   │   └── common/
│   │       └── PrivateRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── InventoryPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   └── SearchPage.jsx
│   ├── styles/
│   │   └── login.css
│   ├── utils.ts
│   ├── App.jsx
│   └── main.jsx
└── package.json

🔑 Backend API Endpoints


Authentication APIs
Method	Endpoint	Description
POST	/auth/register/	Register a new user
POST	/auth/login/	Login and receive JWT tokens
POST	/auth/refresh/	Refresh access token
Inventory APIs
Method	Endpoint	Description
GET	/sweets/	Fetch all sweets
POST	/sweets/	Create a sweet
POST	/sweets/{id}/purchase/	Purchase sweet
Analytics APIs
Method	Endpoint	Description
GET	/analytics/forecast/	Demand forecasting
⚙️ Setup Instructions
1️⃣ Backend (Django)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

2️⃣ Frontend (React + Vite)
cd frontend
npm install
npm run dev



🔐 Authentication Flow
Step	Action
1	User logs in
2	Backend returns access & refresh tokens
3	Tokens stored in localStorage
4	Axios attaches token automatically
5	Protected routes verified
⚠️ Important Notes
Rule	Details
JSX files	❌ No TypeScript syntax
TSX components	✅ Can be imported into JSX
Alias error	Replace @/lib/utils → ../utils
JWT issues	Check tokens in localStorage
🧪 Common Errors & Fixes
Error	Solution
JSX TypeScript error	Remove type annotations
Login not redirecting	Check navigate("/")
StormCloud not rendering	Fix relative import
Navbar on login page	Hide via route check

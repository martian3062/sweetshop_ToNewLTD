Sweet Shop Inventory System

A full-stack Sweet Shop Inventory & Analytics System built with React (Vite) on the frontend and Django REST Framework on the backend, featuring JWT authentication, inventory management, and analytics dashboards.

🚀 Tech Stack
Frontend

⚛️ React (JSX)

⚡ Vite

🎨 Tailwind CSS + custom CSS

📊 Recharts (Analytics)

🔐 JWT Authentication

🌩️ Visual Effects (Lightning, StormCloud – TSX components)

Backend

🐍 Django

🧠 Django REST Framework

🔑 SimpleJWT (Access & Refresh Tokens)

🗄️ SQLite / PostgreSQL (configurable)

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

Stock by sweet (Bar chart)

Category distribution (Pie chart)

Click analytics → filter inventory

🌩️ UI Enhancements

Animated StormCloud

Lightning visual effect

Glassmorphism login cards

Mobile-friendly layout

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

Base URL:

http://127.0.0.1:8000/api/

Auth
Method	Endpoint	Description
POST	/auth/register/	Register user
POST	/auth/login/	Login (JWT)
POST	/auth/refresh/	Refresh token
Inventory
Method	Endpoint
GET	/sweets/
POST	/sweets/
POST	/sweets/{id}/purchase/
Analytics

| GET | /analytics/forecast/ |

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


Open:

http://localhost:5173

🔐 Authentication Flow

User logs in

Backend returns:

{
  "access": "JWT_TOKEN",
  "refresh": "JWT_TOKEN"
}


Tokens stored in localStorage

Axios attaches token automatically

Protected routes verified via PrivateRoute

⚠️ Important Notes

JSX files must not contain TypeScript syntax

TSX components (Lightning, StormCloud) can be imported into JSX safely

If you see:

Failed to resolve import "@/lib/utils"


→ replace with:

import { cn } from "../utils";

🧪 Common Errors & Fixes
Error	Fix
JSX TypeScript error	Remove type annotations
JWT not working	Check token in localStorage
StormCloud not rendering	Fix relative import
Navbar visible on login	Hide via route check

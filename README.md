# SnapNest — Social Media Frontend

A modern, Vite + React frontend for a social media app (SnapNest). This repository contains the client-side application that provides user authentication (including Google OAuth), post creation, comments, likes, profile management, and file uploads. It uses a REST backend (separate service) for data and auth.

---

## 🔧 Tech Stack

- **Framework:** React 19 + Vite
- **State management:** Redux Toolkit
- **HTTP client:** Axios
- **Routing:** React Router DOM
- **Styling:** Plain CSS (project-local styles)
- **Other packages:** react-icons, react-toastify, react-modal, react-spinners, react-content-loader

---

## 🚀 Quick Start

1. Clone the repo

   ```bash
   git clone <repo-url>
   cd SanpNest-Frontend
   ```

2. Install dependencies

   ```bash
   npm install
   # or use pnpm / yarn if you prefer
   ```

3. Create a local env file

   Create a `.env` or `.env.local` file at the project root and add the backend URL:

   ```ini
   VITE_SERVER_URL=http://localhost:5000
   ```

   Note: The frontend app appends `/api` to `VITE_SERVER_URL`, so the backend should expose routes under `/api`.

4. Run the dev server

   ```bash
   npm run dev
   ```

5. Open the app

   Visit `http://localhost:5173` (or the port Vite reports) in your browser.

---

## 🧩 Available Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run view` — preview the production build locally
- `npm run lint` — run ESLint
- `npm run lint:fix` — run ESLint and attempt to fix issues
- `npm run format` — run Prettier to format code

---

## ⚙️ Environment Variables

- **VITE_SERVER_URL** — Base URL for backend (e.g., `http://localhost:5000`). The client uses `VITE_SERVER_URL` + `/api` for API requests.

Add other env vars here if your backend or OAuth needs them (for example Google OAuth client IDs handled by the backend).

---

## 📁 Project Structure (key files)

- `src/`
  - `assets/` — static images and assets
  - `axios/instance.js` — Axios setup and interceptors (uses `VITE_SERVER_URL`)
  - `components/` — React components (Navbar, PostCard, CommentSection, etc.)
  - `pages/` — Page views (`Home`, `Login`, `SignUp`, `Profile`, `CreatePost`, `ViewPost`)
  - `service/` — API service helpers and `endpoints.js`
  - `toolkit/` — Redux slices and store
  - `hoc/WithAuth.jsx` — authentication wrapper for protected routes
  - `shimmer/` — skeleton loaders
  - `styles/` — CSS modules / app styles

---

## 🔗 Backend API

This client depends on a REST backend. The API endpoints are defined in `src/service/endpoints.js` and expect routes like `/auth/*`, `/post/*`, `/comment/*`, and `/user/*` under the `/api` prefix.

If you run the backend locally, set `VITE_SERVER_URL` to the backend host (example: `http://localhost:5000`).

---

## ✅ Features

- Email/password authentication
- Google OAuth sign in flow (frontend cooperates with backend OAuth endpoints)
- Create, edit, delete posts
- Upload files for posts
- Like/unlike posts and view counts
- Commenting system per post
- Profile pages and user info updates

---

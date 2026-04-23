# Todo App (React Native + Node/Express)

A full-stack Todo app with **React Native (Expo)** frontend and a **Node/Express + MongoDB** backend. Includes basic **auth (register/login)** and a Todo list with **priority, category, and deadline**.

## Features

- **Authentication**: Register + Login (JWT returned by backend)
- **Todos**: List, add, delete
- **Task metadata**: priority, category, deadline
- **UI**: Bottom tabs (Home + Tasks), category cards, modal create-task flow

## Tech Stack

- **Frontend**: React Native (Expo), TypeScript, React Navigation, Zustand, `tailwind-react-native-classnames`
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, CORS, dotenv

## Repo Structure

- `frontend/` — Expo app
- `backend/` — Express API server

## Getting Started (Local)

### 1) Backend

From `backend/`:

```bash
npm install
```

Create `backend/.env`:

```bash
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
JWT_SECRET=change-me
PORT=5000
```

Run in dev:

```bash
npm run dev
```

If you prefer production mode:

```bash
npm run build
npm start
```

### 2) Frontend

From `frontend/`:

```bash
npm install
npx expo start
```

Then run on:
- **Expo Go** (scan QR)
- **Android Emulator / iOS Simulator**
- **Web** via `npm run web`

## API Base URL (important)

The frontend currently calls a deployed backend URL (Railway) via hardcoded constants:

- `frontend/src/api/auth.api.ts`
- `frontend/src/api/todo.api.ts`

To use your **local backend**, change the base URLs to:

- Auth: `http://<YOUR_IP>:5000/auth/api`
- Todo: `http://<YOUR_IP>:5000/todo`

Notes:
- If testing on a physical phone, `localhost` won’t work—use your machine’s LAN IP (e.g. `192.168.1.10`).
- If using Android emulator, you can typically use `http://10.0.2.2:5000`.

## Backend Endpoints

Base paths:
- **Auth**: `/auth/api`
- **Todos**: `/todo`

Auth:
- `POST /auth/api/register` — `{ name, email, password, retypePassword }`
- `POST /auth/api/login` — `{ email, password }`

Todos:
- `GET /todo/list`
- `POST /todo/add` — `{ title, description, priority, category, deadline }`
- `DELETE /todo/delete/:id`

## Known Limitations / Notes

- **Password storage**: passwords are stored/compared as plain text in the current backend model (no hashing).
- **Todo completion**: completion is toggled in the app state; there’s currently no backend endpoint to persist completion updates.

## Scripts

### Frontend (`frontend/package.json`)
- `npm run start` — start Expo dev server
- `npm run android` — run Android build
- `npm run ios` — run iOS build
- `npm run web` — run for web

### Backend (`backend/package.json`)
- `npm run dev` — dev server (ts-node + nodemon)
- `npm run build` — compile TypeScript
- `npm run start` — run compiled server


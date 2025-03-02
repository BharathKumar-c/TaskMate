# TaskMate

TaskMate is a full-stack task management application with authentication, built using **React Native (Expo), Node.js, Express, and MongoDB**.

## Features

- User authentication (JWT-based Signup/Login)
- Task management (Create, Read, Update, Delete)
- Protected routes using JWT middleware
- MongoDB as the database
- Pull-to-refresh functionality
- Deployed on Render (Backend) and Expo (Frontend)

## Tech Stack

### Frontend

- **Framework:** React Native (Expo)
- **Navigation:** Expo Router
- **UI Components:** React Native Paper
- **Storage:** AsyncStorage for JWT tokens
- **State Management:** React Hooks

### Backend

- **Server:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Deployment:** Render

## Installation Guide

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Atlas)
- **Expo CLI**
- **Git**

### Steps to Run Locally

#### **1. Clone the repository**

```sh
git clone https://github.com/BharathKumar-c/TaskMate.git
cd TaskMate
```

#### **2. Setup Backend**

```sh
cd backend
npm install
```

Create a `.env` file inside `backend/` and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend server:

```sh
npm start
```

OR with nodemon (for development):

```sh
npm run dev
```

#### **3. Setup Frontend**

```sh
cd ..
cd frontend
npm install
```

Run the Expo development server:

```sh
npx expo start
```

Scan the QR code using **Expo Go** on your mobile device.

## API Endpoints

### Authentication

| Method | Endpoint       | Description                   |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/signup` | Register a new user           |
| POST   | `/auth/login`  | Authenticate user and get JWT |
| POST   | `/auth/logout` | Logout and invalidate token   |

### Tasks (Protected Routes)

| Method | Endpoint     | Description            |
| ------ | ------------ | ---------------------- |
| POST   | `/tasks`     | Create a new task      |
| GET    | `/tasks`     | Get all tasks for user |
| GET    | `/tasks/:id` | Get task by ID         |
| PUT    | `/tasks/:id` | Update task by ID      |
| DELETE | `/tasks/:id` | Delete task by ID      |

## Deployment

- **Backend:** Deployed on **Render** [TaskMate Backend](https://task-mate-backend-x42q.onrender.com)
- **Frontend:** Build an Expo APK: [Download TaskMate APK](https://expo.dev/accounts/barathtechbumbles/projects/taskmate/builds/aa472545-35e3-4d03-8020-7215b7aaf4ec)

```sh
eas build --profile preview --platform android
```

(Replace with your Expo build link once completed.)

## 🧑‍💻 Demo Credentials

Use the following credentials to log in and test the application:

```json
  "email": "admin@tm.com",
  "password": "admin123"
```

## License

This project is open-source and available under the MIT License.

---

### Author

Developed by **BharathKumar** 🚀

# TaskMate

## Backend

TaskMate is a full-stack task management application with authentication, built using **Node.js, Express, and MongoDB**. This is the backend repository that provides authentication and task management APIs.

## Features

- User authentication (JWT-based Signup/Login)
- Task management (Create, Read, Update, Delete)
- Protected routes using JWT middleware
- MongoDB as the database
- Deployed on Render

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, bcrypt.js
- **Deployment:** Render

## Installation

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16+ recommended)
- **MongoDB** (Local or Atlas)
- **Git**

### Steps to Run Locally

1. **Clone the repository:**

   ```sh
   git clone https://github.com/your-username/taskmate-backend.git
   cd taskmate-backend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory and add:**

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run the server:**
   ```sh
   npm start
   ```
   OR with nodemon (for development):
   ```sh
   npm run dev
   ```

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

This backend is deployed on **Render**. The base URL for the API:

```
https://taskmate-backend.onrender.com
```

## License

This project is open-source and available under the MIT License.

---

### Author

Developed by **BharathKumar** 🚀

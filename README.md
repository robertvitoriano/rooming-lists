## ✨ Prerequisites

Before running the application, ensure that you have one of the following setups available on your machine:

* **Option 1: Native Setup**

  * **Node.js** (version 18 or higher)
  * **npm** (comes with Node.js)

* **Option 2: Docker Setup**

  * If Node.js/npm are not installed, ensure **Docker** is installed and running.

---

## 🚀 Running the Application with Docker

To run the entire application using Docker (backend + PostgreSQL + frontend), navigate to the project root and execute:

```bash
docker compose up
```

✅ No additional configuration is required — Docker will automatically handle all dependencies and services.

---

## 💻 Running the Application Locally (without Docker)

### 1. Installation

Inside both the `frontend/` and `backend/` directories, install dependencies:

```bash
npm install
```

---

### 2. Environment Configuration

Ensure that both the frontend and backend projects have a `.env` file in their root directories.

#### 🖼️ Frontend `.env` example:

```env
VITE_API_URL="http://localhost:3000"
VITE_API_TOKEN="your-development-jwt-token"
```

#### 🛠️ Backend `.env` example:

```env
POSTGRES_USER="myuser"
POSTGRES_PASSWORD="mypassword"
POSTGRES_DB="mydatabase"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432
JWT_SECRET="your-jwt-secret"
JWT_PAYLOAD="your-jwt-payload"
PORT=3000
```

> ⚠️ Update these values to match your local PostgreSQL setup.

---

### 3. Starting the Applications

**Start the backend (from the `backend/` folder):**

```bash
npm run start:dev
```

**Start the frontend (from the `frontend/` folder):**

```bash
npm run dev
```

---

## 🥪 Hybrid Mode (PostgreSQL in Docker + Apps on Localhost)

You can choose to run only PostgreSQL via Docker and the applications via Node.js on your local machine.

### Step-by-step:

1. Start the PostgreSQL container (inside `backend/`):

   ```bash
   docker compose up
   ```

2. Start the backend service locally (still inside `backend/`):

   ```bash
   npm run start:dev
   ```

3. Start the frontend service locally (inside `frontend/`):

   ```bash
   npm run dev
   ```

> ✅ This is useful for faster iteration without rebuilding Docker containers while still using a managed PostgreSQL instance.

---

## ✅ Running Tests

The backend project includes a test suite using Jest.

To run all tests, navigate to the `backend/` directory and execute:

```bash
npm run test
```

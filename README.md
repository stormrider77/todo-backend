# Todo Backend - Authentication API

A Node.js backend with Express, Prisma, and PostgreSQL for user authentication.

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/todo_db?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"
PORT=4000
```

**Important:** Replace the `DATABASE_URL` with your actual PostgreSQL connection string:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your database host and port
- `todo_db`: Your database name

### 3. Set Up Database

Run Prisma migrations to create the database tables:

```bash
npx prisma migrate dev --name add_user_model
```

This will:
- Create the User and Todo tables in your database
- Generate the Prisma client

### 4. (Optional) View Database with Prisma Studio

```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` to view and edit your database.

## Running the Server

### Development Mode (with hot reload)

```bash
npm run dev
```

The server will start on `http://localhost:4000` (or the PORT specified in your `.env` file).

### Production Mode

First, build the TypeScript code:

```bash
npm run build
```

Then start the server:

```bash
npm start
```

## API Endpoints

### Authentication

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"  // optional
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Sign In
```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Sign in successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Profile (Protected)
```http
GET /api/auth/profile
Authorization: Bearer <your-token>
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Todos

#### Get All Todos
```http
GET /api/todos
```

#### Create Todo
```http
POST /api/todos
Content-Type: application/json

{
  "title": "My first todo"
}
```

## Testing with cURL

### Sign Up
```bash
curl -X POST http://localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\",\"name\":\"Test User\"}"
```

### Sign In
```bash
curl -X POST http://localhost:4000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Get Profile (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:4000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

### Database Connection Issues
- Make sure PostgreSQL is running
- Verify your `DATABASE_URL` in `.env` is correct
- Check that the database exists (create it if needed: `CREATE DATABASE todo_db;`)

### Port Already in Use
- Change the `PORT` in your `.env` file
- Or stop the process using port 4000

### Prisma Client Not Generated
```bash
npx prisma generate
```

## Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API routes
├── middleware/      # Auth middleware
├── lib/             # Prisma client
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```





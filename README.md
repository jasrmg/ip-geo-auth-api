# IP Geolocation API

Backend API for IP geolocation tracking with user authentication.

## Tech Stack

- Node.js + Express
- SQLite (better-sqlite3)
- JWT Authentication
- bcryptjs for password hashing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Update the values:

```
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this
DB_PATH=./database.sqlite
```

### 3. Validate Environment (Recommended)

Before starting the server, run the validation script to ensure your `.env` is configured correctly:

```bash
npm run validate
```

### 4. Seed Database

```bash
npm run seed
```

Test credentials:

- Email: `test@example.com`
- Password: `password123`

### 5. Run Development Server

```bash
npm run dev
```

API will be available at `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Geolocation

- `GET /api/geo/current` - Get current user's IP geo data
- `POST /api/geo/search` - Search IP address
- `GET /api/geo/history` - Get search history
- `DELETE /api/geo/history/:id` - Delete single history item
- `POST /api/geo/history/delete-multiple` - Delete multiple history items

## Database Schema

### users

- id (INTEGER PRIMARY KEY)
- email (TEXT UNIQUE)
- password (TEXT)
- created_at (DATETIME)

### search_history

- id (INTEGER PRIMARY KEY)
- user_id (INTEGER FK)
- ip_address (TEXT)
- city, region, country, loc, org, postal, timezone (TEXT)
- searched_at (DATETIME)

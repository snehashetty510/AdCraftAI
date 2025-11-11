# AdCraft AI Backend

Backend API for user authentication with JWT.

## Features

- User Signup/Registration
- User Login with JWT authentication
- Password hashing with bcrypt
- MongoDB database integration
- Protected routes with JWT middleware
- Input validation
- Error handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adcraft-ai
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

#### 1. Signup
- **URL**: `POST /api/auth/signup`
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-11-11T..."
  }
}
```

#### 2. Login
- **URL**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "lastLogin": "2025-11-11T..."
  }
}
```

#### 3. Get Current User Profile
- **URL**: `GET /api/auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Success Response** (200):
```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-11-11T...",
    "lastLogin": "2025-11-11T..."
  }
}
```

#### 4. Logout
- **URL**: `POST /api/auth/logout`
- **Success Response** (200):
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## Project Structure

```
backend/
├── controllers/
│   └── authController.js    # Authentication logic
├── middleware/
│   └── auth.js              # JWT verification middleware
├── models/
│   └── User.js              # User model schema
├── routes/
│   └── auth.js              # Authentication routes
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── server.js               # Main server file
└── package.json            # Dependencies
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **dotenv**: Environment variables
- **cors**: Cross-origin resource sharing
- **validator**: Input validation
- **nodemon**: Development server (dev dependency)

## Testing with cURL

### Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Profile (replace YOUR_TOKEN):
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Password field is excluded from queries by default
- Input validation for email format and password length
- Protected routes require valid JWT token
- Role-based access control ready

## Notes

- Make sure to change `JWT_SECRET` in production
- Install and run MongoDB before starting the server
- Default MongoDB connection: `mongodb://localhost:27017/adcraft-ai`
- Server runs on port 5000 by default

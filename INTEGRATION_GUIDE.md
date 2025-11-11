# AdCraft AI - Full Stack Application

Complete authentication integration between React frontend and Node.js backend.

## 🚀 Quick Start

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure `.env` file (already configured):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/adcraft-ai
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start MongoDB (make sure MongoDB is running on your system)

5. Start the backend server:
```bash
npm run dev
```

Backend will run on: http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on: http://localhost:5174 (or the port Vite assigns)

## 🔐 Authentication Features

### What's Integrated:

✅ **Complete Authentication System**
- User signup/registration
- User login with JWT tokens
- Logout functionality
- Protected routes
- User session persistence

✅ **Frontend Components**
- `Auth.jsx` - Beautiful login/signup modal
- `AuthContext.jsx` - Global authentication state
- `authService.js` - API integration service

✅ **Backend API Endpoints**
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get user profile (protected)
- `POST /api/auth/logout` - Logout user

✅ **UI Integration**
- Login/Signup button in header
- User profile display when logged in
- Logout button
- Authentication modal with form validation
- Error handling and loading states

### How It Works:

1. **User clicks "Login / Sign Up"** → Auth modal appears
2. **User enters credentials** → Form validates input
3. **Frontend sends request** → authService.js calls backend API
4. **Backend authenticates** → Returns JWT token + user data
5. **Token stored** → LocalStorage saves token for persistence
6. **User logged in** → Header shows user name and logout button
7. **Protected features** → Token sent with future API requests

## 📁 Project Structure

```
PROJECT/
├── backend/
│   ├── controllers/
│   │   └── authController.js      # Auth logic
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── models/
│   │   └── User.js                # User schema
│   ├── routes/
│   │   └── auth.js                # Auth routes
│   ├── .env                       # Environment variables
│   ├── server.js                  # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Auth.jsx           # Login/Signup modal
    │   ├── context/
    │   │   └── AuthContext.jsx    # Auth state management
    │   ├── services/
    │   │   └── authService.js     # API integration
    │   ├── App.jsx                # Main component
    │   ├── main.jsx               # Entry point
    │   └── index.css
    └── package.json
```

## 🔧 Technologies Used

### Backend:
- Express.js - Web framework
- MongoDB & Mongoose - Database
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- validator - Input validation
- cors - Cross-origin requests
- dotenv - Environment variables

### Frontend:
- React 19 - UI framework
- Vite - Build tool
- Tailwind CSS - Styling
- axios - HTTP client
- lucide-react - Icons
- Context API - State management

## 🎯 Testing the Integration

### 1. Sign Up New User:
- Click "Login / Sign Up" button in header
- Switch to "Sign Up" tab
- Enter name, email, and password
- Click "Sign Up"
- You'll be automatically logged in

### 2. Login Existing User:
- Click "Login / Sign Up" button
- Stay on "Login" tab
- Enter email and password
- Click "Login"

### 3. Check Authentication:
- After login, header shows your name
- Token is stored in browser localStorage
- Refresh page - you stay logged in

### 4. Logout:
- Click "Logout" button
- Token is removed
- Back to logged out state

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT tokens for stateless authentication
- ✅ Token expiration (7 days)
- ✅ Password validation (min 6 characters)
- ✅ Email validation
- ✅ Protected API routes
- ✅ CORS enabled for frontend-backend communication
- ✅ Secure HTTP-only recommended for production

## 📝 API Testing

You can test the backend APIs directly using curl or Postman:

### Signup:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## 🚨 Important Notes

1. **MongoDB Required**: Make sure MongoDB is installed and running
2. **Backend First**: Start backend server before frontend
3. **CORS**: Backend configured to allow requests from frontend
4. **JWT Secret**: Change `JWT_SECRET` in production
5. **Port 5000**: Backend runs on port 5000 by default
6. **LocalStorage**: Tokens stored in browser localStorage

## 🎨 UI Features

- Modern, professional design matching AdCraft AI theme
- Smooth animations and transitions
- Form validation with error messages
- Loading states during API calls
- Responsive modal design
- Toggle between login/signup
- Close button to dismiss modal
- Clean, accessible interface

## 🔄 Workflow

```
User Interaction → Frontend (React)
                       ↓
                 authService.js (axios)
                       ↓
                 Backend API (Express)
                       ↓
                 MongoDB Database
                       ↓
                 JWT Token Generated
                       ↓
                 Response to Frontend
                       ↓
                 Token Stored (localStorage)
                       ↓
                 User State Updated
                       ↓
                 UI Updated (logged in)
```

## ✨ Next Steps (Optional Enhancements)

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Remember me option
- [ ] Social authentication (Google, Facebook)
- [ ] User profile editing
- [ ] Account deletion
- [ ] Session management
- [ ] Refresh token implementation
- [ ] Rate limiting
- [ ] Two-factor authentication (2FA)

Your authentication system is now fully integrated and ready to use! 🎉

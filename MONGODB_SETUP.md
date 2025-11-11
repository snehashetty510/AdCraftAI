# MongoDB Setup Instructions

The backend requires MongoDB to be running. You have two options:

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation:

1. Download MongoDB Community Server from:
   https://www.mongodb.com/try/download/community

2. Run the installer and follow the setup wizard

3. MongoDB will run as a Windows Service automatically

4. Verify installation:
```bash
mongod --version
```

5. Start MongoDB (if not running):
```bash
net start MongoDB
```

### Alternative: MongoDB Compass (GUI)

Download MongoDB Compass for a visual interface:
https://www.mongodb.com/try/download/compass

## Option 2: Use MongoDB Atlas (Cloud - Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas/register

2. Create a free account

3. Create a new cluster (free tier available)

4. Get your connection string

5. Update `.env` file in backend:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/adcraft-ai?retryWrites=true&w=majority
```

## Quick Test Without MongoDB

If you want to test the frontend without MongoDB right now:

1. The frontend will work and display the UI
2. Login/Signup will show an error when trying to connect to backend
3. You can still use the AI campaign generator (it's mock data, no backend needed)

## Starting the Application

### With MongoDB Running:

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Without MongoDB (Frontend Only):

```bash
cd frontend
npm run dev
```

The auth features will show errors, but the main campaign generator will work!

## Checking MongoDB Status

### Windows:
```bash
# Check if MongoDB service is running
sc query MongoDB

# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB
```

### Check connection:
```bash
# Using MongoDB shell
mongosh

# Or using mongo (older versions)
mongo
```

## Current Status

✅ Backend code is ready (server.js, routes, controllers, models)
✅ Frontend integration complete (Auth components, services, context)
❌ MongoDB needs to be installed/running
✅ Once MongoDB is running, everything will work!

## Backend will show:

**When MongoDB is NOT running:**
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**When MongoDB IS running:**
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

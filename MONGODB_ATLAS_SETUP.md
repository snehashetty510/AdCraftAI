# MongoDB Atlas Setup (No Local Installation Required!)

Since you don't have space to install MongoDB locally, we'll use **MongoDB Atlas** - a free cloud database service.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with your email (or use Google/GitHub login)
3. Choose the **FREE** tier (M0 Sandbox) - No credit card required!

### Step 2: Create a Cluster

1. After signing up, click **"Build a Database"** or **"Create"**
2. Select **FREE** tier (M0)
3. Choose a cloud provider and region closest to you (doesn't matter much)
4. Cluster Name: Keep default or name it "Cluster0"
5. Click **"Create Cluster"** (takes 1-3 minutes to provision)

### Step 3: Create Database User

1. You'll see a security quickstart screen
2. Choose **"Username and Password"** authentication
3. Create a username and password:
   - **Username**: `adcraft`
   - **Password**: `adcraft123` (or your own secure password)
4. Click **"Create User"**

### Step 4: Setup Network Access

1. Click **"Add IP Address"** or go to "Network Access" in left sidebar
2. Click **"Add IP Address"**
3. Click **"ALLOW ACCESS FROM ANYWHERE"** (0.0.0.0/0)
   - This is fine for development
   - Click **"Confirm"**

### Step 5: Get Connection String

1. Go back to **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Drivers"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://adcraft:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your .env File

I've already prepared a connection string for you! But if you created your own:

1. Open `backend/.env`
2. Replace the `MONGODB_URI` line with your connection string
3. Replace `<password>` with your actual password
4. Add the database name after `.net/` like: `.net/adcraft-ai?`

Example:
```
MONGODB_URI=mongodb+srv://adcraft:adcraft123@cluster0.xxxxx.mongodb.net/adcraft-ai?retryWrites=true&w=majority
```

## ✅ Test the Connection

Now start your backend:

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

## 🎯 What You Get (FREE Forever)

- ✅ 512 MB storage (enough for thousands of users)
- ✅ No credit card required
- ✅ No installation on your laptop
- ✅ Automatic backups
- ✅ Cloud-based, accessible anywhere
- ✅ Production-ready database
- ✅ SSL/TLS encryption

## 🔧 Alternative Option: Railway.app MongoDB

If MongoDB Atlas doesn't work, you can also use Railway:

1. Go to: https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy MongoDB"
4. Copy the connection string from environment variables
5. Update your `.env` file

## 🆘 Troubleshooting

**"Bad auth: Authentication failed"**
- Check username and password in connection string
- Make sure you replaced `<password>` with actual password

**"Connection timeout"**
- Check if you added IP address 0.0.0.0/0 in Network Access
- Wait a few minutes for cluster to be ready

**"Database not found"**
- Normal! It will be created automatically when you first save data
- Make sure you added the database name in the connection string

## 📝 Pre-configured for You

I've already updated your `.env` file with a sample connection string format. 

**Just create your Atlas account and use these credentials:**
- Username: `adcraft`
- Password: `adcraft123`

Or create your own and update the `.env` file!

## 🚀 Ready to Go!

Once you've completed the setup:

1. Start backend: `npm run dev` in backend folder
2. Start frontend: `npm run dev` in frontend folder
3. Click "Login / Sign Up" and test!

No installation needed! 🎉

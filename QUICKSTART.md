# Quick Start Guide - Social Post Application

Get up and running in 5 minutes!

## Prerequisites

You need:
- ✅ Node.js installed (check with `node -v`)
- ✅ MongoDB Atlas account created
- ✅ Cloudinary credentials (already configured)

## Step 1: Setup MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up → Create FREE cluster
3. Create database user (save password!)
4. Network Access → Add IP: `0.0.0.0/0`
5. Connect → Get connection string
6. Save the connection string, you'll need it next!

## Step 2: Configure Backend (1 minute)

1. Open `backend/.env` in a text editor
2. Replace `your_mongodb_atlas_connection_string_here` with your MongoDB URI
3. Replace `your_super_secret_jwt_key_change_this_in_production` with any random string (e.g., `my-super-secret-key-12345`)
4. Save the file

Example:
```env
PORT=5000
MONGODB_URI=mongodb+srv://user:password@cluster0.xxxxx.mongodb.net/social-app
JWT_SECRET=random-secret-key-minimum-32-characters-long

CLOUDINARY_CLOUD_NAME=deu9yltls
CLOUDINARY_API_KEY=675563944246672
CLOUDINARY_API_SECRET=Q9yIcmPSHpJO5INghNPmnHacD08
```

## Step 3: Start Backend (1 minute)

```bash
cd c:\internship\backend
npm install    # (if not already done)
npm run dev
```

You should see: `✅ Server running on port 5000` and `✅ MongoDB Connected`

**Keep this terminal window open!**

## Step 4: Start Frontend (1 minute)

Open a **NEW** terminal window:

```bash
cd c:\internship\frontend
npm start
```

Browser will open at `http://localhost:3000`

**If browser doesn't open automatically, go to: http://localhost:3000**

## Step 5: Use the App!

1. **Sign Up** - Create your account
   - Username: Choose any username
   - Email: Use any email (doesn't need to be real for testing)
   - Password: At least 6 characters
   - Profile Picture: Optional - click camera icon to upload

2. **Create Your First Post**
   - Type something in "What's on your mind?"
   - Or click camera icon to add an image
   - Click "Post"

3. **Try Features**
   - Like your post (click heart icon)
   - Comment on it (click comment icon)
   - Try search bar at top
   - Switch between filter tabs

## Troubleshooting

### Backend won't start?

**Error: "Cannot connect to MongoDB"**
- Check your MongoDB URI in `.env`
- Ensure you replaced `<password>` with actual password
- Check MongoDB Atlas IP whitelist

**Error: "Port 5000 already in use"**
- Change PORT in `.env` to 5001
- Also update frontend `.env`: `REACT_APP_API_URL=http://localhost:5001/api`

### Frontend won't start?

**Error: "Port 3000 already in use"**
- Press `Y` when asked to use another port

**Can't connect to backend**
- Make sure backend is running (check terminal)
- Check backend URL in `frontend/.env`

### Images won't upload?

- Cloudinary credentials are already configured
- Make sure backend is running
- Check file size (max 5MB for posts, 2MB for profile)

## What's Next?

### Test All Features
- ✅ Create multiple posts (text, image, both)
- ✅ Like and unlike posts
- ✅ Add comments
- ✅ Search for posts
- ✅ Try all filter tabs (Most Liked, Most Commented, Most Shared)
- ✅ View your profile

### Deploy to Production
- Follow instructions in `DEPLOYMENT.md` to deploy your app
- Free hosting on Render (backend) + Vercel (frontend)

### Submit Assignment
- Once deployed, fill form: https://forms.gle/eriRaMuN8Tu6t4Rs7
- Deadline: 03 Feb 2026

## Common Commands

### Backend
```bash
cd c:\internship\backend
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```bash
cd c:\internship\frontend
npm start        # Start development server
npm run build    # Build for production
```

## Need Help?

- Check full README: `README.md`
- Backend API docs: `backend/README.md`  
- Deployment guide: `DEPLOYMENT.md`
- Email: hr@triplewsols.com

Happy coding! 🚀

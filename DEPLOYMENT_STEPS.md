# Deployment Steps for Your Social Post Application

## Step 1: Push to GitHub ✅ (Do This First)

### 1.1 Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `social-post-app` (or any name you like)
3. Description: "Full-stack social media app - 3W Internship Assignment"
4. Choose **Public**
5. **Do NOT** initialize with README (we already have one)
6. Click **"Create repository"**

### 1.2 Initialize Git and Push

Run these commands in your project root:

```bash
cd c:\internship

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Social Post Application"

# Add your GitHub repository (REPLACE with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/social-post-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**⚠️ Important:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

## Step 2: Deploy Backend to Render 🚀

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub (recommended) or email

### 2.2 Create New Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Select the `social-post-app` repository
4. Configure:
   - **Name**: `social-post-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.3 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these variables:

```
PORT = 5000
MONGODB_URI = mongodb+srv://amitkumar060705_db_user:mdYpQRX5fUYKri53@cluster0.vgnuusl.mongodb.net/social-app?retryWrites=true&w=majority
JWT_SECRET = social-app-jwt-secret-key-amitkumar-2026-internship-3w
CLOUDINARY_CLOUD_NAME = deu9yltls
CLOUDINARY_API_KEY = 675563944246672
CLOUDINARY_API_SECRET = Q9yIcmPSHpJO5INghNPmnHacD08
NODE_ENV = production
```

### 2.4 Deploy

1. Click **"Create Web Service"**
2. Wait 5-10 minutes for deployment
3. Once deployed, copy your backend URL (e.g., `https://social-post-backend.onrender.com`)

**✅ Save this URL - you'll need it for frontend!**

---

## Step 3: Deploy Frontend to Vercel 🌐

### 3.1 Update Frontend Environment

**BEFORE deploying frontend**, update the API URL:

Edit `frontend/.env`:
```env
REACT_APP_API_URL=https://YOUR-BACKEND-URL.onrender.com/api
```

Replace `YOUR-BACKEND-URL` with your actual Render URL!

Then commit the change:
```bash
git add .
git commit -m "Update API URL for production"
git push
```

### 3.2 Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Navigate to frontend folder
cd c:\internship\frontend

# Deploy
vercel --prod
```

Follow the prompts:
- Set up and deploy: **Yes**
- Which scope: Select your account
- Link to existing project: **No**
- Project name: `social-post-app`
- In which directory: **./** (current directory)
- Override settings: **No**

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`
6. **Environment Variables**:
   - Key: `REACT_APP_API_URL`
   - Value: `https://YOUR-BACKEND-URL.onrender.com/api`
7. Click **"Deploy"**

### 3.3 Get Your Frontend URL

After deployment completes, copy your Vercel URL (e.g., `https://social-post-app.vercel.app`)

---

## Step 4: Update Backend CORS (Important!)

After both are deployed, update backend CORS configuration:

Edit `backend/src/server.js` around line 21:

```javascript
app.use(cors({
  origin: ['https://YOUR-FRONTEND-URL.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Then push the update:
```bash
cd c:\internship
git add .
git commit -m "Update CORS for production"
git push
```

Render will automatically redeploy the backend.

---

## Step 5: Test Your Deployed App 🎉

1. Open your Vercel URL in a browser
2. Test:
   - ✅ Sign up with a new account
   - ✅ Create a post with an image
   - ✅ Like the post
   - ✅ Add a comment
   - ✅ Search functionality
   - ✅ Try all filter tabs

---

## Step 6: Submit Assignment 📝

Fill out the form: https://forms.gle/eriRaMuN8Tu6t4Rs7

**Information to submit:**
- GitHub Repository URL: `https://github.com/YOUR_USERNAME/social-post-app`
- Frontend URL: `https://social-post-app.vercel.app` (your Vercel URL)
- Backend URL: `https://social-post-backend.onrender.com` (your Render URL)

**Deadline**: 03 Feb 2026

---

## 📝 Quick Reference

| Service | What | URL |
|---------|------|-----|
| GitHub | Code repository | https://github.com/YOUR_USERNAME/social-post-app |
| Render | Backend API | https://YOUR-BACKEND.onrender.com |
| Vercel | Frontend App | https://YOUR-APP.vercel.app |

---

## 🆘 Troubleshooting

**Backend deployment fails:**
- Check Render logs in dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist allows all IPs (0.0.0.0/0)

**Frontend can't connect to backend:**
- Verify `REACT_APP_API_URL` in Vercel environment variables
- Check backend CORS configuration
- Ensure backend is running (check Render dashboard)

**Images not uploading:**
- Verify Cloudinary credentials in Render environment variables
- Check browser console for errors

---

## ⚡ Important Notes

1. **Render Free Tier**: Backend may sleep after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

2. **Environment Variables**: Make sure they're set in both:
   - Render (for backend)
   - Vercel (for frontend)

3. **CORS**: Must update backend CORS after getting Vercel URL

4. **MongoDB**: Ensure IP whitelist allows connections from anywhere (0.0.0.0/0)

---

## ✅ Checklist

- [ ] GitHub repository created and code pushed
- [ ] Backend deployed to Render
- [ ] Backend URL saved
- [ ] Frontend `.env` updated with backend URL
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL saved
- [ ] Backend CORS updated with frontend URL
- [ ] Tested deployed application
- [ ] Submitted assignment form

---

**🎉 Good luck with your deployment!**

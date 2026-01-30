# 🚀 Simple Deployment Checklist

Follow these steps **in order**. Each step should take only a few minutes!

---

## ✅ Step 1: Deploy Backend to Render (10 minutes)

### 1. Sign Up/Login
- Open: https://render.com
- Click **"Get Started for Free"** or **"Sign In"**
- Choose **"Sign in with GitHub"** (easiest!)
- Authorize Render to access your GitHub

### 2. Create New Web Service
- Click **"New +"** button (top right)
- Select **"Web Service"**
- Find and select your repository: **`social-post-app`**
- Click **"Connect"**

### 3. Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `social-post-backend` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 4. Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Copy and paste these (one by one):

```
PORT
5000

MONGODB_URI
mongodb+srv://amitkumar060705_db_user:mdYpQRX5fUYKri53@cluster0.vgnuusl.mongodb.net/social-app?retryWrites=true&w=majority

JWT_SECRET
social-app-jwt-secret-key-amitkumar-2026-internship-3w

CLOUDINARY_CLOUD_NAME
deu9yltls

CLOUDINARY_API_KEY
675563944246672

CLOUDINARY_API_SECRET
Q9yIcmPSHpJO5INghNPmnHacD08

NODE_ENV
production
```

### 5. Deploy!
- Click **"Create Web Service"**
- Wait 5-10 minutes (grab a coffee! ☕)
- Once deployed, **COPY YOUR BACKEND URL**
  - It will look like: `https://social-post-backend-xxxx.onrender.com`
  - **SAVE THIS URL!** You'll need it next!

---

## ✅ Step 2: Tell Me Your Render URL

Once your backend is deployed, paste your Render URL here, and I'll:
1. Update your frontend configuration
2. Push the changes to GitHub
3. Give you instructions for Vercel deployment

**Format:** `https://social-post-backend-xxxx.onrender.com`

---

## 🎯 What Happens Next

After you give me your Render URL:
1. I'll update `frontend/.env` with your backend URL
2. I'll commit and push to GitHub
3. You'll deploy frontend to Vercel (5 minutes)
4. App will be live! 🎉

---

## 🆘 Need Help?

**Backend deployment not starting?**
- Make sure all environment variables are added
- Check the "Logs" tab in Render dashboard
- Verify MongoDB Atlas allows all IPs (0.0.0.0/0)

**Can't find the backend URL?**
- Look at the top of your Render service page
- It's under the service name
- Should end with `.onrender.com`

---

**Ready? Go to https://render.com and follow Step 1!** 🚀

Then come back and give me your backend URL!

# 🌐 Deploy Frontend to Vercel - Simple Steps

Your backend is live at: **https://social-post-app-ni3l.onrender.com** ✅

Now let's deploy the frontend!

---

## Option 1: Using Vercel CLI (Fastest - 2 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
- Choose "Continue with GitHub" or enter your email
- Follow the authentication in your browser

### Step 3: Deploy
```bash
cd c:\internship\frontend
vercel --prod
```

Follow the prompts:
- **Set up and deploy**: Press **Enter** (Yes)
- **Which scope**: Press **Enter** (your account)
- **Link to existing project**: Press **N** (No)
- **Project name**: Press **Enter** (accepts: `frontend`)
- **In which directory**: Press **Enter** (accepts: `./`)
- **Override settings**: Press **N** (No)

**Environment Variable Setup**:
When asked about environment variables:
- Press **Y** (Yes)
- Variable name: `REACT_APP_API_URL`
- Value: `https://social-post-app-ni3l.onrender.com/api`
- Add to all environments: **Y** (Yes)

Wait 1-2 minutes for deployment!

Your app will be live at: `https://frontend-xxxx.vercel.app`

---

## Option 2: Using Vercel Dashboard (If Option 1 doesn't work)

### Step 1: Sign Up
1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Find and select **`social-post-app`** repository
3. Click **"Import"**

### Step 3: Configure Project
**Framework Preset**: Should auto-detect "Create React App" ✅

**Root Directory**: 
- Click **"Edit"**
- Enter: `frontend`
- Click **"Continue"**

**Build Settings** (auto-filled, verify):
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`

### Step 4: Add Environment Variable
Click **"Environment Variables"**:
- **Name**: `REACT_APP_API_URL`
- **Value**: `https://social-post-app-ni3l.onrender.com/api`
- Click **"Add"**

### Step 5: Deploy!
- Click **"Deploy"**
- Wait 2-3 minutes
- Your app will be live!

---

## ✅ After Deployment

### Get Your URLs
You'll have two URLs:
- **Backend**: https://social-post-app-ni3l.onrender.com
- **Frontend**: https://frontend-xxxx.vercel.app (copy this!)

### Test Your App
1. Open your Vercel URL
2. Sign up for a new account
3. Create a post with an image
4. Like and comment
5. Try search and filters

---

## 📝 Submit Assignment

Once everything works, fill out the form:
https://forms.gle/eriRaMuN8Tu6t4Rs7

**Submission Info:**
- **GitHub Repo**: https://github.com/Amit060705/social-post-app
- **Backend URL**: https://social-post-app-ni3l.onrender.com
- **Frontend URL**: (your Vercel URL)

**Deadline**: 03 Feb 2026

---

## 🆘 Troubleshooting

**Vercel CLI not installing?**
- Try: `npm install -g vercel --force`
- Or use Option 2 (Dashboard method)

**Frontend shows "Network Error"?**
- Make sure you added the environment variable
- Verify the backend URL is correct
- Check backend is running on Render

**Images not uploading?**
- This should work automatically (Cloudinary configured)
- Check browser console for errors

---

## 🎉 You're Almost Done!

Just deploy to Vercel and your social app will be live! 🚀

Choose Option 1 (CLI) or Option 2 (Dashboard) and follow the steps!

# Deployment Guide - Social Post Application

Complete guide to deploy your social post application to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Cloudinary account (already configured)
- Render account (for backend)
- Vercel account (for frontend)

## Step 1: Setup MongoDB Atlas

1. **Create Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for free tier

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select a cloud provider and region
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Add new database user
   - Set username and password
   - Save credentials

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP Address
   - Allow access from anywhere (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/social-app?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Render

1. **Push Code to GitHub**
   ```bash
   cd c:\internship
   git init
   git add .
   git commit -m "Initial commit - Social Post App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/social-post-app.git
   git push -u origin main
   ```

2. **Create Render Account**
   - Go to https://render.com
   - Sign up with GitHub

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

4. **Configure Service**
   - **Name**: social-post-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   ```
   PORT = 5000
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = your_super_secret_jwt_key_min_32_chars
   CLOUDINARY_CLOUD_NAME = deu9yltls
   CLOUDINARY_API_KEY = 675563944246672
   CLOUDINARY_API_SECRET = Q9yIcmPSHpJO5INghNPmnHacD08
   NODE_ENV = production
   ```

6. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://social-post-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. **Update Frontend Environment**
   - Edit `frontend/.env`:
   ```env
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

2. **Commit Changes**
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

3. **Deploy to Vercel**
   
   **Option A: Using Vercel CLI**
   ```bash
   cd frontend
   npm install -g vercel
   vercel login
   vercel
   ```
   
   Follow prompts:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: social-post-app
   - Directory: ./
   - Override settings: No

   **Option B: Using Vercel Dashboard**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Configure:
     - Root Directory: `frontend`
     - Framework Preset: Create React App
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add environment variable:
     - `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`
   - Click "Deploy"

4. **Get Frontend URL**
   - Copy your frontend URL (e.g., `https://social-post-app.vercel.app`)

## Step 4: Update Backend CORS

1. **Update Backend for CORS**
   - Edit `backend/src/server.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app', 'http://localhost:3000'],
     credentials: true
   }));
   ```

2. **Commit and Deploy**
   ```bash
   git add .
   git commit -m "Update CORS configuration"
   git push
   ```
   
   Render will automatically redeploy.

## Step 5: Test Your Application

1. **Open Frontend URL**
   - Go to your Vercel URL

2. **Test Features**
   - ✅ Sign up with new account
   - ✅ Login
   - ✅ Create a post with image
   - ✅ Like a post
   - ✅ Add a comment
   - ✅ Search for users/posts
   - ✅ Try all filter tabs

## Step 6: Submit Your Assignment

Fill out the submission form at: https://forms.gle/eriRaMuN8Tu6t4Rs7

**Required Information:**
- GitHub Repository URL
- Frontend Deployment URL (Vercel)
- Backend Deployment URL (Render)
- Any special instructions

## Troubleshooting

### Backend Issues

**Error: Cannot connect to MongoDB**
- Check MongoDB Atlas IP whitelist
- Verify connection string format
- Ensure database user credentials are correct

**Error: 500 Internal Server Error**
- Check Render logs: Dashboard → Service → Logs
- Verify all environment variables are set
- Check Node.js version compatibility

### Frontend Issues

**Error: Network Error / API not responding**
- Verify `REACT_APP_API_URL` is correct
- Check backend is running on Render
- Verify CORS configuration

**Images not uploading**
- Check Cloudinary credentials in backend
- Verify file size limits
- Check browser console for errors

### Render Free Tier Limitations

- Backend may sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds
- Consider upgrading for production use

## Maintenance

### Updating Your App

1. Make changes locally
2. Test locally
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. Render and Vercel will auto-deploy

### Monitoring

- **Render Dashboard**: Monitor backend logs and metrics
- **Vercel Dashboard**: Monitor frontend deployments and analytics
- **MongoDB Atlas**: Monitor database usage

## Cost Estimates

- **MongoDB Atlas** (Free tier): $0/month
- **Cloudinary** (Free tier): $0/month  
- **Render** (Free tier): $0/month
- **Vercel** (Free tier): $0/month

**Total**: $0/month for development/assignment

## Security Notes

- Never commit `.env` files to GitHub
- Use strong JWT secrets (min 32 characters)
- Regularly update dependencies
- Monitor for security vulnerabilities

## Support

If you face issues:
- Check documentation: README files
- Review error logs
- Contact: hr@triplewsols.com

Good luck with your deployment! 🚀

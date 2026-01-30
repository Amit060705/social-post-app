# Social Post Application

A full-stack social media application inspired by TaskPlanet's Social Page, featuring post creation, likes, comments, follow system, and advanced filtering capabilities.

![Social Post App](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 📸 Screenshots

Reference UI from TaskPlanet Social Page:
- Modern, clean interface
- Card-based post layout
- Interactive like, comment, and share buttons
- Search and filter functionality
- Responsive mobile design

## ✨ Features

### Core Features
- 🔐 **User Authentication** - Signup/Login with JWT & password hashing
- 📝 **Create Posts** - Text, images, or both
- ❤️ **Like & Unlike** - Interactive post engagement  
- 💬 **Comments** - Add comments with username tracking
- 🔄 **Share** - Share posts with count tracking
- 👥 **Follow/Unfollow** - Build your social network
- 🔍 **Search** - Find users and posts
- 🎯 **Filter Posts** - View by Most Liked, Commented, or Shared
- 👤 **User Profiles** - View user stats and posts
- 📱 **Responsive Design** - Works on all devices

### Technical Features
- Password hashing with bcrypt
- JWT authentication
- Cloudinary image storage
- Pagination support
- Real-time UI updates
- Protected routes
- Error handling

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File uploads

## 📂 Project Structure

```
c:\internship\
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── services/      # API services
│   │   └── utils/         # Helper functions
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── backend/               # Node.js backend application
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   └── server.js     # Entry point
│   ├── package.json
│   └── README.md
│
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository** (or navigate to your project folder)
```bash
cd c:\internship
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
# Add your MongoDB URI, JWT secret, and Cloudinary credentials
```

3. **Frontend Setup**
```bash
cd frontend
npm install

# Create .env file
# Add your backend API URL
```

### Environment Variables

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Running Locally

1. **Start Backend**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

2. **Start Frontend** (in a new terminal)
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

## 📦 Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy!

### Frontend (Vercel)

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend folder
3. Run: `vercel`
4. Follow prompts
5. Set `REACT_APP_API_URL` environment variable

### Database (MongoDB Atlas)

1. Create a free cluster on MongoDB Atlas
2. Create a database user
3. Whitelist IP addresses (or allow all for development)
4. Get connection string
5. Add to backend `.env`

## 📖 API Documentation

See [backend/README.md](backend/README.md) for complete API documentation.

### Quick Reference

- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `GET /api/post/feed` - Get all posts
- `POST /api/post/create` - Create post (protected)
- `POST /api/post/:id/like` - Like post (protected)
- `POST /api/post/:id/comment` - Comment (protected)
- `POST /api/user/follow/:id` - Follow user (protected)
- `GET /api/user/search?q=query` - Search

## 🎨 UI/UX Features

- Clean, modern design inspired by TaskPlanet
- Blue color theme (#1976d2)
- Card-based post layout
- Smooth animations and transitions
- Mobile-first responsive design
- Bottom navigation for mobile
- Avatar support for users
- Image previews before posting
- Real-time like/comment counts
- Collapsible comment sections

## 📝 Usage

1. **Sign Up** - Create an account with username, email, password, and optional profile picture
2. **Login** - Access your account
3. **Create Posts** - Share text, images, or both
4. **Engage** - Like, comment, and share posts
5. **Connect** - Follow other users
6. **Discover** - Search and filter posts
7. **Profile** - View your profile and posts

## 🔒 Security

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for authentication
- Protected routes require valid tokens
- Input validation on all endpoints
- CORS enabled for cross-origin requests

## 🐛 Known Limitations

- No real-time notifications (would require WebSockets)
- No image optimization (could use Cloudinary transformations)
- No post editing functionality
- No delete comment feature
- No direct messaging

## 🤝 Contributing

This is an internship assignment project. Feel free to fork and enhance!

## 📄 License

ISC

## 👨‍💻 Author

Created for 3W Full Stack Internship Assignment

## 🙏 Acknowledgments

- TaskPlanet app for UI inspiration
- Material-UI for beautiful components
- Cloudinary for image hosting
- MongoDB Atlas for database hosting

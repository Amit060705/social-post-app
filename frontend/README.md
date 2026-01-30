# Social Post Application - Frontend

A modern, responsive social media application built with React and Material-UI, inspired by TaskPlanet's Social Page.

## Features

- ✅ User authentication (signup/login)
- ✅ Create posts with text and/or images
- ✅ Like and comment on posts
- ✅ Follow and unfollow users
- ✅ Search users and posts
- ✅ Filter posts by:
  - All Posts
  - Most Liked
  - Most Commented
  - Most Shared
- ✅ User profiles with stats
- ✅ Responsive design (mobile & desktop)
- ✅ Real-time UI updates
- ✅ Beautiful Material-UI components

## Tech Stack

- **React.js** - UI library
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Context API** - State management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the frontend root directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update the API URL to your deployed backend URL.

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── Feed/
│   │   ├── Feed.jsx
│   │   ├── CreatePost.jsx
│   │   ├── PostCard.jsx
│   │   ├── FilterTabs.jsx
│   │   └── SearchBar.jsx
│   ├── Common/
│   │   ├── Navbar.jsx
│   │   └── BottomNav.jsx
│   └── User/
│       └── UserProfile.jsx
├── context/
│   └── AuthContext.js
├── services/
│   └── api.js
├── utils/
│   └── helpers.js
├── App.js
├── App.css
└── index.js
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard with your backend URL

## License

ISC

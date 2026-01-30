# Social Post Application - Backend

RESTful API for a mini social post application with authentication, posts, likes, comments, and follow functionality.

## Features

- ✅ User authentication (signup/login) with JWT
- ✅ Password hashing with bcrypt
- ✅ Create posts with text and/or images
- ✅ Like and unlike posts
- ✅ Comment on posts
- ✅ Follow and unfollow users
- ✅ Search users and posts
- ✅ Filter posts (Most Liked, Most Commented, Most Shared)
- ✅ Image upload to Cloudinary
- ✅ Pagination support

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create a `.env` file in the backend root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key

CLOUDINARY_CLOUD_NAME=deu9yltls
CLOUDINARY_API_KEY=675563944246672
CLOUDINARY_API_SECRET=Q9yIcmPSHpJO5INghNPmnHacD08
```

3. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Signup
```
POST /api/auth/signup
Content-Type: multipart/form-data

Body:
- username (required)
- email (required)
- password (required)
- profilePicture (optional, file)
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "password123"
}
```

### User Routes (`/api/user`)

#### Get User Profile
```
GET /api/user/profile/:userId
```

#### Update Profile (Protected)
```
PUT /api/user/profile
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- username (optional)
- email (optional)
- bio (optional)
- password (optional)
- profilePicture (optional, file)
```

#### Follow User (Protected)
```
POST /api/user/follow/:userId
Authorization: Bearer <token>
```

#### Unfollow User (Protected)
```
POST /api/user/unfollow/:userId
Authorization: Bearer <token>
```

#### Search
```
GET /api/user/search?q=search_query
```

### Post Routes (`/api/post`)

#### Create Post (Protected)
```
POST /api/post/create
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- content (optional, text)
- image (optional, file)
Note: At least one of content or image is required
```

#### Get Feed
```
GET /api/post/feed?page=1&limit=20
```

#### Get Most Liked Posts
```
GET /api/post/feed/liked?page=1&limit=20
```

#### Get Most Commented Posts
```
GET /api/post/feed/commented?page=1&limit=20
```

#### Get Most Shared Posts
```
GET /api/post/feed/shared?page=1&limit=20
```

#### Like Post (Protected)
```
POST /api/post/:postId/like
Authorization: Bearer <token>
```

#### Unlike Post (Protected)
```
POST /api/post/:postId/unlike
Authorization: Bearer <token>
```

#### Comment on Post (Protected)
```
POST /api/post/:postId/comment
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "text": "Your comment here"
}
```

#### Share Post (Protected)
```
POST /api/post/:postId/share
Authorization: Bearer <token>
```

#### Delete Post (Protected)
```
DELETE /api/post/:postId
Authorization: Bearer <token>
```

## Database Schema

### User Schema
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  profilePicture: String,
  bio: String,
  followers: [ObjectId],
  following: [ObjectId],
  createdAt: Date
}
```

### Post Schema
```javascript
{
  user: ObjectId (ref: User, required),
  content: String,
  image: String,
  likes: [{
    user: ObjectId,
    username: String
  }],
  comments: [{
    user: ObjectId,
    username: String,
    text: String,
    createdAt: Date
  }],
  shares: Number,
  createdAt: Date
}
```

## Deployment

### Deploy to Render

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables in Render dashboard
6. Deploy!

## Error Handling

All endpoints return JSON responses with the following structure:

Success:
```json
{
  "data": {...}
}
```

Error:
```json
{
  "message": "Error description"
}
```

## License

ISC

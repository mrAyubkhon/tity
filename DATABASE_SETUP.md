# 🗄️ Database Setup Guide for Titu's Luxury Website

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for file storage)

## 🚀 Quick Setup

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/titu-luxury

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security
JWT_SECRET=your_jwt_secret_key_here
```

### 3. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB (macOS)
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `MONGODB_URI` in `.env`

### 4. Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com)
2. Create a free account
3. Get your credentials from the dashboard
4. Update Cloudinary settings in `.env`

### 5. Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📊 Database Models

### Media Model
- **Photos & Videos**: Store file URLs, metadata, categories
- **Categories**: Portrait, Lifestyle, Fashion, Style, etc.
- **Tags**: Searchable keywords
- **Metadata**: Camera info, location, photographer

### Event Model
- **Calendar Events**: Dates, times, locations
- **Event Types**: Personal, Professional, Social, Travel
- **Media Links**: Connect events with photos/videos
- **Attendees**: Guest management

## 🔧 API Endpoints

### Media API (`/api/media`)
- `GET /` - Get all media with pagination
- `GET /:id` - Get single media item
- `POST /upload` - Upload new media
- `PUT /:id` - Update media
- `DELETE /:id` - Delete media

### Calendar API (`/api/calendar`)
- `GET /` - Get all events
- `GET /month/:year/:month` - Get monthly events
- `GET /:id` - Get single event
- `POST /` - Create new event
- `PUT /:id` - Update event
- `DELETE /:id` - Delete event

## 🎨 Frontend Integration

### 1. Install Frontend Dependencies

```bash
cd .. # Go back to root
npm install
```

### 2. Environment Variables

Create `.env` in the root directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Start Frontend

```bash
npm start
```

## 📱 Features Added

### ✨ New Components
- **LuxuryCalendar**: Interactive calendar with events
- **MediaUpload**: Drag & drop file upload
- **Enhanced Gallery**: Database-driven with filters

### 🎯 New Features
- **File Upload**: Photos and videos with metadata
- **Event Management**: Create and manage calendar events
- **Media Filtering**: Search by type, category, tags
- **Pagination**: Handle large media collections
- **Real-time Updates**: Toast notifications

## 🔒 Security Features

- **Rate Limiting**: Prevent API abuse
- **File Validation**: Type and size restrictions
- **CORS Protection**: Configured for frontend
- **Helmet**: Security headers
- **Input Sanitization**: Prevent injection attacks

## 📈 Performance Optimizations

- **Image Optimization**: Automatic compression via Cloudinary
- **Lazy Loading**: Images load as needed
- **Pagination**: Limit data transfer
- **Caching**: Browser and CDN caching
- **Compression**: Gzip compression enabled

## 🚀 Deployment

### Backend Deployment
1. **Heroku**: Easy deployment with MongoDB Atlas
2. **Railway**: Modern platform with built-in MongoDB
3. **DigitalOcean**: VPS with Docker support

### Frontend Deployment
1. **Vercel**: Automatic deployments from GitHub
2. **Netlify**: Static site hosting
3. **AWS S3**: Static website hosting

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Restart MongoDB
brew services restart mongodb-community
```

**Cloudinary Upload Fails:**
- Verify API credentials
- Check file size limits (50MB)
- Ensure file types are supported

**CORS Issues:**
- Update `FRONTEND_URL` in backend `.env`
- Check if frontend is running on correct port

**File Upload Size:**
- Increase limits in `multer` configuration
- Update Cloudinary settings

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Calendar Documentation](https://github.com/wojtekmaj/react-calendar)

---

**Your luxury website now has a powerful backend! 🎉**

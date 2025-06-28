# MongoDB Setup Guide for TourMate-AI

This guide will help you choose and set up the best MongoDB connection method for your TourMate-AI project.

## 🎯 Recommended: MongoDB Atlas (Cloud)

**Best for**: Production, hackathons, team collaboration

### Setup Steps:

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Choose the "Free" tier (M0)

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select your preferred cloud provider (AWS, Google Cloud, or Azure)
   - Choose a region close to you
   - Click "Create"

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password (save these!)
   - Select "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with `tourmate_ai`

6. **Update Environment Variables**
   ```bash
   # In your .env file
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/tourmate_ai?retryWrites=true&w=majority
   ```

## 🖥️ Option 2: Local MongoDB

**Best for**: Development, offline work

### Setup Steps:

1. **Install MongoDB Community Server**
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Linux**: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**
   - **Windows**: MongoDB runs as a service automatically
   - **macOS**: `brew services start mongodb-community`
   - **Linux**: `sudo systemctl start mongod`

3. **Verify Installation**
   ```bash
   mongosh
   # You should see the MongoDB shell
   ```

4. **Update Environment Variables**
   ```bash
   # In your .env file
   MONGODB_URI=mongodb://localhost:27017/tourmate_ai
   ```

## 🐳 Option 3: Docker MongoDB

**Best for**: Development, consistent environments

### Setup Steps:

1. **Install Docker**
   - Download from [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Run MongoDB Container**
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

3. **Verify Container is Running**
   ```bash
   docker ps
   # Should show mongodb container running
   ```

4. **Update Environment Variables**
   ```bash
   # In your .env file
   MONGODB_URI=mongodb://localhost:27017/tourmate_ai
   ```

## 🔐 Option 4: MongoDB with Authentication

**Best for**: Production, security requirements

### Setup Steps:

1. **Create MongoDB User**
   ```bash
   mongosh
   use admin
   db.createUser({
     user: "tourmate_user",
     pwd: "your_secure_password",
     roles: [{ role: "readWrite", db: "tourmate_ai" }]
   })
   ```

2. **Update Environment Variables**
   ```bash
   # In your .env file
   MONGODB_URI=mongodb://localhost:27017/tourmate_ai
   MONGODB_USER=tourmate_user
   MONGODB_PASS=your_secure_password
   ```

## 🚀 Testing Your Connection

1. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Check Logs**
   You should see:
   ```
   ✅ MongoDB connected successfully
   Database: tourmate_ai
   Host: your-host
   Port: 27017
   ```

3. **Test API Endpoints**
   ```bash
   # Test user registration
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
   ```

## 🔧 Troubleshooting

### Common Issues:

1. **Connection Refused**
   - MongoDB service not running
   - Wrong port (should be 27017)
   - Firewall blocking connection

2. **Authentication Failed**
   - Wrong username/password
   - User doesn't have proper permissions
   - Database doesn't exist

3. **Network Timeout**
   - Check internet connection (for Atlas)
   - Verify IP whitelist (for Atlas)
   - Check firewall settings

### Quick Fixes:

```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# macOS
brew services list | grep mongodb

# Linux
sudo systemctl status mongod

# Docker
docker ps | grep mongodb
```

## 📊 Connection Method Comparison

| Method | Setup Time | Cost | Reliability | Scalability | Best For |
|--------|------------|------|-------------|-------------|----------|
| MongoDB Atlas | 10 min | Free tier | High | Excellent | Production, Hackathons |
| Local MongoDB | 30 min | Free | Medium | Limited | Development |
| Docker MongoDB | 15 min | Free | High | Limited | Development |
| MongoDB with Auth | 45 min | Free | High | Limited | Production |

## 🎯 Recommendation for TourMate-AI

**For Hackathons**: Use MongoDB Atlas
- Quick setup
- No local installation
- Team collaboration
- Free tier available

**For Development**: Use Local MongoDB or Docker
- Faster queries
- No network latency
- Full control

**For Production**: Use MongoDB Atlas
- Managed service
- Automatic backups
- Built-in monitoring
- Easy scaling 
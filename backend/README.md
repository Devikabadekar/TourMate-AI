# TourMate-AI Backend

A robust Node.js backend API for TourMate-AI, featuring IBM Granite models integration for intelligent business travel planning.

## 🚀 Features

- **IBM Granite AI Integration**: Powered by Granite 3.3 Speech 8B and Granite 4.0 Tiny Preview
- **RESTful API**: Complete CRUD operations for trips, users, and AI interactions
- **JWT Authentication**: Secure user authentication and authorization
- **Redis Caching**: High-performance caching for AI responses
- **MongoDB Integration**: Scalable data storage
- **Rate Limiting**: API protection against abuse
- **Comprehensive Logging**: Winston-based logging system
- **Error Handling**: Robust error management and validation

## 🏗️ Architecture

```
backend/
├── config/          # Database and Redis configuration
├── middleware/      # Authentication and error handling
├── routes/          # API route handlers
├── services/        # Business logic and AI services
├── utils/           # Utility functions and logging
├── logs/            # Application logs
├── uploads/         # File uploads
└── server.js        # Main application entry point
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Cache**: Redis
- **AI**: IBM Granite Models (3.3 Speech 8B, 4.0 Tiny Preview)
- **Authentication**: JWT with bcrypt
- **Validation**: Express-validator
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate limiting

## 📋 Prerequisites

- Node.js 18 or higher
- MongoDB (local or cloud)
- Redis (local or cloud)
- IBM Cloud account with Granite models access

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/tourmate_ai
   REDIS_URL=redis://localhost:6379
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=7d
   
   # IBM Granite Configuration
   IBM_API_KEY=your-ibm-api-key-here
   IBM_URL=https://api.us-south.assistant.watson.cloud.ibm.com
   IBM_ASSISTANT_ID=your-assistant-id-here
   IBM_VERSION=2023-11-15
   ```

4. **Create required directories**
   ```bash
   mkdir logs uploads
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 🤖 Granite Models Integration

### Available Models

1. **Granite 3.3 Speech 8B**
   - Purpose: Natural conversation and speech processing
   - Use cases: Chat interactions, travel recommendations
   - Endpoints: `/api/ai/chat/speech`, `/api/ai/recommendations/:destination`

2. **Granite 4.0 Tiny Preview**
   - Purpose: Fast text processing and structured output
   - Use cases: Trip planning, expense reports, analysis
   - Endpoints: `/api/ai/plan-trip`, `/api/ai/process/tiny`, `/api/ai/expense-report`

### Model Selection

The API automatically selects the appropriate model based on the operation:
- **Speech model**: For conversational interactions and recommendations
- **Tiny model**: For structured data generation and fast processing

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user profile |
| POST | `/api/auth/refresh` | Refresh JWT token |
| POST | `/api/auth/logout` | User logout |

### AI Endpoints

| Method | Endpoint | Description | Model |
|--------|----------|-------------|-------|
| GET | `/api/ai/models` | Get available Granite models | - |
| POST | `/api/ai/plan-trip` | Generate trip itinerary | Granite 4.0 Tiny |
| GET | `/api/ai/recommendations/:destination` | Get travel recommendations | Granite 3.3 Speech |
| POST | `/api/ai/chat/speech` | Chat with speech model | Granite 3.3 Speech |
| POST | `/api/ai/process/tiny` | Process with tiny model | Granite 4.0 Tiny |
| POST | `/api/ai/chat` | General chat with model selection | User choice |
| POST | `/api/ai/analyze-feedback` | Analyze trip feedback | Granite 4.0 Tiny |
| POST | `/api/ai/expense-report` | Generate expense report | Granite 4.0 Tiny |
| POST | `/api/ai/optimize-itinerary` | Optimize existing itinerary | Granite 4.0 Tiny |
| GET | `/api/ai/health` | Check AI service health | Both models |

### Trip Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/trips` | Get all user trips |
| GET | `/api/trips/:id` | Get specific trip |
| POST | `/api/trips` | Create new trip |
| PUT | `/api/trips/:id` | Update trip |
| DELETE | `/api/trips/:id` | Delete trip |
| POST | `/api/trips/:id/feedback` | Add trip feedback |

### User Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get user profile |
| PUT | `/api/users/profile` | Update user profile |

### Notifications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notifications` | Get user notifications |
| PUT | `/api/notifications/:id/read` | Mark notification as read |
| PUT | `/api/notifications/read-all` | Mark all notifications as read |

### Payments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create-intent` | Create payment intent |
| GET | `/api/payments/history` | Get payment history |

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📝 Example Usage

### 1. User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp"
  }'
```

### 2. Plan a Trip with AI
```bash
curl -X POST http://localhost:5000/api/ai/plan-trip \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "destination": "Tokyo, Japan",
    "startDate": "2024-03-15",
    "endDate": "2024-03-20",
    "purpose": "Client Meeting",
    "travelers": 2,
    "budget": "$5,000",
    "preferences": "Business class flights, 4-star hotels"
  }'
```

### 3. Chat with Granite Speech Model
```bash
curl -X POST http://localhost:5000/api/ai/chat/speech \
  -H "Authorization: Bearer <your-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the best business hotels in Tokyo?"
  }'
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring

### Health Checks
- **Server Health**: `GET /health`
- **AI Service Health**: `GET /api/ai/health`

### Logs
- **Application Logs**: `logs/combined.log`
- **Error Logs**: `logs/error.log`

## 🚀 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your-production-mongodb-uri
REDIS_URL=your-production-redis-url
JWT_SECRET=your-production-jwt-secret
IBM_API_KEY=your-production-ibm-api-key
```

### Docker Deployment
```bash
# Build image
docker build -t tourmate-ai-backend .

# Run container
docker run -p 5000:5000 --env-file .env tourmate-ai-backend
```

## 🔧 Configuration

### Rate Limiting
- Default: 100 requests per 15 minutes per IP
- Configurable via `RATE_LIMIT_WINDOW_MS` and `RATE_LIMIT_MAX_REQUESTS`

### CORS
- Default origin: `http://localhost:3000`
- Configurable via `CORS_ORIGIN`

### File Uploads
- Max file size: 5MB
- Upload directory: `uploads/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the API documentation

## 🔄 Updates

Stay updated with the latest Granite model releases and API improvements by checking the IBM Cloud documentation and this repository regularly. 
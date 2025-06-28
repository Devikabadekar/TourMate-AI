# IBM Granite AI Setup Guide for TourMate-AI

This guide will help you set up IBM Granite AI models (Granite 3.3 Speech 8B and Granite 4.0 Tiny Preview) for your TourMate-AI project.

## 🎯 **Granite Models Configured**

### **Granite 3.3 Speech 8B** (`granite-3.3-speech-8b`)
- **Purpose**: Speech processing and conversation
- **Features**: 
  - Travel recommendations
  - Natural language understanding
  - Voice interaction capabilities
  - Multi-language support

### **Granite 4.0 Tiny Preview** (`granite-4.0-tiny-preview`)
- **Purpose**: Fast text processing
- **Features**:
  - Trip itinerary generation
  - Expense report analysis
  - Feedback analysis
  - Quick response generation

## 🔧 **Setup Steps**

### **Step 1: Create IBM Cloud Account**

1. **Go to IBM Cloud**:
   - Visit [IBM Cloud](https://cloud.ibm.com/)
   - Click "Sign up" or "Log in"

2. **Complete Registration**:
   - Fill in your details
   - Verify your email
   - Add payment method (free tier available)

### **Step 2: Create Watson Assistant**

1. **Access IBM Catalog**:
   - Go to "Catalog" in IBM Cloud
   - Search for "Watson Assistant"

2. **Create Service**:
   - Click "Watson Assistant"
   - Choose "Lite" plan (free tier)
   - Select your region (us-south recommended)
   - Click "Create"

3. **Launch Watson Assistant**:
   - Click "Launch Watson Assistant"
   - This opens the Watson Assistant interface

### **Step 3: Create Assistant**

1. **Create New Assistant**:
   - Click "Create assistant"
   - Choose "Create new"
   - Name it "TourMate-AI Assistant"
   - Click "Create assistant"

2. **Get Assistant ID**:
   - In your assistant, go to "Settings"
   - Copy the "Assistant ID" (looks like: `12345678-1234-1234-1234-123456789012`)

### **Step 4: Get API Credentials**

1. **Access API Keys**:
   - Go back to IBM Cloud
   - Go to "Manage" → "API Keys"
   - Click "Create an IBM Cloud API key"

2. **Create API Key**:
   - Name: "TourMate-AI API Key"
   - Click "Create"
   - **Copy the API key** (you won't see it again!)

3. **Get Service URL**:
   - Go to "Resource List"
   - Find your Watson Assistant service
   - Copy the "Service endpoint URL"

### **Step 5: Update Environment Variables**

Add these to your `.env` file:

```bash
# IBM Granite Configuration
IBM_API_KEY=your-ibm-api-key-here
IBM_URL=https://api.us-south.assistant.watson.cloud.ibm.com
IBM_ASSISTANT_ID=your-assistant-id-here
IBM_VERSION=2023-11-15
```

**Replace:**
- `your-ibm-api-key-here` → Your actual API key
- `your-assistant-id-here` → Your actual Assistant ID
- Update `IBM_URL` if you chose a different region

## 🧪 **Testing Your Setup**

### **Test Granite Integration**

After setting up your credentials:

```bash
# Test Granite AI integration
node test-granite.js
```

### **Expected Output**

```
🤖 Testing IBM Granite AI Integration...

📋 Available Models:
[
  {
    name: 'granite-3.3-speech-8b',
    description: 'Granite 3.3 Speech 8B for speech processing and conversation',
    capabilities: ['speech-to-text', 'text-to-speech', 'conversation']
  },
  {
    name: 'granite-4.0-tiny-preview',
    description: 'Granite 4.0 Tiny Preview for fast text processing',
    capabilities: ['text-generation', 'summarization', 'classification']
  }
]

🧪 Testing Granite 4.0 Tiny (Trip Planning)...
✅ Trip Itinerary Generated:
{
  "summary": "Business trip to New York...",
  "flights": {...},
  "accommodation": {...},
  "schedule": [...],
  "totalCost": "$2,850"
}

🎉 All Granite AI tests passed!
✅ Your IBM Granite integration is working correctly
```

## 🚀 **API Endpoints Available**

Once configured, these endpoints will be available:

### **Trip Planning**
```bash
POST /api/ai/plan-trip
{
  "destination": "New York",
  "startDate": "2024-02-15",
  "endDate": "2024-02-17",
  "purpose": "Business meeting",
  "travelers": 2,
  "budget": "$3000"
}
```

### **Travel Recommendations**
```bash
GET /api/ai/recommendations/Tokyo?tripType=business
```

### **Feedback Analysis**
```bash
POST /api/ai/analyze-feedback
{
  "feedback": "The trip was excellent...",
  "tripId": "trip_id_here"
}
```

### **Expense Reports**
```bash
POST /api/ai/expense-report
{
  "tripData": {...},
  "expenses": [...]
}
```

## 🔍 **Troubleshooting**

### **Common Issues**

1. **"Invalid API Key"**:
   - Check your IBM_API_KEY
   - Ensure the key is active
   - Verify you copied it correctly

2. **"Assistant not found"**:
   - Check your IBM_ASSISTANT_ID
   - Ensure the assistant exists
   - Verify the ID format

3. **"Service unavailable"**:
   - Check your IBM_URL
   - Ensure Watson Assistant is active
   - Verify your region selection

4. **"Rate limit exceeded"**:
   - Free tier has limits
   - Upgrade to paid plan if needed
   - Implement caching

### **Quick Fixes**

```bash
# Check environment variables
echo $IBM_API_KEY
echo $IBM_ASSISTANT_ID
echo $IBM_URL

# Test connection
curl -X GET "https://api.us-south.assistant.watson.cloud.ibm.com/instances/YOUR_INSTANCE_ID/v2/assistants/YOUR_ASSISTANT_ID" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## 💡 **Best Practices**

1. **Environment Variables**: Never commit API keys to git
2. **Error Handling**: Always handle API errors gracefully
3. **Caching**: Cache responses to reduce API calls
4. **Rate Limiting**: Implement rate limiting for your endpoints
5. **Monitoring**: Monitor API usage and costs

## 🎯 **Next Steps**

After successful setup:
1. Test all API endpoints
2. Integrate with frontend
3. Add error handling
4. Implement caching
5. Deploy to production

## 📞 **Need Help?**

- [IBM Cloud Documentation](https://cloud.ibm.com/docs/assistant)
- [Watson Assistant API Reference](https://cloud.ibm.com/apis/assistant)
- [IBM Support](https://www.ibm.com/support) 
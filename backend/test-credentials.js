import graniteService from './services/graniteService.js';

async function testCredentials() {
  console.log('🔑 Testing Your Watson Credentials...\n');
  
  console.log('📍 Your Service Info:');
  console.log('   CRN:', process.env.IBM_CRN || 'Not set');
  console.log('   GUID:', process.env.IBM_GUID || 'Not set');
  console.log('   Region: us-south');
  console.log('');

  // Check required environment variables
  const required = ['IBM_API_KEY', 'IBM_ASSISTANT_ID', 'IBM_URL'];
  const missing = required.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.log('❌ Missing required credentials:');
    missing.forEach(varName => console.log(`   - ${varName}`));
    console.log('\n💡 You need to:');
    console.log('1. Get IBM API Key from IBM Cloud → Manage → API Keys');
    console.log('2. Create Watson Assistant and get Assistant ID');
    console.log('3. Add them to your .env file');
    return;
  }

  console.log('✅ All required credentials found!');
  console.log('🧪 Testing connection...\n');

  try {
    // Test basic connection
    const models = graniteService.getAvailableModels();
    console.log('📋 Available Models:');
    console.log(JSON.stringify(models, null, 2));
    console.log('');

    // Test a simple operation
    console.log('🧪 Testing Granite 4.0 Tiny...');
    const testData = {
      destination: 'Dallas',
      startDate: '2024-02-15',
      endDate: '2024-02-16',
      purpose: 'Test business trip',
      travelers: 1,
      budget: '$1000'
    };

    const result = await graniteService.generateTripItinerary(testData);
    console.log('✅ Connection successful!');
    console.log('✅ Granite models are working');
    console.log('🎉 Your TourMate-AI is ready!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your IBM_API_KEY is correct');
    console.log('2. Verify your IBM_ASSISTANT_ID exists');
    console.log('3. Ensure Watson Assistant is active');
    console.log('4. Check your IBM Cloud account status');
  }
}

testCredentials(); 
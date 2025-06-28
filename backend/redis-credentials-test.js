import { createClient } from 'redis';

// Common Redis credential combinations to test
const testConfigs = [
  // Format: { name: 'description', url: 'connection_string' }
  {
    name: 'Standard Redis Cloud',
    url: 'redis://default:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT'
  },
  {
    name: 'Upstash Redis',
    url: 'redis://YOUR_HOST:YOUR_PORT'
  },
  {
    name: 'Redis with custom username',
    url: 'redis://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT'
  },
  {
    name: 'Local Redis',
    url: 'redis://localhost:6379'
  }
];

async function testRedisCredentials() {
  console.log('🔍 Redis Credentials Test Tool\n');
  console.log('This tool will help you find the correct Redis credentials.\n');
  
  console.log('📋 Common Redis credential formats:');
  console.log('1. Redis Cloud: redis://default:password@host:port');
  console.log('2. Upstash: redis://host:port (password in URL params)');
  console.log('3. Local: redis://localhost:6379');
  console.log('4. Custom: redis://username:password@host:port\n');

  console.log('💡 To find your credentials:');
  console.log('1. Go to your Redis service dashboard');
  console.log('2. Look for "Connection Details" or "Configuration"');
  console.log('3. Find your host, port, username, and password');
  console.log('4. Update the test URLs below with your actual values\n');

  console.log('🧪 Test your connection string:');
  console.log('Replace the placeholders in your .env file:');
  console.log('REDIS_URL=redis://username:password@host:port\n');

  // Test with environment variable if available
  const envRedisUrl = process.env.REDIS_URL;
  if (envRedisUrl) {
    console.log('🔍 Testing REDIS_URL from environment...');
    await testConnection('Environment REDIS_URL', envRedisUrl);
  } else {
    console.log('❌ No REDIS_URL found in environment');
    console.log('💡 Create a .env file with your REDIS_URL\n');
  }
}

async function testConnection(name, url) {
  console.log(`\n🧪 Testing: ${name}`);
  console.log(`URL: ${url.replace(/:[^:@]*@/, ':****@')}`); // Hide password in logs
  
  try {
    const client = createClient({
      url: url,
      socket: {
        connectTimeout: 5000,
        lazyConnect: true,
      },
    });

    client.on('connect', () => {
      console.log('🔄 Connecting...');
    });

    client.on('ready', () => {
      console.log('✅ Connected successfully!');
    });

    client.on('error', (err) => {
      console.log('❌ Connection failed:', err.message);
    });

    await client.connect();
    
    // Test basic operations
    await client.set('test', 'hello');
    const result = await client.get('test');
    await client.del('test');
    
    console.log('✅ Redis operations working correctly!');
    console.log('🎉 Your Redis credentials are correct!');
    
    await client.quit();
    return true;
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    
    // Provide helpful error messages
    if (error.message.includes('ECONNREFUSED')) {
      console.log('💡 Host/port might be incorrect');
    } else if (error.message.includes('WRONGPASS')) {
      console.log('💡 Password is incorrect');
    } else if (error.message.includes('NOAUTH')) {
      console.log('💡 Authentication required - check username/password');
    } else if (error.message.includes('ENOTFOUND')) {
      console.log('💡 Host not found - check your endpoint');
    }
    
    return false;
  }
}

// Instructions for manual testing
console.log('📝 Manual Testing Instructions:');
console.log('1. Get your Redis credentials from your service dashboard');
console.log('2. Create a .env file in the backend folder');
console.log('3. Add: REDIS_URL=redis://username:password@host:port');
console.log('4. Run: node redis-credentials-test.js');
console.log('5. Or run: node test-redis.js (for full test)\n');

// Run the test if REDIS_URL is available
if (process.env.REDIS_URL) {
  testRedisCredentials();
} else {
  console.log('💡 To test your credentials:');
  console.log('1. Create a .env file with your REDIS_URL');
  console.log('2. Run: node redis-credentials-test.js');
  console.log('3. Or run: node test-redis.js');
} 
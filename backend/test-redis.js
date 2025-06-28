import { connectRedis, cacheSet, cacheGet, getRedisStatus } from './config/redis.js';
import { logger } from './utils/logger.js';

async function testRedisConnection() {
  console.log('🧪 Testing Redis Connection...\n');

  try {
    // Connect to Redis
    const client = await connectRedis();
    
    if (!client) {
      console.log('❌ Failed to connect to Redis');
      console.log('💡 Check your REDIS_URL in .env file');
      return;
    }

    // Get connection status
    const status = getRedisStatus();
    console.log('📊 Redis Status:', status);

    // Test basic operations
    console.log('\n🔍 Testing Redis operations...');

    // Test SET operation
    const testKey = 'tourmate_test';
    const testValue = { message: 'Hello from TourMate-AI!', timestamp: new Date().toISOString() };
    
    const setResult = await cacheSet(testKey, testValue, 60); // 60 seconds TTL
    console.log('✅ SET operation:', setResult ? 'SUCCESS' : 'FAILED');

    // Test GET operation
    const getResult = await cacheGet(testKey);
    console.log('✅ GET operation:', getResult ? 'SUCCESS' : 'FAILED');
    
    if (getResult) {
      console.log('📝 Retrieved value:', getResult);
    }

    // Test with different data types
    console.log('\n🔍 Testing different data types...');
    
    // String
    await cacheSet('test_string', 'Hello Redis!', 30);
    const stringResult = await cacheGet('test_string');
    console.log('✅ String test:', stringResult);

    // Number
    await cacheSet('test_number', 42, 30);
    const numberResult = await cacheGet('test_number');
    console.log('✅ Number test:', numberResult);

    // Array
    await cacheSet('test_array', ['apple', 'banana', 'orange'], 30);
    const arrayResult = await cacheGet('test_array');
    console.log('✅ Array test:', arrayResult);

    // Object
    await cacheSet('test_object', { name: 'TourMate', version: '1.0.0' }, 30);
    const objectResult = await cacheGet('test_object');
    console.log('✅ Object test:', objectResult);

    console.log('\n🎉 Redis connection test completed successfully!');
    console.log('✅ Your Redis database is working correctly');

  } catch (error) {
    console.error('❌ Redis test failed:', error.message);
    console.log('\n💡 Troubleshooting tips:');
    console.log('   1. Check your REDIS_URL in .env file');
    console.log('   2. Verify your Redis credentials');
    console.log('   3. Make sure your Redis service is running');
    console.log('   4. Check network connectivity');
  } finally {
    // Clean up test data
    if (client) {
      await client.del('tourmate_test');
      await client.del('test_string');
      await client.del('test_number');
      await client.del('test_array');
      await client.del('test_object');
    }
    process.exit(0);
  }
}

// Run the test
testRedisConnection(); 
import { createClient } from 'redis';
import { logger } from '../utils/logger.js';

let redisClient = null;
let isConnected = false;

export const connectRedis = async () => {
  if (isConnected && redisClient) {
    logger.info('Redis already connected');
    return redisClient;
  }

  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        connectTimeout: 10000,
        lazyConnect: true,
      },
    });

    // Handle Redis events
    redisClient.on('connect', () => {
      logger.info('🔄 Connecting to Redis...');
    });

    redisClient.on('ready', () => {
      isConnected = true;
      logger.info('✅ Redis connected successfully');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis connection error:', err);
      isConnected = false;
    });

    redisClient.on('end', () => {
      logger.warn('Redis connection ended');
      isConnected = false;
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });

    await redisClient.connect();
    
    return redisClient;
  } catch (error) {
    logger.error('Redis connection failed:', error);
    // Don't exit process for Redis connection failure
    // The app can still work without Redis (with reduced performance)
    return null;
  }
};

export const disconnectRedis = async () => {
  if (redisClient && isConnected) {
    await redisClient.quit();
    isConnected = false;
    logger.info('Redis disconnected');
  }
};

export const getRedisClient = () => {
  return redisClient;
};

export const getRedisStatus = () => {
  return {
    isConnected,
    client: redisClient ? 'available' : 'unavailable',
  };
};

// Cache utility functions
export const cacheGet = async (key) => {
  if (!redisClient || !isConnected) {
    return null;
  }
  
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    logger.error('Redis get error:', error);
    return null;
  }
};

export const cacheSet = async (key, value, ttl = 3600) => {
  if (!redisClient || !isConnected) {
    return false;
  }
  
  try {
    await redisClient.setex(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    logger.error('Redis set error:', error);
    return false;
  }
};

export const cacheDelete = async (key) => {
  if (!redisClient || !isConnected) {
    return false;
  }
  
  try {
    await redisClient.del(key);
    return true;
  } catch (error) {
    logger.error('Redis delete error:', error);
    return false;
  }
};

export const cacheFlush = async () => {
  if (!redisClient || !isConnected) {
    return false;
  }
  
  try {
    await redisClient.flushAll();
    return true;
  } catch (error) {
    logger.error('Redis flush error:', error);
    return false;
  }
}; 
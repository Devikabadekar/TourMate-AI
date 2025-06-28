import express from 'express';
import { body, validationResult } from 'express-validator';
import graniteService from '../services/graniteService.js';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Validation middleware
const validateTripData = [
  body('destination').notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('purpose').notEmpty().withMessage('Trip purpose is required'),
  body('travelers').isInt({ min: 1 }).withMessage('At least 1 traveler is required'),
  body('budget').notEmpty().withMessage('Budget is required'),
];

/**
 * @route   GET /api/ai/models
 * @desc    Get available Granite models
 * @access  Public
 */
router.get('/models', async (req, res) => {
  try {
    const models = graniteService.getAvailableModels();
    res.json({
      success: true,
      data: {
        models,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error getting models:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get available models',
    });
  }
});

/**
 * @route   POST /api/ai/plan-trip
 * @desc    Generate AI-powered trip itinerary using Granite 4.0 Tiny
 * @access  Private
 */
router.post('/plan-trip', authenticateToken, validateTripData, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const tripData = {
      ...req.body,
      userId: req.user.id,
      companyPolicy: req.body.companyPolicy || 'Standard corporate travel policy',
    };

    logger.info(`Generating trip itinerary with Granite 4.0 Tiny for user ${req.user.id} to ${tripData.destination}`);

    const itinerary = await graniteService.generateTripItinerary(tripData);

    res.json({
      success: true,
      data: {
        itinerary,
        tripData,
        model: 'granite-4.0-tiny-preview',
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in plan-trip endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate trip itinerary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   GET /api/ai/recommendations/:destination
 * @desc    Get travel recommendations using Granite 3.3 Speech
 * @access  Private
 */
router.get('/recommendations/:destination', authenticateToken, async (req, res) => {
  try {
    const { destination } = req.params;
    const { tripType = 'business' } = req.query;

    logger.info(`Getting recommendations with Granite 3.3 Speech for ${destination} (${tripType} travel)`);

    const recommendations = await graniteService.getTravelRecommendations(destination, tripType);

    res.json({
      success: true,
      data: {
        destination,
        tripType,
        recommendations,
        model: 'granite-3.3-speech-8b',
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in recommendations endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get travel recommendations',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/analyze-feedback
 * @desc    Analyze trip feedback using Granite 4.0 Tiny
 * @access  Private
 */
router.post('/analyze-feedback', authenticateToken, [
  body('feedback').notEmpty().withMessage('Feedback is required'),
  body('tripId').optional().isMongoId().withMessage('Valid trip ID is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { feedback, tripId } = req.body;

    logger.info(`Analyzing feedback with Granite 4.0 Tiny for trip ${tripId || 'unknown'}`);

    const analysis = await graniteService.analyzeTripFeedback(feedback);

    res.json({
      success: true,
      data: {
        analysis,
        tripId,
        model: 'granite-4.0-tiny-preview',
        analyzedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in analyze-feedback endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze trip feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/expense-report
 * @desc    Generate AI-powered expense report using Granite 4.0 Tiny
 * @access  Private
 */
router.post('/expense-report', authenticateToken, [
  body('tripData').isObject().withMessage('Trip data is required'),
  body('expenses').isArray().withMessage('Expenses array is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { tripData, expenses } = req.body;

    logger.info(`Generating expense report with Granite 4.0 Tiny for trip to ${tripData.destination}`);

    const expenseReport = await graniteService.generateExpenseReport(tripData, expenses);

    res.json({
      success: true,
      data: {
        expenseReport,
        tripData,
        expenses,
        model: 'granite-4.0-tiny-preview',
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in expense-report endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate expense report',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/chat/speech
 * @desc    Chat with Granite 3.3 Speech for natural conversation
 * @access  Private
 */
router.post('/chat/speech', authenticateToken, [
  body('message').notEmpty().withMessage('Message is required'),
  body('sessionId').optional().isString().withMessage('Session ID must be a string'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { message, sessionId } = req.body;

    logger.info(`Speech chat with Granite 3.3 Speech from user ${req.user.id}`);

    const response = await graniteService.chatWithSpeech(message, sessionId);

    res.json({
      success: true,
      data: {
        response,
        sessionId: response.session_id || sessionId,
        model: 'granite-3.3-speech-8b',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in speech chat endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process speech chat message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/process/tiny
 * @desc    Process text with Granite 4.0 Tiny for fast operations
 * @access  Private
 */
router.post('/process/tiny', authenticateToken, [
  body('message').notEmpty().withMessage('Message is required'),
  body('sessionId').optional().isString().withMessage('Session ID must be a string'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { message, sessionId } = req.body;

    logger.info(`Processing with Granite 4.0 Tiny from user ${req.user.id}`);

    const response = await graniteService.processWithTiny(message, sessionId);

    res.json({
      success: true,
      data: {
        response,
        sessionId: response.session_id || sessionId,
        model: 'granite-4.0-tiny-preview',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in tiny processing endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process text with Tiny model',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/chat
 * @desc    General chat with model selection
 * @access  Private
 */
router.post('/chat', authenticateToken, [
  body('message').notEmpty().withMessage('Message is required'),
  body('modelType').isIn(['speech', 'tiny']).withMessage('Model type must be speech or tiny'),
  body('sessionId').optional().isString().withMessage('Session ID must be a string'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { message, modelType, sessionId } = req.body;

    logger.info(`Chat with ${modelType} model from user ${req.user.id}`);

    const response = await graniteService.sendMessage(message, sessionId, modelType);

    res.json({
      success: true,
      data: {
        response,
        sessionId: response.session_id || sessionId,
        model: graniteService.getModelInfo(modelType)?.name,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in chat endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process chat message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/ai/optimize-itinerary
 * @desc    Optimize existing itinerary using Granite 4.0 Tiny
 * @access  Private
 */
router.post('/optimize-itinerary', authenticateToken, [
  body('itinerary').isObject().withMessage('Itinerary is required'),
  body('feedback').optional().isString().withMessage('Feedback must be a string'),
  body('constraints').optional().isObject().withMessage('Constraints must be an object'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { itinerary, feedback, constraints } = req.body;

    const optimizationPrompt = `
Using Granite 4.0 Tiny, optimize this business trip itinerary based on feedback and constraints:

ORIGINAL ITINERARY:
${JSON.stringify(itinerary, null, 2)}

FEEDBACK:
${feedback || 'No specific feedback provided'}

CONSTRAINTS:
${JSON.stringify(constraints || {}, null, 2)}

Provide an optimized version that addresses the feedback while respecting the constraints.
    `;

    const response = await graniteService.sendMessage(optimizationPrompt, null, 'tiny');
    const optimizedItinerary = graniteService.parseItineraryResponse(response);

    res.json({
      success: true,
      data: {
        originalItinerary: itinerary,
        optimizedItinerary,
        feedback,
        constraints,
        model: 'granite-4.0-tiny-preview',
        optimizedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    logger.error('Error in optimize-itinerary endpoint:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to optimize itinerary',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   GET /api/ai/health
 * @desc    Check AI service health
 * @access  Public
 */
router.get('/health', async (req, res) => {
  try {
    // Test AI service connectivity with both models
    const speechSession = await graniteService.createSession('speech');
    await graniteService.closeSession(speechSession);
    
    const tinySession = await graniteService.createSession('tiny');
    await graniteService.closeSession(tinySession);

    res.json({
      success: true,
      message: 'AI service is healthy',
      models: graniteService.getAvailableModels(),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('AI service health check failed:', error);
    res.status(503).json({
      success: false,
      message: 'AI service is unavailable',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable',
    });
  }
});

export default router; 
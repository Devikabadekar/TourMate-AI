import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Validation middleware
const validateTrip = [
  body('destination').notEmpty().withMessage('Destination is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('purpose').notEmpty().withMessage('Trip purpose is required'),
];

/**
 * @route   GET /api/trips
 * @desc    Get all trips for the authenticated user
 * @access  Private
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Mock trips data - in real app, fetch from database
    const trips = [
      {
        id: '1',
        destination: 'Tokyo, Japan',
        startDate: '2024-03-15',
        endDate: '2024-03-20',
        purpose: 'Client Meeting',
        status: 'planned',
        budget: '$5,000',
        travelers: 2,
        createdAt: '2024-02-15T10:00:00Z',
      },
      {
        id: '2',
        destination: 'London, UK',
        startDate: '2024-04-10',
        endDate: '2024-04-15',
        purpose: 'Conference',
        status: 'completed',
        budget: '$3,500',
        travelers: 1,
        createdAt: '2024-01-20T14:30:00Z',
      },
    ];

    res.json({
      success: true,
      data: {
        trips,
        count: trips.length,
      },
    });
  } catch (error) {
    logger.error('Error getting trips:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trips',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   GET /api/trips/:id
 * @desc    Get a specific trip by ID
 * @access  Private
 */
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Mock trip data - in real app, fetch from database
    const trip = {
      id,
      destination: 'Tokyo, Japan',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      purpose: 'Client Meeting',
      status: 'planned',
      budget: '$5,000',
      travelers: 2,
      preferences: 'Business class flights, 4-star hotels',
      companyPolicy: 'Standard corporate travel policy',
      itinerary: {
        flights: {
          outbound: 'Departure: 2024-03-15 08:30 AM',
          return: 'Return: 2024-03-20 06:45 PM',
          cost: '$1,245'
        },
        accommodation: {
          hotel: 'Business District Premium Hotel',
          nights: 5,
          cost: '$180/night'
        },
        schedule: [
          { time: '09:00 AM', activity: 'Airport pickup & hotel check-in', type: 'transport' },
          { time: '11:00 AM', activity: 'Client meeting at downtown office', type: 'meeting' },
        ],
        totalCost: '$2,156',
        savings: '$340'
      },
      createdAt: '2024-02-15T10:00:00Z',
      updatedAt: '2024-02-15T10:00:00Z',
    };

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found',
      });
    }

    res.json({
      success: true,
      data: {
        trip,
      },
    });
  } catch (error) {
    logger.error('Error getting trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get trip',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/trips
 * @desc    Create a new trip
 * @access  Private
 */
router.post('/', authenticateToken, validateTrip, async (req, res) => {
  try {
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
      status: 'planned',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock trip creation - in real app, save to database
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
    };

    logger.info(`New trip created by user ${req.user.id} to ${tripData.destination}`);

    res.status(201).json({
      success: true,
      data: {
        trip: newTrip,
      },
    });
  } catch (error) {
    logger.error('Error creating trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create trip',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   PUT /api/trips/:id
 * @desc    Update a trip
 * @access  Private
 */
router.put('/:id', authenticateToken, validateTrip, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    // Mock trip update - in real app, update in database
    const updatedTrip = {
      id,
      ...updateData,
    };

    logger.info(`Trip ${id} updated by user ${req.user.id}`);

    res.json({
      success: true,
      data: {
        trip: updatedTrip,
      },
    });
  } catch (error) {
    logger.error('Error updating trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update trip',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete a trip
 * @access  Private
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Mock trip deletion - in real app, delete from database
    logger.info(`Trip ${id} deleted by user ${req.user.id}`);

    res.json({
      success: true,
      message: 'Trip deleted successfully',
    });
  } catch (error) {
    logger.error('Error deleting trip:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete trip',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   POST /api/trips/:id/feedback
 * @desc    Add feedback to a trip
 * @access  Private
 */
router.post('/:id/feedback', authenticateToken, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { rating, comment } = req.body;

    const feedback = {
      tripId: id,
      userId: req.user.id,
      rating,
      comment,
      createdAt: new Date(),
    };

    logger.info(`Feedback added to trip ${id} by user ${req.user.id}`);

    res.status(201).json({
      success: true,
      data: {
        feedback,
      },
    });
  } catch (error) {
    logger.error('Error adding feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router; 
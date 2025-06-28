import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Mock user profile - in real app, fetch from database
    const profile = {
      id: req.user.id,
      email: req.user.email,
      firstName: 'Demo',
      lastName: 'User',
      company: 'TourMate AI',
      role: req.user.role,
      preferences: {
        travelClass: 'business',
        hotelRating: '4-star',
        mealPreferences: 'vegetarian',
        language: 'English',
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-02-15T10:00:00Z',
    };

    res.json({
      success: true,
      data: {
        profile,
      },
    });
  } catch (error) {
    logger.error('Error getting profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authenticateToken, [
  body('firstName').optional().isString().withMessage('First name must be a string'),
  body('lastName').optional().isString().withMessage('Last name must be a string'),
  body('company').optional().isString().withMessage('Company must be a string'),
  body('preferences').optional().isObject().withMessage('Preferences must be an object'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const updateData = {
      ...req.body,
      updatedAt: new Date(),
    };

    // Mock profile update - in real app, update in database
    const updatedProfile = {
      id: req.user.id,
      email: req.user.email,
      ...updateData,
    };

    logger.info(`Profile updated by user ${req.user.id}`);

    res.json({
      success: true,
      data: {
        profile: updatedProfile,
      },
    });
  } catch (error) {
    logger.error('Error updating profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router; 
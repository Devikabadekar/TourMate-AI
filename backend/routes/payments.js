import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

/**
 * @route   POST /api/payments/create-intent
 * @desc    Create payment intent
 * @access  Private
 */
router.post('/create-intent', authenticateToken, [
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').isIn(['usd', 'eur', 'gbp']).withMessage('Currency must be usd, eur, or gbp'),
  body('tripId').optional().isString().withMessage('Trip ID must be a string'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { amount, currency, tripId } = req.body;

    // Mock payment intent creation - in real app, use Stripe
    const paymentIntent = {
      id: `pi_${Date.now()}`,
      amount,
      currency,
      status: 'requires_payment_method',
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      tripId,
      createdAt: new Date(),
    };

    logger.info(`Payment intent created for user ${req.user.id}: ${amount} ${currency}`);

    res.json({
      success: true,
      data: {
        paymentIntent,
      },
    });
  } catch (error) {
    logger.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment intent',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

/**
 * @route   GET /api/payments/history
 * @desc    Get payment history
 * @access  Private
 */
router.get('/history', authenticateToken, async (req, res) => {
  try {
    // Mock payment history - in real app, fetch from database
    const payments = [
      {
        id: '1',
        amount: 2156,
        currency: 'usd',
        status: 'succeeded',
        tripId: '1',
        description: 'Trip to Tokyo - Flights and Accommodation',
        createdAt: '2024-02-15T10:00:00Z',
      },
      {
        id: '2',
        amount: 3500,
        currency: 'usd',
        status: 'succeeded',
        tripId: '2',
        description: 'Trip to London - Conference Registration',
        createdAt: '2024-01-20T14:30:00Z',
      },
    ];

    res.json({
      success: true,
      data: {
        payments,
        totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
      },
    });
  } catch (error) {
    logger.error('Error getting payment history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment history',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    });
  }
});

export default router; 
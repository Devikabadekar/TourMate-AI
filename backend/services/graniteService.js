import AssistantV2 from 'ibm-watson/assistant/v2.js';
import { IamAuthenticator } from 'ibm-cloud-sdk-core';
import { logger } from '../utils/logger.js';
import { redisClient } from '../config/redis.js';

class GraniteService {
  constructor() {
    this.assistant = new AssistantV2({
      version: process.env.IBM_VERSION || '2023-11-15',
      authenticator: new IamAuthenticator({
        apikey: process.env.IBM_API_KEY,
      }),
      serviceUrl: process.env.IBM_URL,
    });
    
    this.assistantId = process.env.IBM_ASSISTANT_ID;
    this.sessionId = null;
    
    // Granite model configurations
    this.models = {
      speech: {
        name: 'granite-3.3-speech-8b',
        description: 'Granite 3.3 Speech 8B for speech processing and conversation',
        capabilities: ['speech-to-text', 'text-to-speech', 'conversation']
      },
      tiny: {
        name: 'granite-4.0-tiny-preview',
        description: 'Granite 4.0 Tiny Preview for fast text processing',
        capabilities: ['text-generation', 'summarization', 'classification']
      }
    };
  }

  /**
   * Create a new session for the assistant with specific model
   */
  async createSession(modelType = 'speech') {
    try {
      const model = this.models[modelType];
      if (!model) {
        throw new Error(`Invalid model type: ${modelType}`);
      }

      const response = await this.assistant.createSession({
        assistantId: this.assistantId,
        sessionContext: {
          model: model.name,
          capabilities: model.capabilities
        }
      });
      
      this.sessionId = response.result.session_id;
      logger.info(`Created new Granite session with ${model.name}: ${this.sessionId}`);
      return this.sessionId;
    } catch (error) {
      logger.error('Error creating Granite session:', error);
      throw new Error('Failed to create AI session');
    }
  }

  /**
   * Send a message to the Granite assistant with model selection
   */
  async sendMessage(message, sessionId = null, modelType = 'speech') {
    try {
      const session = sessionId || this.sessionId;
      if (!session) {
        await this.createSession(modelType);
      }

      const model = this.models[modelType];
      const response = await this.assistant.message({
        assistantId: this.assistantId,
        sessionId: session,
        input: {
          message_type: 'text',
          text: message,
        },
        context: {
          model: model.name,
          capabilities: model.capabilities
        }
      });

      return response.result;
    } catch (error) {
      logger.error('Error sending message to Granite:', error);
      throw new Error('Failed to communicate with AI assistant');
    }
  }

  /**
   * Generate trip itinerary using Granite 4.0 Tiny for fast processing
   */
  async generateTripItinerary(tripData) {
    try {
      const cacheKey = `trip_${JSON.stringify(tripData)}`;
      const cached = await redisClient.get(cacheKey);
      
      if (cached) {
        logger.info('Returning cached trip itinerary');
        return JSON.parse(cached);
      }

      const prompt = this.buildTripPrompt(tripData);
      const response = await this.sendMessage(prompt, null, 'tiny');
      
      const itinerary = this.parseItineraryResponse(response);
      
      // Cache the result for 1 hour
      await redisClient.setex(cacheKey, 3600, JSON.stringify(itinerary));
      
      return itinerary;
    } catch (error) {
      logger.error('Error generating trip itinerary:', error);
      throw new Error('Failed to generate trip itinerary');
    }
  }

  /**
   * Build a comprehensive prompt for trip planning optimized for Granite 4.0 Tiny
   */
  buildTripPrompt(tripData) {
    const {
      destination,
      startDate,
      endDate,
      purpose,
      travelers,
      budget,
      preferences,
      companyPolicy
    } = tripData;

    const duration = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)
    );

    return `
You are TourMate-AI powered by Granite 4.0 Tiny. Create a detailed business trip itinerary:

DESTINATION: ${destination}
DATES: ${startDate} to ${endDate} (${duration} days)
PURPOSE: ${purpose}
TRAVELERS: ${travelers} person(s)
BUDGET: ${budget}
PREFERENCES: ${preferences || 'Standard business travel'}
COMPANY POLICY: ${companyPolicy || 'Standard corporate policy'}

Provide structured JSON response with:
1. FLIGHTS: departure/return times, airlines, costs
2. ACCOMMODATION: hotel recommendations, location, amenities, nightly rate
3. SCHEDULE: daily activities with times, types (meeting/meal/transport/business)
4. LOGISTICS: transportation, venues, backup plans
5. COSTS: breakdown with total and savings
6. RECOMMENDATIONS: local customs, weather, emergency contacts

Format as valid JSON object.
    `;
  }

  /**
   * Parse the AI response into a structured itinerary
   */
  parseItineraryResponse(response) {
    try {
      const message = response.output?.generic?.[0]?.text || '';
      
      // Try to extract JSON from the response
      const jsonMatch = message.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      // Fallback: create structured response from text
      return {
        summary: message,
        flights: {
          outbound: 'To be determined based on availability',
          return: 'To be determined based on availability',
          cost: 'Estimated based on current rates'
        },
        accommodation: {
          hotel: 'Recommended business hotel',
          nights: 'Based on trip duration',
          cost: 'Estimated nightly rate'
        },
        schedule: [
          {
            time: '09:00 AM',
            activity: 'Business activities as planned',
            type: 'business'
          }
        ],
        totalCost: 'To be calculated',
        recommendations: message
      };
    } catch (error) {
      logger.error('Error parsing itinerary response:', error);
      return {
        error: 'Failed to parse AI response',
        rawResponse: response
      };
    }
  }

  /**
   * Get travel recommendations using Granite 3.3 Speech for better conversation
   */
  async getTravelRecommendations(destination, tripType = 'business') {
    try {
      const prompt = `
As TourMate-AI using Granite 3.3 Speech, provide comprehensive travel recommendations for ${destination} for ${tripType} travel. Include:
- Best time to visit
- Local customs and business etiquette
- Transportation options
- Safety considerations
- Must-visit business districts
- Recommended business hotels
- Local cuisine recommendations
- Emergency contacts
- Weather considerations
      `;

      const response = await this.sendMessage(prompt, null, 'speech');
      return response.output?.generic?.[0]?.text || 'No recommendations available';
    } catch (error) {
      logger.error('Error getting travel recommendations:', error);
      throw new Error('Failed to get travel recommendations');
    }
  }

  /**
   * Analyze trip feedback using Granite 4.0 Tiny for fast analysis
   */
  async analyzeTripFeedback(feedback) {
    try {
      const prompt = `
Using Granite 4.0 Tiny, analyze this trip feedback and provide insights:

${feedback}

Provide structured analysis:
1. Key positive aspects
2. Areas for improvement
3. Recommendations for similar trips
4. Cost optimization suggestions
5. Time management insights
      `;

      const response = await this.sendMessage(prompt, null, 'tiny');
      return response.output?.generic?.[0]?.text || 'No analysis available';
    } catch (error) {
      logger.error('Error analyzing trip feedback:', error);
      throw new Error('Failed to analyze trip feedback');
    }
  }

  /**
   * Generate expense report using Granite 4.0 Tiny for structured output
   */
  async generateExpenseReport(tripData, expenses) {
    try {
      const prompt = `
Using Granite 4.0 Tiny, generate an expense report for this business trip:

Trip Details:
${JSON.stringify(tripData, null, 2)}

Expenses:
${JSON.stringify(expenses, null, 2)}

Provide structured report with:
1. Categorized expense breakdown
2. Compliance with company policy
3. Potential reimbursement items
4. Cost optimization suggestions
5. Documentation requirements
      `;

      const response = await this.sendMessage(prompt, null, 'tiny');
      return response.output?.generic?.[0]?.text || 'No expense report available';
    } catch (error) {
      logger.error('Error generating expense report:', error);
      throw new Error('Failed to generate expense report');
    }
  }

  /**
   * Chat with Granite 3.3 Speech for natural conversation
   */
  async chatWithSpeech(message, sessionId = null) {
    try {
      return await this.sendMessage(message, sessionId, 'speech');
    } catch (error) {
      logger.error('Error in speech chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  /**
   * Process text with Granite 4.0 Tiny for fast operations
   */
  async processWithTiny(message, sessionId = null) {
    try {
      return await this.sendMessage(message, sessionId, 'tiny');
    } catch (error) {
      logger.error('Error in tiny processing:', error);
      throw new Error('Failed to process text');
    }
  }

  /**
   * Get model information
   */
  getModelInfo(modelType) {
    return this.models[modelType] || null;
  }

  /**
   * List available models
   */
  getAvailableModels() {
    return Object.keys(this.models).map(key => ({
      type: key,
      ...this.models[key]
    }));
  }

  /**
   * Close the current session
   */
  async closeSession(sessionId = null) {
    try {
      const session = sessionId || this.sessionId;
      if (session) {
        await this.assistant.deleteSession({
          assistantId: this.assistantId,
          sessionId: session,
        });
        logger.info(`Closed Granite session: ${session}`);
      }
    } catch (error) {
      logger.error('Error closing Granite session:', error);
    }
  }
}

export default new GraniteService(); 
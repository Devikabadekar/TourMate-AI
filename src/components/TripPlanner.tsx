import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Briefcase, 
  Plane, 
  Hotel, 
  Car,
  Brain,
  Loader,
  CheckCircle,
  Clock
} from 'lucide-react';

interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  purpose: string;
  travelers: number;
  budget: string;
  preferences: string;
}

const TripPlanner: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<TripFormData>();

  const onSubmit = async (data: TripFormData) => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated itinerary
    const mockItinerary = {
      destination: data.destination,
      duration: `${data.startDate} to ${data.endDate}`,
      summary: `Optimized ${Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 3600 * 24))}-day business trip to ${data.destination} for ${data.purpose.toLowerCase()}`,
      flights: {
        outbound: `Departure: ${data.startDate} 08:30 AM`,
        return: `Return: ${data.endDate} 06:45 PM`,
        cost: '$1,245'
      },
      accommodation: {
        hotel: 'Business District Premium Hotel',
        nights: Math.ceil((new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 3600 * 24)),
        cost: '$180/night'
      },
      schedule: [
        { time: '09:00 AM', activity: 'Airport pickup & hotel check-in', type: 'transport' },
        { time: '11:00 AM', activity: 'Client meeting at downtown office', type: 'meeting' },
        { time: '02:00 PM', activity: 'Business lunch at recommended restaurant', type: 'meal' },
        { time: '04:00 PM', activity: 'Site visit and facility tour', type: 'business' },
        { time: '07:00 PM', activity: 'Networking dinner with local partners', type: 'networking' }
      ],
      totalCost: '$2,156',
      savings: '$340'
    };
    
    setGeneratedItinerary(mockItinerary);
    setIsGenerating(false);
  };

  const purposes = [
    'Client Meeting',
    'Conference/Event',
    'Training/Workshop',
    'Site Visit',
    'Business Development',
    'Team Meeting',
    'Other'
  ];

  const budgetRanges = [
    'Under $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    'Above $10,000'
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Next
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Business Trip
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let our AI create the perfect itinerary tailored to your business needs, 
            company policies, and personal preferences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Trip Planning Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">AI Trip Planner</h3>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Destination
                </label>
                <input
                  {...register('destination', { required: 'Destination is required' })}
                  type="text"
                  placeholder="e.g., Tokyo, Japan"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
                {errors.destination && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination.message}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Start Date
                  </label>
                  <input
                    {...register('startDate', { required: 'Start date is required' })}
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {errors.startDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    End Date
                  </label>
                  <input
                    {...register('endDate', { required: 'End date is required' })}
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {errors.endDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                  )}
                </div>
              </div>

              {/* Purpose and Travelers */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="inline h-4 w-4 mr-1" />
                    Trip Purpose
                  </label>
                  <select
                    {...register('purpose', { required: 'Purpose is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select purpose</option>
                    {purposes.map(purpose => (
                      <option key={purpose} value={purpose}>{purpose}</option>
                    ))}
                  </select>
                  {errors.purpose && (
                    <p className="text-red-500 text-sm mt-1">{errors.purpose.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Travelers
                  </label>
                  <input
                    {...register('travelers', { required: 'Number of travelers is required', min: 1 })}
                    type="number"
                    min="1"
                    placeholder="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                  {errors.travelers && (
                    <p className="text-red-500 text-sm mt-1">{errors.travelers.message}</p>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range
                </label>
                <select
                  {...register('budget', { required: 'Budget range is required' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>
                )}
              </div>

              {/* Preferences */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Preferences (Optional)
                </label>
                <textarea
                  {...register('preferences')}
                  rows={3}
                  placeholder="e.g., Vegetarian meals, early morning flights, specific hotel chains..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isGenerating}
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Generating Itinerary...</span>
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5" />
                    <span>Generate AI Itinerary</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Generated Itinerary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {isGenerating && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    AI is crafting your perfect itinerary...
                  </h3>
                  <p className="text-gray-600">
                    Analyzing destinations, optimizing schedules, and finding the best deals.
                  </p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Processing travel requirements...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {generatedItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Itinerary Generated!</h3>
                    <p className="text-sm text-gray-600">{generatedItinerary.summary}</p>
                  </div>
                </div>

                {/* Trip Overview */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Plane className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Flights</span>
                    </div>
                    <p className="text-sm text-gray-600">{generatedItinerary.flights.outbound}</p>
                    <p className="text-sm text-gray-600">{generatedItinerary.flights.return}</p>
                    <p className="text-sm font-semibold text-blue-600 mt-1">{generatedItinerary.flights.cost}</p>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Hotel className="h-5 w-5 text-indigo-600" />
                      <span className="font-semibold text-gray-900">Hotel</span>
                    </div>
                    <p className="text-sm text-gray-600">{generatedItinerary.accommodation.hotel}</p>
                    <p className="text-sm text-gray-600">{generatedItinerary.accommodation.nights} nights</p>
                    <p className="text-sm font-semibold text-indigo-600 mt-1">{generatedItinerary.accommodation.cost}</p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">Total Cost</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{generatedItinerary.totalCost}</p>
                    <p className="text-sm text-green-600">Saved {generatedItinerary.savings}</p>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Optimized Schedule
                  </h4>
                  <div className="space-y-3">
                    {generatedItinerary.schedule.map((item: any, index: number) => (
                      <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-medium text-blue-600 min-w-[80px]">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.type === 'meeting' ? 'bg-blue-100 text-blue-700' :
                          item.type === 'meal' ? 'bg-orange-100 text-orange-700' :
                          item.type === 'transport' ? 'bg-gray-100 text-gray-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book This Trip
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
                    Modify Itinerary
                  </button>
                </div>
              </motion.div>
            )}

            {!isGenerating && !generatedItinerary && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Plan Your Trip?
                </h3>
                <p className="text-gray-600">
                  Fill out the form to get your AI-generated itinerary with optimized schedules, 
                  cost-effective bookings, and personalized recommendations.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TripPlanner;
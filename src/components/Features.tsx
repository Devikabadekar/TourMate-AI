import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Globe, 
  FileText, 
  Clock, 
  Shield, 
  Zap,
  MapPin,
  CreditCard,
  MessageSquare
} from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Itinerary Generation',
      description: 'IBM Granite AI creates optimized travel plans based on your business requirements, preferences, and company policies.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Real-time Multilingual Support',
      description: 'Get instant translation and cultural insights for seamless communication during international business trips.',
      color: 'indigo'
    },
    {
      icon: FileText,
      title: 'Automated Trip Reports',
      description: 'Generate comprehensive post-trip summaries and expense reports with AI-powered data analysis.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Smart Scheduling',
      description: 'Optimize meeting schedules and travel times to maximize productivity and minimize jet lag.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Policy Compliance',
      description: 'Ensure all travel arrangements comply with company policies and budget constraints automatically.',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Instant Approvals',
      description: 'Streamlined approval workflows with automated routing to appropriate managers and stakeholders.',
      color: 'yellow'
    },
    {
      icon: MapPin,
      title: 'Location Intelligence',
      description: 'Get real-time insights about destinations including weather, local customs, and business etiquette.',
      color: 'teal'
    },
    {
      icon: CreditCard,
      title: 'Expense Management',
      description: 'Track and categorize expenses automatically with receipt scanning and currency conversion.',
      color: 'orange'
    },
    {
      icon: MessageSquare,
      title: '24/7 AI Assistant',
      description: 'Round-the-clock support for travel emergencies, rebooking, and real-time assistance.',
      color: 'pink'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    teal: 'bg-teal-100 text-teal-600',
    orange: 'bg-orange-100 text-orange-600',
    pink: 'bg-pink-100 text-pink-600'
  };

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Enterprise Travel
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your business travel experience with cutting-edge AI technology 
            and intelligent automation designed for modern enterprises.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business Travel?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of enterprises already using TourMate AI to streamline 
              their travel operations and boost employee productivity.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  Plane,
  TrendingUp,
  Users,
  Globe,
  FileText,
  Bell,
  Settings
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Trips', value: '12', icon: Plane, change: '+2 this week', color: 'blue' },
    { label: 'Total Savings', value: '$45,230', icon: DollarSign, change: '+12% this month', color: 'green' },
    { label: 'Countries Visited', value: '28', icon: Globe, change: '+3 this quarter', color: 'purple' },
    { label: 'Team Members', value: '156', icon: Users, change: '+8 this month', color: 'orange' }
  ];

  const recentTrips = [
    { destination: 'Tokyo, Japan', traveler: 'Sarah Chen', status: 'In Progress', date: '2024-01-15', cost: '$2,340' },
    { destination: 'London, UK', traveler: 'Mike Johnson', status: 'Completed', date: '2024-01-10', cost: '$1,890' },
    { destination: 'Singapore', traveler: 'Lisa Wang', status: 'Upcoming', date: '2024-01-20', cost: '$1,650' },
    { destination: 'Dubai, UAE', traveler: 'Alex Rodriguez', status: 'Planning', date: '2024-01-25', cost: '$2,100' }
  ];

  const upcomingTrips = [
    { destination: 'Berlin, Germany', date: '2024-01-18', traveler: 'Emma Davis', purpose: 'Conference' },
    { destination: 'Sydney, Australia', date: '2024-01-22', traveler: 'James Wilson', purpose: 'Client Meeting' },
    { destination: 'Toronto, Canada', date: '2024-01-28', traveler: 'Maria Garcia', purpose: 'Training' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'expenses', label: 'Expenses', icon: DollarSign },
    { id: 'reports', label: 'Reports', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Travel Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your enterprise travel operations</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Settings className="h-6 w-6" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                New Trip
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <stat.icon className={`h-6 w-6 ${
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Trips */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Trips</h3>
                <div className="space-y-4">
                  {recentTrips.map((trip, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{trip.destination}</p>
                          <p className="text-sm text-gray-600">{trip.traveler} • {trip.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{trip.cost}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          trip.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          trip.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          trip.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Trips */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Trips</h3>
                <div className="space-y-4">
                  {upcomingTrips.map((trip, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{trip.date}</span>
                      </div>
                      <p className="font-medium text-gray-900">{trip.destination}</p>
                      <p className="text-sm text-gray-600">{trip.traveler}</p>
                      <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full mt-2">
                        {trip.purpose}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">All Trips</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Plan New Trip
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Destination</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Traveler</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Cost</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTrips.map((trip, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-900">{trip.destination}</td>
                        <td className="py-3 px-4 text-gray-600">{trip.traveler}</td>
                        <td className="py-3 px-4 text-gray-600">{trip.date}</td>
                        <td className="py-3 px-4 text-gray-900 font-medium">{trip.cost}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            trip.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            trip.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                            trip.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {trip.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'expenses' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Spent (This Month)</span>
                    <span className="text-2xl font-bold text-gray-900">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Budget Remaining</span>
                    <span className="text-lg font-semibold text-green-600">$7,550</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600">62% of monthly budget used</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
                <div className="space-y-3">
                  {[
                    { category: 'Flights', amount: '$6,200', percentage: 50 },
                    { category: 'Hotels', amount: '$3,800', percentage: 31 },
                    { category: 'Meals', amount: '$1,450', percentage: 12 },
                    { category: 'Transport', amount: '$1,000', percentage: 8 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full" style={{ 
                          backgroundColor: index === 0 ? '#2563eb' : index === 1 ? '#3b82f6' : index === 2 ? '#60a5fa' : '#93c5fd' 
                        }}></div>
                        <span className="text-gray-700">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium text-gray-900">{item.amount}</span>
                        <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Travel Reports</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: 'Monthly Travel Summary', date: 'January 2024', type: 'PDF' },
                  { title: 'Expense Report Q4 2023', date: 'December 2023', type: 'Excel' },
                  { title: 'Policy Compliance Report', date: 'January 2024', type: 'PDF' },
                  { title: 'Carbon Footprint Analysis', date: 'Q4 2023', type: 'PDF' },
                  { title: 'Vendor Performance Report', date: 'December 2023', type: 'Excel' },
                  { title: 'Cost Savings Analysis', date: 'January 2024', type: 'PDF' }
                ].map((report, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">{report.type}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
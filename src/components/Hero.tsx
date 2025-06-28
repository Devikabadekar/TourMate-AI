import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { ArrowRight, Plane, Brain, Globe, Clock, Star, Shield, Zap, Play, MapPin, Calendar, Users } from 'lucide-react';


const Hero: React.FC = () => {
  const [showDemo, setShowDemo] = useState(false);
  const [showPlanning, setShowPlanning] = useState(false);

  const handleDemoClose = () => setShowDemo(false);
  const handleDemoShow = () => setShowDemo(true);
  const handlePlanningClose = () => setShowPlanning(false);
  const handlePlanningShow = () => setShowPlanning(true);

  const stats = [
    { icon: Plane, label: 'Trips Planned', value: '10,000+', color: 'primary' },
    { icon: Clock, label: 'Time Saved', value: '50,000 hrs', color: 'success' },
    { icon: Globe, label: 'Countries', value: '150+', color: 'info' },
    { icon: Brain, label: 'AI Accuracy', value: '98%', color: 'warning' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Planning',
      description: 'Smart itinerary generation with IBM Granite AI',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security for corporate travel',
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Worldwide travel support and assistance',
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Real-time reservations and confirmations',
      image: 'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const demoSteps = [
    {
      step: 1,
      title: 'Input Trip Details',
      description: 'Enter destination, dates, and business purpose',
      icon: MapPin
    },
    {
      step: 2,
      title: 'AI Processing',
      description: 'IBM Granite AI analyzes and optimizes your itinerary',
      icon: Brain
    },
    {
      step: 3,
      title: 'Smart Recommendations',
      description: 'Get personalized travel plans with cost optimization',
      icon: Star
    },
    {
      step: 4,
      title: 'Book & Manage',
      description: 'One-click booking and real-time trip management',
      icon: Plane
    }
  ];

  return (
    <>
      <section className="bg-professional section-padding">
        <Container fluid="xl">
          {/* Main Hero Content */}
          <Row className="align-items-center min-vh-100 py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* AI Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="d-inline-flex align-items-center bg-primary text-white px-4 py-2 rounded-pill mb-4"
                  style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
                >
                  <Brain className="me-2" size={16} />
                  <span className="fw-semibold">Powered by IBM Granite AI</span>
                </motion.div>

                {/* Main Heading */}
                <h1 className="display-2 fw-bold text-secondary-custom mb-4 lh-1">
                  Smart Travel
                  <span className="d-block text-primary-custom">Assistant for</span>
                  <span className="d-block text-secondary-custom">Enterprises</span>
                </h1>

                {/* Description */}
                <p className="lead text-muted mb-5 fs-4">
                  Automate your business travel planning with AI-powered itinerary generation, 
                  real-time multilingual assistance, and intelligent expense management.
                </p>

                {/* CTA Buttons */}
                <div className="d-flex flex-column flex-sm-row gap-3 mb-5">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      size="lg" 
                      className="btn-primary d-flex align-items-center"
                      onClick={handlePlanningShow}
                    >
                      <span className="me-2">Start Planning</span>
                      <ArrowRight size={20} />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline-primary" 
                      size="lg"
                      onClick={handleDemoShow}
                      className="d-flex align-items-center"
                    >
                      <Play size={18} className="me-2" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </div>

                {/* Stats */}
                <Row className="g-4">
                  {stats.map((stat, index) => (
                    <Col sm={6} md={3} key={stat.label}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="text-center"
                      >
                        <div className="d-flex justify-content-center mb-2">
                          <div className={`p-3 rounded-circle bg-${stat.color} bg-opacity-10`}>
                            <stat.icon className={`text-${stat.color}`} size={24} />
                          </div>
                        </div>
                        <div className="h3 fw-bold text-secondary-custom mb-1">{stat.value}</div>
                        <div className="text-muted small">{stat.label}</div>
                      </motion.div>
                    </Col>
                  ))}
                </Row>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="position-relative"
              >
                {/* Main Dashboard Card */}
                <Card className="shadow-lg border-0 position-relative overflow-hidden">
                  <Card.Header className="bg-white border-0 pb-0">
                    <div className="d-flex align-items-center">
                      <div className="d-flex gap-2 me-3">
                        <div className="bg-danger rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                        <div className="bg-warning rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                        <div className="bg-success rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                      </div>
                      <small className="text-muted fw-medium">TourMate AI Dashboard</small>
                    </div>
                  </Card.Header>
                  
                  <Card.Body className="p-4">
                    {/* AI Generated Alert */}
                    <div className="bg-primary bg-opacity-10 p-3 rounded-3 mb-4">
                      <div className="d-flex align-items-center mb-2">
                        <Brain className="text-primary me-2" size={20} />
                        <span className="fw-semibold text-secondary-custom">AI Itinerary Generated</span>
                      </div>
                      <p className="text-muted mb-0 small">
                        Your 3-day business trip to Tokyo has been optimized for maximum productivity.
                      </p>
                    </div>

                    {/* Trip Items */}
                    <div className="d-grid gap-3">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                        <span className="fw-medium">Flight to Tokyo</span>
                        <span className="badge-success">Confirmed</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                        <span className="fw-medium">Hotel Booking</span>
                        <span className="badge-success">Confirmed</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                        <span className="fw-medium">Meeting Schedule</span>
                        <span className="badge-info">Optimized</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="position-absolute"
                  style={{ top: '-20px', right: '-20px' }}
                >
                  <div className="bg-primary-gradient p-3 rounded-3 shadow-lg text-white">
                    <Globe size={24} />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  className="position-absolute"
                  style={{ bottom: '-15px', left: '-15px' }}
                >
                  <div className="bg-accent-gradient p-3 rounded-3 shadow-lg text-white">
                    <Plane size={20} />
                  </div>
                </motion.div>

                {/* Floating Travel Images */}
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="position-absolute"
                  style={{ top: '20%', left: '-30px' }}
                >
                  <img 
                    src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Business travel" 
                    className="rounded-3 shadow-lg border border-white border-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                </motion.div>

                <motion.div
                  animate={{ rotate: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="position-absolute"
                  style={{ top: '60%', right: '-25px' }}
                >
                  <img 
                    src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=100" 
                    alt="Airport terminal" 
                    className="rounded-circle shadow-lg border border-white border-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                </motion.div>
              </motion.div>
            </Col>
          </Row>

          {/* Feature Cards Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-5 pt-5"
          >
            <Row className="g-4">
              {features.map((feature, index) => (
                <Col md={6} lg={3} key={feature.title}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-100 border-0 shadow-sm position-relative overflow-hidden">
                      <div className="position-relative">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="card-img-top"
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-75 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all">
                          <feature.icon className="text-white" size={40} />
                        </div>
                      </div>
                      <Card.Body className="text-center">
                        <div className="d-flex justify-content-center mb-3">
                          <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                            <feature.icon className="text-primary" size={24} />
                          </div>
                        </div>
                        <h5 className="fw-bold text-secondary-custom mb-2">{feature.title}</h5>
                        <p className="text-muted small mb-0">{feature.description}</p>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-5 pt-5 text-center"
          >
            <p className="text-muted mb-4">Trusted by leading enterprises worldwide</p>
            <Row className="justify-content-center align-items-center">
              <Col xs="auto">
                <div className="d-flex align-items-center gap-2 text-muted">
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <Star className="text-warning" size={16} fill="currentColor" />
                  <span className="ms-2 fw-medium">4.9/5 Enterprise Rating</span>
                </div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Demo Modal */}
      <Modal show={showDemo} onHide={handleDemoClose} centered size="xl">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center">
            <div className="bg-primary-gradient p-2 rounded-circle me-3">
              <Play className="text-white" size={20} />
            </div>
            <span className="h4 mb-0 fw-bold">TourMate AI Demo</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="text-center mb-4">
            <h5 className="fw-bold text-secondary-custom mb-3">
              See How TourMate AI Transforms Business Travel
            </h5>
            <p className="text-muted">
              Watch our interactive demo to see how AI-powered travel planning works
            </p>
          </div>

          {/* Demo Video Placeholder */}
          <div className="position-relative mb-4">
            <div 
              className="bg-dark rounded-4 d-flex align-items-center justify-content-center"
              style={{ height: '400px', background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
            >
              <div className="text-center text-white">
                <div className="bg-white bg-opacity-20 p-4 rounded-circle mb-3 d-inline-flex">
                  <Play size={48} />
                </div>
                <h5 className="fw-bold">Interactive Demo Video</h5>
                <p className="mb-0">Click to start the demo experience</p>
              </div>
            </div>
          </div>

          {/* Demo Steps */}
          <Row className="g-4">
            {demoSteps.map((step, index) => (
              <Col md={6} lg={3} key={step.step}>
                <div className="text-center">
                  <div className="d-flex justify-content-center mb-3">
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle position-relative">
                      <step.icon className="text-primary" size={24} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        {step.step}
                      </span>
                    </div>
                  </div>
                  <h6 className="fw-bold text-secondary-custom mb-2">{step.title}</h6>
                  <p className="text-muted small mb-0">{step.description}</p>
                </div>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Button 
              className="btn-primary me-3"
              onClick={() => {
                handleDemoClose();
                handlePlanningShow();
              }}
            >
              Try It Now
            </Button>
            <Button variant="outline-secondary">
              Schedule Live Demo
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Start Planning Modal */}
      <Modal show={showPlanning} onHide={handlePlanningClose} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center">
            <div className="bg-primary-gradient p-2 rounded-circle me-3">
              <MapPin className="text-white" size={20} />
            </div>
            <span className="h4 mb-0 fw-bold">Start Planning Your Trip</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-5">
          <div className="text-center mb-4">
            <h5 className="fw-bold text-secondary-custom mb-3">
              Let AI Create Your Perfect Business Trip
            </h5>
            <p className="text-muted">
              Fill in your travel details and let our AI generate an optimized itinerary
            </p>
          </div>

          <form>
            <Row className="g-3">
              <Col md={6}>
                <label className="form-label fw-medium">
                  <MapPin size={16} className="me-2" />
                  Destination
                </label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g., Tokyo, Japan"
                />
              </Col>
              <Col md={6}>
                <label className="form-label fw-medium">
                  <Users size={16} className="me-2" />
                  Travelers
                </label>
                <select className="form-select">
                  <option>1 Traveler</option>
                  <option>2 Travelers</option>
                  <option>3+ Travelers</option>
                </select>
              </Col>
              <Col md={6}>
                <label className="form-label fw-medium">
                  <Calendar size={16} className="me-2" />
                  Departure Date
                </label>
                <input type="date" className="form-control" />
              </Col>
              <Col md={6}>
                <label className="form-label fw-medium">
                  <Calendar size={16} className="me-2" />
                  Return Date
                </label>
                <input type="date" className="form-control" />
              </Col>
              <Col xs={12}>
                <label className="form-label fw-medium">Trip Purpose</label>
                <select className="form-select">
                  <option>Client Meeting</option>
                  <option>Conference/Event</option>
                  <option>Training/Workshop</option>
                  <option>Site Visit</option>
                  <option>Other</option>
                </select>
              </Col>
              <Col xs={12}>
                <label className="form-label fw-medium">Budget Range</label>
                <select className="form-select">
                  <option>Under $1,000</option>
                  <option>$1,000 - $2,500</option>
                  <option>$2,500 - $5,000</option>
                  <option>$5,000+</option>
                </select>
              </Col>
              <Col xs={12}>
                <label className="form-label fw-medium">Special Requirements (Optional)</label>
                <textarea 
                  className="form-control" 
                  rows={3}
                  placeholder="e.g., Vegetarian meals, early flights, specific hotel chains..."
                ></textarea>
              </Col>
            </Row>

            <div className="d-grid gap-2 mt-4">
              <Button type="submit" size="lg" className="btn-primary">
                <Brain size={18} className="me-2" />
                Generate AI Itinerary
              </Button>
              <Button variant="outline-secondary" onClick={handlePlanningClose}>
                Save as Draft
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Hero;
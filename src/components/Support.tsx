import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Accordion, Form, Button, Tab, Tabs } from 'react-bootstrap';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Book,
  Search,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Video,
  FileText
} from 'lucide-react';

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('faq');

  const supportOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: 'Available 24/7',
      color: 'primary'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Business hours',
      color: 'success'
    },
    {
      icon: Book,
      title: 'Knowledge Base',
      description: 'Browse our comprehensive guides',
      availability: 'Always available',
      color: 'info'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Watch step-by-step instructions',
      availability: 'Self-paced learning',
      color: 'warning'
    }
  ];

  const faqs = [
    {
      question: 'How does TourMate AI generate travel itineraries?',
      answer: 'TourMate AI uses IBM Granite AI to analyze your travel requirements, company policies, budget constraints, and preferences to create optimized itineraries. The AI considers factors like flight schedules, hotel availability, meeting locations, and local transportation to provide the most efficient travel plan.',
      category: 'general'
    },
    {
      question: 'Is my company data secure with TourMate AI?',
      answer: 'Yes, we implement enterprise-grade security measures including end-to-end encryption, SOC 2 compliance, and GDPR compliance. All data is stored in secure, geographically distributed data centers with regular security audits and monitoring.',
      category: 'security'
    },
    {
      question: 'Can TourMate AI integrate with our existing travel management system?',
      answer: 'TourMate AI offers robust API integrations with major travel management platforms, expense management systems, and HR software. Our technical team can help configure custom integrations based on your specific requirements.',
      category: 'integration'
    },
    {
      question: 'What languages does TourMate AI support?',
      answer: 'TourMate AI supports over 50 languages for real-time translation and assistance. The platform can provide multilingual support for travelers, translate documents, and offer cultural insights for international destinations.',
      category: 'features'
    },
    {
      question: 'How much can we save with TourMate AI?',
      answer: 'On average, companies save 20-30% on travel costs through optimized booking, policy compliance, and automated expense management. The exact savings depend on your current travel volume and existing processes.',
      category: 'pricing'
    },
    {
      question: 'Do you offer training for our team?',
      answer: 'Yes, we provide comprehensive onboarding and training programs including live sessions, video tutorials, and documentation. Our customer success team ensures your team is fully equipped to maximize TourMate AI\'s benefits.',
      category: 'training'
    }
  ];

  const resources = [
    {
      title: 'Getting Started Guide',
      description: 'Complete setup and configuration guide',
      type: 'PDF',
      icon: FileText,
      downloadUrl: '#'
    },
    {
      title: 'API Documentation',
      description: 'Technical integration documentation',
      type: 'Web',
      icon: Book,
      downloadUrl: '#'
    },
    {
      title: 'Video Tutorial Series',
      description: 'Step-by-step video instructions',
      type: 'Video',
      icon: Video,
      downloadUrl: '#'
    },
    {
      title: 'Best Practices Guide',
      description: 'Optimize your travel management',
      type: 'PDF',
      icon: Download,
      downloadUrl: '#'
    }
  ];

  const statusItems = [
    { service: 'AI Engine', status: 'operational', uptime: '99.9%' },
    { service: 'Booking System', status: 'operational', uptime: '99.8%' },
    { service: 'Mobile App', status: 'operational', uptime: '99.9%' },
    { service: 'API Services', status: 'maintenance', uptime: '99.7%' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="text-success" size={20} />;
      case 'maintenance':
        return <AlertCircle className="text-warning" size={20} />;
      case 'down':
        return <AlertCircle className="text-danger" size={20} />;
      default:
        return <Info className="text-info" size={20} />;
    }
  };

  return (
    <div className="bg-professional" style={{ paddingTop: '100px' }}>
      {/* Hero Section */}
      <Container fluid="xl" className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h1 className="display-3 fw-bold text-secondary-custom mb-4">
            How can we <span className="text-primary-custom">help you?</span>
          </h1>
          <p className="lead text-muted fs-4 mx-auto" style={{ maxWidth: '800px' }}>
            Get the support you need to make the most of TourMate AI. 
            Our team is here to help you succeed.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-5"
        >
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Search for help articles, guides, or FAQs..."
                  className="form-control-lg ps-5"
                  style={{ paddingLeft: '3rem' }}
                />
                <Search 
                  className="position-absolute text-muted" 
                  size={20}
                  style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Support Options */}
        <Row className="g-4 mb-5">
          {supportOptions.map((option, index) => (
            <Col md={6} lg={3} key={option.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div className={`bg-${option.color} bg-opacity-10 p-3 rounded-circle`}>
                        <option.icon className={`text-${option.color}`} size={32} />
                      </div>
                    </div>
                    <h5 className="fw-bold text-secondary-custom mb-2">{option.title}</h5>
                    <p className="text-muted mb-2">{option.description}</p>
                    <small className="text-muted d-flex align-items-center justify-content-center">
                      <Clock size={14} className="me-1" />
                      {option.availability}
                    </small>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Main Content Tabs */}
      <Container fluid="xl" className="section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || 'faq')}
            className="nav-pills mb-4"
            justify
          >
            <Tab eventKey="faq" title="FAQ">
              <Row className="g-4">
                <Col lg={8}>
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-0">
                      <h4 className="fw-bold text-secondary-custom mb-0">
                        Frequently Asked Questions
                      </h4>
                    </Card.Header>
                    <Card.Body className="p-0">
                      <Accordion flush>
                        {faqs.map((faq, index) => (
                          <Accordion.Item key={index} eventKey={index.toString()}>
                            <Accordion.Header>
                              <div className="d-flex align-items-center">
                                <HelpCircle className="text-primary me-3" size={20} />
                                <span className="fw-medium">{faq.question}</span>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body className="text-muted">
                              {faq.answer}
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-primary-gradient text-white">
                      <h5 className="fw-bold mb-0">Still need help?</h5>
                    </Card.Header>
                    <Card.Body className="p-4">
                      <div className="d-grid gap-3">
                        <Button variant="outline-primary" className="d-flex align-items-center justify-content-center">
                          <MessageSquare size={18} className="me-2" />
                          Contact Support
                        </Button>
                        <Button variant="outline-success" className="d-flex align-items-center justify-content-center">
                          <Phone size={18} className="me-2" />
                          Schedule Call
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>

            <Tab eventKey="resources" title="Resources">
              <Row className="g-4">
                {resources.map((resource, index) => (
                  <Col md={6} lg={3} key={resource.title}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="border-0 shadow-sm h-100">
                        <Card.Body className="p-4 text-center">
                          <div className="d-flex justify-content-center mb-3">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                              <resource.icon className="text-primary" size={32} />
                            </div>
                          </div>
                          <h5 className="fw-bold text-secondary-custom mb-2">{resource.title}</h5>
                          <p className="text-muted mb-3">{resource.description}</p>
                          <span className="badge bg-secondary mb-3">{resource.type}</span>
                          <div className="d-grid">
                            <Button variant="outline-primary" size="sm">
                              <Download size={16} className="me-2" />
                              Access Resource
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Tab>

            <Tab eventKey="status" title="System Status">
              <Row className="justify-content-center">
                <Col lg={8}>
                  <Card className="border-0 shadow-sm">
                    <Card.Header className="bg-white border-0">
                      <h4 className="fw-bold text-secondary-custom mb-0">
                        System Status
                      </h4>
                    </Card.Header>
                    <Card.Body className="p-4">
                      <div className="d-grid gap-3">
                        {statusItems.map((item, index) => (
                          <div key={item.service} className="d-flex justify-content-between align-items-center p-3 bg-light rounded-3">
                            <div className="d-flex align-items-center">
                              {getStatusIcon(item.status)}
                              <span className="fw-medium ms-3">{item.service}</span>
                            </div>
                            <div className="text-end">
                              <div className="fw-medium text-success">{item.uptime} uptime</div>
                              <small className="text-muted text-capitalize">{item.status}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-success bg-opacity-10 rounded-3">
                        <div className="d-flex align-items-center">
                          <CheckCircle className="text-success me-3" size={24} />
                          <div>
                            <h6 className="fw-bold text-success mb-1">All Systems Operational</h6>
                            <small className="text-muted">Last updated: 2 minutes ago</small>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Tab>
          </Tabs>
        </motion.div>
      </Container>
    </div>
  );
};

export default Support;
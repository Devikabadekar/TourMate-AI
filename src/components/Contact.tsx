import React from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  MessageSquare,
  Send,
  Globe,
  Headphones
} from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'contact@tourmate.ai',
      description: 'Send us an email anytime',
      color: 'primary'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: '24/7 enterprise support',
      color: 'success'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'San Francisco, CA',
      description: 'Schedule an office visit',
      color: 'info'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: '24/7 Available',
      description: 'Global support coverage',
      color: 'warning'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, Suite 100',
      phone: '+1 (555) 123-4567',
      email: 'sf@tourmate.ai'
    },
    {
      city: 'New York',
      address: '456 Business Ave, Floor 25',
      phone: '+1 (555) 234-5678',
      email: 'ny@tourmate.ai'
    },
    {
      city: 'London',
      address: '789 Enterprise Rd, Level 15',
      phone: '+44 20 1234 5678',
      email: 'london@tourmate.ai'
    },
    {
      city: 'Tokyo',
      address: '321 Innovation Blvd, Tower A',
      phone: '+81 3 1234 5678',
      email: 'tokyo@tourmate.ai'
    }
  ];

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
            Get in <span className="text-primary-custom">Touch</span>
          </h1>
          <p className="lead text-muted fs-4 mx-auto" style={{ maxWidth: '800px' }}>
            Ready to transform your enterprise travel? Our team is here to help you get started 
            with TourMate AI and answer any questions you may have.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <Row className="g-4 mb-5">
          {contactInfo.map((info, index) => (
            <Col md={6} lg={3} key={info.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div className={`bg-${info.color} bg-opacity-10 p-3 rounded-circle`}>
                        <info.icon className={`text-${info.color}`} size={32} />
                      </div>
                    </div>
                    <h5 className="fw-bold text-secondary-custom mb-2">{info.title}</h5>
                    <p className="h6 text-primary-custom mb-2">{info.details}</p>
                    <p className="text-muted small mb-0">{info.description}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Contact Form & Map Section */}
      <Container fluid="xl" className="section-padding-sm">
        <Row className="g-5">
          {/* Contact Form */}
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border-0 shadow-lg">
                <Card.Header className="bg-primary-gradient text-white">
                  <div className="d-flex align-items-center">
                    <MessageSquare className="me-3" size={24} />
                    <h3 className="mb-0 fw-bold">Send us a Message</h3>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">First Name *</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter your first name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Last Name *</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter your last name"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Email Address *</Form.Label>
                          <Form.Control 
                            type="email" 
                            placeholder="Enter your email"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Company</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter your company name"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Phone Number</Form.Label>
                          <Form.Control 
                            type="tel" 
                            placeholder="Enter your phone number"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Subject *</Form.Label>
                          <Form.Select required>
                            <option value="">Select a subject</option>
                            <option value="demo">Request Demo</option>
                            <option value="pricing">Pricing Inquiry</option>
                            <option value="support">Technical Support</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Group>
                          <Form.Label className="fw-medium">Message *</Form.Label>
                          <Form.Control 
                            as="textarea" 
                            rows={5}
                            placeholder="Tell us how we can help you..."
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12}>
                        <Form.Check 
                          type="checkbox"
                          label="I agree to receive communications from TourMate AI"
                          required
                        />
                      </Col>
                      <Col xs={12}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button 
                            type="submit" 
                            size="lg" 
                            className="btn-primary d-flex align-items-center"
                          >
                            <Send size={18} className="me-2" />
                            Send Message
                          </Button>
                        </motion.div>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Quick Contact */}
          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg mb-4">
                <Card.Header className="bg-secondary-gradient text-white">
                  <div className="d-flex align-items-center">
                    <Headphones className="me-3" size={24} />
                    <h4 className="mb-0 fw-bold">Quick Contact</h4>
                  </div>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="d-grid gap-3">
                    <Button variant="outline-primary" size="lg" className="d-flex align-items-center justify-content-center">
                      <Phone size={18} className="me-2" />
                      Schedule a Call
                    </Button>
                    <Button variant="outline-success" size="lg" className="d-flex align-items-center justify-content-center">
                      <MessageSquare size={18} className="me-2" />
                      Live Chat
                    </Button>
                    <Button variant="outline-info" size="lg" className="d-flex align-items-center justify-content-center">
                      <Globe size={18} className="me-2" />
                      Request Demo
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Emergency Contact */}
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4 text-center">
                  <div className="bg-danger bg-opacity-10 p-3 rounded-circle d-inline-flex mb-3">
                    <Phone className="text-danger" size={24} />
                  </div>
                  <h5 className="fw-bold text-secondary-custom mb-2">24/7 Emergency Support</h5>
                  <p className="text-muted mb-3">For urgent travel assistance</p>
                  <p className="h5 text-danger fw-bold">+1 (555) 911-HELP</p>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Global Offices */}
      <Container fluid="xl" className="section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold text-secondary-custom mb-4">Global Offices</h2>
          <p className="lead text-muted">
            We're here to serve you across the globe
          </p>
        </motion.div>

        <Row className="g-4">
          {offices.map((office, index) => (
            <Col md={6} lg={3} key={office.city}>
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
                        <MapPin className="text-primary" size={24} />
                      </div>
                    </div>
                    <h5 className="fw-bold text-secondary-custom mb-3">{office.city}</h5>
                    <p className="text-muted mb-2">{office.address}</p>
                    <p className="text-primary-custom fw-medium mb-1">{office.phone}</p>
                    <p className="text-muted small mb-0">{office.email}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Contact;
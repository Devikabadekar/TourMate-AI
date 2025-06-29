import React from 'react';
import { motion } from 'framer-motion';
import kartikImg from './img/WhatsApp Image 2025-06-28 at 10.41.37 PM.jpeg';
import devikaImg from './img/WhatsApp Image 2025-06-28 at 8.59.59 PM.jpeg';
import AyushmanImg from './img/WhatsApp Image 2025-06-29 at 12.00.00 PM.jpeg';

import { Container, Row, Col, Card } from 'react-bootstrap';
import { 
  Brain, 
  Globe, 
  Shield, 
  Users, 
  Award, 
  Target,
  Heart,
  Lightbulb,
  TrendingUp
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'Leveraging cutting-edge AI technology to revolutionize business travel',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Enterprise-grade security ensuring your data and travel information is protected',
      color: 'success'
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Putting our customers first with 24/7 support and personalized experiences',
      color: 'danger'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Worldwide coverage with local expertise in over 150 countries',
      color: 'info'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Trips Planned', icon: Target },
    { number: '500+', label: 'Enterprise Clients', icon: Users },
    { number: '150+', label: 'Countries Covered', icon: Globe },
    { number: '98%', label: 'Customer Satisfaction', icon: Award }
  ];

  const team = [
    {
      name: 'Kartik N. Yamsanwar',
      role: 'Full Stack Developer / Project Lead',
      image: kartikImg,
      description: 'Full Stack Developer exploring AI-driven solutions in travel tech.'
    },
    {
      name: 'Devika Badekar',
      role: 'UI + Backend Contributor',
      image: devikaImg,
      description: 'MERN Stack Developer passionate about full-stack web solutions.'
    },
    {
      name: 'Avadhoot Joshi',
      role: 'Backend + API Integration',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Backend Developer with a strong interest in AI and cloud-based APIs.'
    },
    {
      name: 'Ananya K',
      role: 'Backend + API Integration',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Backend Developer focused on scalable APIs and efficient data handling.'
    },
    {
      name: 'Ayushman Paul',
      role: 'Backend + API Integration',
      image: AyushmanImg,
      description: 'IIT Kharagpur undergrad passionate about ML, GenAI, and tech-driven social impact.'
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
            About <span className="text-primary-custom">TourMate AI</span>
          </h1>
          <p className="lead text-muted fs-4 mx-auto" style={{ maxWidth: '800px' }}>
            We're revolutionizing enterprise travel with AI-powered automation, 
            making business trips smarter, safer, and more efficient for companies worldwide.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg mb-5">
            <Card.Body className="p-5 text-center">
              <div className="d-flex justify-content-center mb-4">
                <div className="bg-primary-gradient p-4 rounded-circle">
                  <Target className="text-white" size={40} />
                </div>
              </div>
              <h2 className="h3 fw-bold text-secondary-custom mb-3">Our Mission</h2>
              <p className="lead text-muted mb-0">
                To transform enterprise travel through intelligent automation, enabling businesses 
                to focus on what matters most while we handle the complexities of corporate travel management.
              </p>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>

      {/* Stats Section */}
      <Container fluid="xl" className="mb-5">
        <Row className="g-4">
          {stats.map((stat, index) => (
            <Col md={6} lg={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
              >
                <Card className="border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                        <stat.icon className="text-primary" size={32} />
                      </div>
                    </div>
                    <h3 className="display-6 fw-bold text-primary-custom mb-2">{stat.number}</h3>
                    <p className="text-muted mb-0 fw-medium">{stat.label}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Values Section */}
      <Container fluid="xl" className="section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold text-secondary-custom mb-4">Our Values</h2>
          <p className="lead text-muted">
            The principles that guide everything we do at TourMate AI
          </p>
        </motion.div>

        <Row className="g-4">
          {values.map((value, index) => (
            <Col md={6} lg={3} key={value.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4 text-center">
                    <div className="d-flex justify-content-center mb-3">
                      <div className={`bg-${value.color} bg-opacity-10 p-3 rounded-circle`}>
                        <value.icon className={`text-${value.color}`} size={32} />
                      </div>
                    </div>
                    <h4 className="fw-bold text-secondary-custom mb-3">{value.title}</h4>
                    <p className="text-muted mb-0">{value.description}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Team Section */}
      <Container fluid="xl" className="section-padding-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="display-5 fw-bold text-secondary-custom mb-4">Meet Our Team</h2>
          <p className="lead text-muted">
            The brilliant minds behind TourMate AI's innovation
          </p>
        </motion.div>

          <Row className="g-4 justify-content-center">
          {team.map((member, index) => (
            <Col md={6} lg={3} key={member.name}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                
                <Card className="border-0 shadow-sm h-100 ">
                  <div className="position-relative overflow-hidden ">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary bg-opacity-75 d-flex align-items-center justify-content-center opacity-0 hover-opacity-100 transition-all">
                      <Users className="text-white" size={40} />
                    </div>
                  </div>
                  <Card.Body className="p-4 text-center">
                    <h5 className="fw-bold text-secondary-custom mb-1">{member.name}</h5>
                    <p className="text-primary-custom fw-medium mb-3">{member.role}</p>
                    <p className="text-muted small mb-0">{member.description}</p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Technology Section */}
      <Container fluid="xl" className="section-padding-sm">
        <Row className="align-items-center">
          <Col lg={6} className="mb-4 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="d-flex align-items-center mb-4">
                <div className="bg-primary-gradient p-3 rounded-circle me-3">
                  <Brain className="text-white" size={32} />
                </div>
                <h2 className="display-6 fw-bold text-secondary-custom mb-0">
                  Developed by The CodeCruSaders
                </h2>
              </div>
              <p className="lead text-muted mb-4">
                Our partnership with IBM brings enterprise-grade AI capabilities to travel management, 
                ensuring intelligent decision-making and seamless automation.
              </p>
              <div className="d-grid gap-3">
                <div className="d-flex align-items-center">
                  <Lightbulb className="text-warning me-3" size={24} />
                  <span className="fw-medium">Advanced Natural Language Processing</span>
                </div>
                <div className="d-flex align-items-center">
                  <TrendingUp className="text-success me-3" size={24} />
                  <span className="fw-medium">Predictive Analytics & Optimization</span>
                </div>
                <div className="d-flex align-items-center">
                  <Shield className="text-primary me-3" size={24} />
                  <span className="fw-medium">Enterprise Security & Compliance</span>
                </div>
              </div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="AI Technology"
                className="img-fluid rounded-4 shadow-lg"
              />
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
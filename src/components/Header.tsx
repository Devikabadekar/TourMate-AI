import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from './img/WhatsApp Image 2025-06-27 at 9.23.13 PM.jpeg'; 
import { Navbar, Nav, Container, Button, Offcanvas, Modal, Form } from 'react-bootstrap';
import { Globe, User, Settings, Menu, Home, BarChart3, Star, HeadphonesIcon, Eye, EyeOff } from 'lucide-react';

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSignInClose = () => setShowSignIn(false);
  const handleSignInShow = () => setShowSignIn(true);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Features', path: '/#features', icon: Star },
    { name: 'Support', path: '/support', icon: HeadphonesIcon },
    { name: 'About', path: '/about', icon: Globe },
    { name: 'Contact', path: '/contact', icon: User },
  ];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in submitted');
    setShowSignIn(false);
  };

  return (
    <>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Navbar expand="lg" fixed="top" className="navbar-custom shadow-sm">
          <Container fluid="xl">
            {/* Brand - Only Text */}
            <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
  <img 
    src={logo} 
    alt="TourMate Logo" 
    height="40" 
    className="me-2"
    style={{ objectFit: 'contain' }}
  />
  <span className="navbar-brand fw-bold fs-3">TourMate AI</span>
</Navbar.Brand>


            {/* Desktop Navigation */}
            <Nav className="mx-auto d-none d-lg-flex">
              {navItems.map((item) => (
                <Nav.Link
                  key={item.name}
                  as={Link}
                  to={item.path}
                  className={`nav-link mx-2 d-flex align-items-center ${
                    location.pathname === item.path ? 'active' : ''
                  }`}
                >
                  <item.icon size={16} className="me-2" />
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>

            {/* Desktop Actions */}
            <div className="d-none d-lg-flex align-items-center gap-3">
              <Button variant="link" className="p-2 text-muted" title="Language">
                <Globe size={20} />
              </Button>
              <Button variant="link" className="p-2 text-muted" title="Settings">
                <Settings size={20} />
              </Button>
              <Button 
                className="btn-primary d-flex align-items-center"
                onClick={handleSignInShow}
              >
                <User size={16} className="me-2" />
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="link" 
              className="d-lg-none p-2 text-muted border-0"
              onClick={handleShow}
            >
              <Menu size={24} />
            </Button>

            {/* Mobile Offcanvas */}
            <Offcanvas show={show} onHide={handleClose} placement="end">
              <Offcanvas.Header closeButton className="border-bottom">
                <Offcanvas.Title>
                  <span className="navbar-brand fw-bold">TourMate AI</span>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  {navItems.map((item) => (
                    <Nav.Link
                      key={item.name}
                      as={Link}
                      to={item.path}
                      onClick={handleClose}
                      className={`nav-link py-3 d-flex align-items-center ${
                        location.pathname === item.path ? 'active' : ''
                      }`}
                    >
                      <item.icon size={18} className="me-3" />
                      {item.name}
                    </Nav.Link>
                  ))}
                </Nav>
                
                <hr className="my-4" />
                
                <div className="d-grid gap-3">
                  <div className="d-flex justify-content-around">
                    <Button variant="link" className="p-2 text-muted" title="Language">
                      <Globe size={20} />
                    </Button>
                    <Button variant="link" className="p-2 text-muted" title="Settings">
                      <Settings size={20} />
                    </Button>
                  </div>
                  <Button 
                    className="btn-primary d-flex align-items-center justify-content-center"
                    onClick={() => {
                      handleClose();
                      handleSignInShow();
                    }}
                  >
                    <User size={16} className="me-2" />
                    Sign In
                  </Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        </Navbar>
      </motion.div>

      {/* Sign In Modal */}
      <Modal show={showSignIn} onHide={handleSignInClose} centered size="lg">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div className="bg-primary-gradient p-3 rounded-circle me-3">
                <User className="text-white" size={24} />
              </div>
              <span className="h3 mb-0 fw-bold text-secondary-custom">
                {isLogin ? 'Welcome Back' : 'Join TourMate AI'}
              </span>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 pb-5">
          <div className="text-center mb-4">
            <p className="text-muted">
              {isLogin 
                ? 'Sign in to access your enterprise travel dashboard' 
                : 'Create your account to start planning smarter business trips'
              }
            </p>
          </div>

          <Form onSubmit={handleSignInSubmit}>
            {!isLogin && (
              <>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label className="fw-medium">First Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your first name"
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label className="fw-medium">Last Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Enter your last name"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-medium">Company</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter your company name"
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email Address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium">Password</Form.Label>
              <div className="position-relative">
                <Form.Control 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <Button
                  variant="link"
                  className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </Form.Group>

            {isLogin && (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Form.Check 
                  type="checkbox"
                  label="Remember me"
                />
                <Button variant="link" className="p-0 text-primary">
                  Forgot password?
                </Button>
              </div>
            )}

            <div className="d-grid mb-4">
              <Button type="submit" size="lg" className="btn-primary">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </div>

            <div className="text-center">
              <span className="text-muted">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </span>
              <Button 
                variant="link" 
                className="p-0 text-primary fw-medium"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </div>
          </Form>

          <hr className="my-4" />

          <div className="text-center">
            <p className="text-muted small mb-3">Or continue with</p>
            <div className="d-flex gap-3 justify-content-center">
              <Button variant="outline-secondary" className="flex-fill">
                <Globe size={16} className="me-2" />
                Google
              </Button>
              <Button variant="outline-secondary" className="flex-fill">
                <User size={16} className="me-2" />
                Microsoft
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
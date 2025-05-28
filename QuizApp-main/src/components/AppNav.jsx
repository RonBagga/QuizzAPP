import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaHome, FaQuestionCircle, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AppNav = () => {
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#4A90E2" }} variant="dark" sticky="top">
      <Container>
        {/* Navigate to home when clicking the brand title */}
        <Navbar.Brand onClick={() => navigate('/')} className="fw-bold" style={{ cursor: "pointer" }}>
          <FaQuestionCircle className="me-2" /> QuizApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Navigate to home */}
            <Nav.Link onClick={() => navigate('/')} className="text-light fw-semibold">
              <FaHome className="me-1" /> Home
            </Nav.Link>
            {/* Navigate to quiz */}
            <Nav.Link onClick={() => navigate('/quiz')} className="text-light fw-semibold">
              <FaQuestionCircle className="me-1" /> Quiz
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNav;

import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="mt-5">
        <h1 className="text-center fw-bold text-primary">About QuizApp</h1>
        <p className="text-center text-muted">Learn more about our mission and features.</p>
        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className="shadow-lg p-4 border-0">
              <Card.Body>
                <Card.Title className="fw-bold">Our Mission</Card.Title>
                <Card.Text>
                  QuizApp is designed to provide an engaging and interactive way to test your
                  knowledge. We aim to make learning fun and accessible to everyone.
                </Card.Text>
                <Card.Title className="fw-bold mt-3">Features</Card.Title>
                <ul>
                  <li>Wide range of quiz topics</li>
                  <li>Interactive and user-friendly design</li>
                  <li>Real-time scoring and feedback</li>
                  <li>Track your progress and improve</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default About;

import React from "react";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Container className="text-center mt-5">
        <h1 className="fw-bold text-primary">Welcome to QuizApp</h1>
        <p className="lead text-muted">Test your knowledge and improve your skills.</p>
        <Row className="justify-content-center my-4">
          <Col md={6}>
            <Card className="shadow-lg p-4 border-0">
              <Card.Body>
                <Card.Title className="fw-bold">Start Your Quiz</Card.Title>
                <Card.Text>Challenge yourself with exciting quizzes.</Card.Text>
                <Button 
                  variant="success" 
                  size="lg" 
                  className="me-2"
                  onClick={handleStartQuiz} // Fixed: Navigation works when button is clicked
                >
                  <FaPlay className="me-1" /> Start Quiz
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Home;

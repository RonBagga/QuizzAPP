import React from "react";
import { useDispatch } from "react-redux";
import { setTopic } from "../action";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLaptopCode, FaFutbol, FaGlobe, FaSpaceShuttle, FaNewspaper, FaMedal } from "react-icons/fa";

const quizTopics = [
  { name: "Science & Technology", icon: <FaLaptopCode />, color: "#4A90E2" },
  { name: "Sports", icon: <FaFutbol />, color: "#FF5733" },
  { name: "Entertainment", icon: <FaSpaceShuttle />, color: "#8E44AD" },
  { name: "General Knowledge & Current Affairs", icon: <FaNewspaper />, color: "#27AE60" },
  { name: "History & Mythology", icon: <FaGlobe />, color: "#F4C842" },
  { name: "Literature", icon: <FaMedal />, color: "#D35400" },
];

const Options = () => {
  const dispatch = useDispatch();

  const handleSelectTopic = (topic) => {
    dispatch(setTopic(topic));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container className="mt-5 text-center">
        <h1 className="fw-bold text-primary">Choose a Quiz Topic</h1>
        <p className="text-muted">Select your preferred topic and test your knowledge.</p>
        <Row className="mt-4">
          {quizTopics.map((topic, index) => (
            <Col md={4} sm={6} xs={12} key={index} className="mb-4">
              <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card 
                  style={{ backgroundColor: topic.color, color: "#fff", cursor: "pointer" }} 
                  className="shadow-lg border-0"
                  onClick={() => handleSelectTopic(topic.name)} // Dispatch action on click
                >
                  <Card.Body className="d-flex flex-column align-items-center">
                    <div className="display-4">{topic.icon}</div>
                    <Card.Title className="mt-3 fw-bold">{topic.name}</Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.div>
  );
};

export default Options;

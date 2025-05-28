import React, { useState, useEffect } from "react";
import { Container, Card, Button, ProgressBar, Row, Col, Spinner, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaClock, FaTrophy, FaRedo } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setLevel, updateScore } from "../action";
import { useNavigate } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const Questions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { topic, level, score } = useSelector((state) => state.quiz);

  const [questionData, setQuestionData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, [topic, level]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Generate a ${level} multiple-choice question about ${topic} with four options, a hint, the correct answer, and a brief reason for the answer. Return the response as a JSON object: { "question": "text", "options": ["A", "B", "C", "D"], "hint": "text", "answer": "correct option", "reason": "explanation" }`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      const parsedData = parseQuestion(data);
      setQuestionData(parsedData);
    } catch (error) {
      console.error("Error fetching question:", error);
      setQuestionData({
        question: "Error loading question. Please try again.",
        options: [],
        answer: "",
        reason: "",
      });
    } finally {
      setLoading(false);
      setTimeLeft(60);
    }
  };

  const parseQuestion = (response) => {
    try {
      if (!response || !response.candidates || !response.candidates[0]?.content?.parts) {
        throw new Error("Invalid API response format");
      }
      const text = response.candidates[0].content.parts[0].text;
      return JSON.parse(text);
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return {
        question: "Could not generate a valid question. Try refreshing.",
        options: [],
        answer: "",
        reason: "",
      };
    }
  };

  const handleAnswer = (selectedOption) => {
    if (!questionData) return;

    const isAnswerCorrect = selectedOption === questionData.answer;

    if (isAnswerCorrect) {
      dispatch(updateScore(10));
      setModalContent({
        type: "correct",
        body: `🎉 Well done! The correct answer is **${questionData.answer}**.\n\n📖 **Explanation:** ${questionData.reason}`,
        buttonText: "Next Question",
      });
    } else {
      dispatch(updateScore(-score)); // Reset score to 0
      setModalContent({
        type: "wrong",
        body: `❌ Incorrect! The correct answer is **${questionData.answer}**.\n\n📖 **Explanation:** ${questionData.reason}`,
        buttonText: "Restart Quiz",
      });
    }

    setShowModal(true);
  };

  const handleShowAnswer = () => {
    setModalContent({
      type: "answer",
      body: `📝 The correct answer is **${questionData?.answer}**.`,
      buttonText: "Next Question",
    });
    setShowModal(true);
  };

  const handleNextQuestion = () => {
    setShowModal(false);
    fetchQuestion();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container className="mt-5 text-center">
        <Card className="shadow-lg border-0 p-4">
          <Card.Body>
            <h4 className="text-primary fw-bold">
              {topic} Quiz - {level.charAt(0).toUpperCase() + level.slice(1)}
            </h4>
            <div className="d-flex justify-content-between align-items-center my-3">
              <span className="text-muted">
                <FaTrophy /> Score: {score}
              </span>
              <span className="text-danger">
                <FaClock /> Time Left: {timeLeft}s
              </span>
            </div>
            <ProgressBar now={(timeLeft / 60) * 100} animated className="mb-3" />

            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <h5 className="fw-bold">{questionData?.question || "Loading question..."}</h5>
                {questionData.options.length > 0 ? (
                  <Row className="mt-3">
                    {questionData.options.map((option, index) => (
                      <Col md={6} key={index} className="mb-3">
                        <Button
                          variant="outline-primary"
                          className="w-100"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </Button>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p className="text-danger">No valid options available.</p>
                )}
              </>
            )}

            <div className="d-flex justify-content-between mt-4">
              <Button variant="info" className="text-white" onClick={handleShowAnswer}>
                Show Answer
              </Button>
              <Button variant="secondary" onClick={fetchQuestion}>
                <FaRedo /> Refresh Question
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header className={`bg-${modalContent?.type === "correct" ? "success" : modalContent?.type === "wrong" ? "danger" : "info"} text-white`}>
          <Modal.Title className="fw-bold">
            {modalContent?.type === "correct" ? "🎉 Well Done!" : modalContent?.type === "wrong" ? "❌ Incorrect!" : "📝 Answer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p className="fw-semibold">{modalContent?.body}</p>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            variant={modalContent?.type === "wrong" ? "danger" : "primary"}
            className="fw-bold px-4"
            onClick={handleNextQuestion}
          >
            {modalContent?.buttonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </motion.div>
  );
};

export default Questions;

import { Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container } from "react-bootstrap";

import AppNav from './components/AppNav';
import HomePage from './pages/HomePage';
import Quiz from './pages/Quiz';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <AppNav /> {/* Navbar is outside Routes to be visible on all pages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </Container>
      </motion.div>
    </Provider>
  );
}

export default App;

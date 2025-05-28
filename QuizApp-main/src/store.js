import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './reducer';

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

export default store;
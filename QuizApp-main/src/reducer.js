const initialState = {
  topic: null,
  level: "easy",
  score: 0,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOPIC":
      return { ...state, topic: action.payload };

    case "SET_LEVEL":
      return { ...state, level: action.payload };

    case "UPDATE_SCORE":
      return { ...state, score: state.score + action.payload };

    case "RESET_SCORE":
      return { ...state, score: 0 };

    default:
      return state;
  }
};

export default quizReducer;

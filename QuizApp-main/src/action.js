export const setTopic = (topic) => ({
  type: "SET_TOPIC",
  payload: topic,
});

export const setLevel = (level) => ({
  type: "SET_LEVEL",
  payload: level,
});

export const updateScore = (score) => ({
  type: "UPDATE_SCORE",
  payload: score,
});

export const resetScore = () => ({
  type: "RESET_SCORE",
});

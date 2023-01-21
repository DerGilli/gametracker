import axios from "axios";

const API_URL = "/api/scores/";

const getScores = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createScore = async (scoreData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, scoreData, config);
  return response.data;
};

const updateScore = async (scoreData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + scoreData._id, scoreData, config);
  return response.data;
};

const deleteScore = async (scoreId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + scoreId, config);
  return response.data;
};

const scoreService = {
  getScores,
  createScore,
  updateScore,
  deleteScore,
};

export default scoreService;

import axios from "axios";

const API_URL = "http://localhost:5000/api/sessions/";

const getSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  console.log(response.data);
  return response.data;
};

const createSession = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, sessionData, config);
  return response.data;
};

const updateSession = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + sessionData.id,
    sessionData,
    config
  );
  return response.data;
};

const deleteSession = async (sessionId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + sessionId, config);
  return response.data;
};

const gameService = {
  getSessions,
  createSession,
  updateSession,
  deleteSession,
};

export default gameService;

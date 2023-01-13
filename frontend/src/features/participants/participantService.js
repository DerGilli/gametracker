import axios from "axios";

const API_URL = "http://localhost:5000/api/participants/";

const getParticipants = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createParticipant = async (participantData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, participantData, config);
  return response.data;
};

const updateParticipant = async (participantData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + participantData.id,
    participantData,
    config
  );
  return response.data;
};

const deleteParticipant = async (participantId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + participantId, config);
  return response.data;
};

const gameService = {
  getParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
};

export default gameService;

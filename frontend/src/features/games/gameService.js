import axios from "axios";

const API_URL = "/api/games/";

const getGames = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const createGame = async (gameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, gameData, config);
  return response.data;
};

const updateGame = async (gameData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(API_URL + gameData.id, gameData, config);
  return response.data;
};

const deleteGame = async (gameId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + gameId, config);
  return response.data;
};

const gameService = {
  getGames,
  createGame,
  updateGame,
  deleteGame,
};

export default gameService;

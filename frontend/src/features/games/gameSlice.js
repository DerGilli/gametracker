import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";

const initialState = {
  games: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getGames = createAsyncThunk("game/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await gameService.getGames(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createGame = createAsyncThunk(
  "game/create",
  async (game, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.createGame(game, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateGame = createAsyncThunk(
  "game/update",
  async (game, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.updateGame(game, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteGame = createAsyncThunk(
  "game/delete",
  async (gameId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.deleteGame(gameId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = action.payload;
      })
      .addCase(getGames.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.games = [];
      })
      .addCase(createGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = [...state.games, action.payload];
      })
      .addCase(createGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = [...state.games, action.payload];
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.games = [...state.games].filter(
          (game) => game.id !== action.payload.id
        );
      })
      .addCase(deleteGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;

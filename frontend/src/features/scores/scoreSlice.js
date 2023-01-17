import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import scoreService from "./scoreService";

const initialState = {
  scores: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getScores = createAsyncThunk("score/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await scoreService.getScores(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createScore = createAsyncThunk(
  "score/create",
  async (score, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scoreService.createScore(score, token);
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

export const updateScore = createAsyncThunk(
  "score/update",
  async (score, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scoreService.updateScore(score, token);
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

export const deleteScore = createAsyncThunk(
  "score/delete",
  async (scoreId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await scoreService.deleteScore(scoreId, token);
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

export const scoreSlice = createSlice({
  name: "score",
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
      .addCase(getScores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getScores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.scores = action.payload;
      })
      .addCase(getScores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.scores = [];
      })
      .addCase(createScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.scores.push(action.payload);
      })
      .addCase(createScore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const tmpScores = state.scores.filter(
          (score) => score._id !== action.payload._id
        );
        tmpScores.push(action.payload);
        state.scores = tmpScores;
      })
      .addCase(updateScore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteScore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteScore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.scores = state.scores.filter((score) => {
          return score._id !== action.payload.id;
        });
      })
      .addCase(deleteScore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = scoreSlice.actions;
export default scoreSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import participantService from "./participantService";

const initialState = {
  participants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getParticipants = createAsyncThunk(
  "participant/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await participantService.getParticipants(token);
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

export const createParticipant = createAsyncThunk(
  "participant/create",
  async (participant, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await participantService.createParticipant(participant, token);
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

export const updateParticipant = createAsyncThunk(
  "participant/update",
  async (participant, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await participantService.updateParticipant(participant, token);
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

export const deleteParticipant = createAsyncThunk(
  "participant/delete",
  async (participantId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await participantService.deleteParticipant(participantId, token);
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

export const participantSlice = createSlice({
  name: "participant",
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
      .addCase(getParticipants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getParticipants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.participants = action.payload;
      })
      .addCase(getParticipants.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.participants = [];
      })
      .addCase(createParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.participants.push(action.payload);
      })
      .addCase(createParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.participants = [...state.participants, action.payload];
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.participants = state.participants.filter((participant) => {
          return participant._id !== action.payload.id;
        });
      })
      .addCase(deleteParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = participantSlice.actions;
export default participantSlice.reducer;

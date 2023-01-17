import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "./sessionService";

const initialState = {
  sessions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getSessions = createAsyncThunk(
  "session/get",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.getSessions(token);
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

export const createSession = createAsyncThunk(
  "session/create",
  async (session, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.createSession(session, token);
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

export const updateSession = createAsyncThunk(
  "session/update",
  async (session, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.updateSession(session, token);
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

export const deleteSession = createAsyncThunk(
  "session/delete",
  async (sessionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sessionService.deleteSession(sessionId, token);
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

export const sessionSlice = createSlice({
  name: "session",
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
      .addCase(getSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = action.payload.sort((a, b) =>
          new Date(a.createdAt).getTime > new Date(b.createdAt).getTime ? 1 : -1
        );
      })
      .addCase(getSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.sessions = [];
      })
      .addCase(createSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = [action.payload, ...state.sessions];
      })
      .addCase(createSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = [...state.sessions, action.payload].sort((a, b) =>
          new Date(a.createdAt).getTime > new Date(b.createdAt).getTime ? 1 : -1
        );
      })
      .addCase(updateSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = state.sessions
          .filter((session) => {
            return session._id !== action.payload._id;
          })
          .sort((a, b) =>
            new Date(a.createdAt).getTime > new Date(b.createdAt).getTime
              ? 1
              : -1
          );
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = sessionSlice.actions;
export default sessionSlice.reducer;

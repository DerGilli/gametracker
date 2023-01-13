import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import gameReducer from "../features/games/gameSlice";
import participantReducer from "../features/participants/participantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    session: sessionReducer,
    participant: participantReducer,
  },
});

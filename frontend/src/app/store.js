import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sessionReducer from "../features/sessions/sessionSlice";
import gameReducer from "../features/games/gameSlice";
import participantsReducer from "../features/participants/participantsSlice";
import scoreReducer from "../features/scores/scoreSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
    session: sessionReducer,
    participants: participantsReducer,
    score: scoreReducer,
  },
});

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SessionForm from "../components/SessionForm";
import Spinner from "../components/Spinner";
import {
  getSessions,
  reset as sessionReset,
} from "../features/sessions/sessionSlice";
import { getParticipants } from "../features/participants/participantsSlice";
import { getGames } from "../features/games/gameSlice";
import { getScores } from "../features/scores/scoreSlice";
import { toast } from "react-toastify";
import SessionItem from "../components/SessionItem";
import { Card, CardContent, Grid } from "@mui/material";
import SessionDetail from "../components/SessionDetail";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedSession, setSelectedSession] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const sessionState = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getSessions());
    dispatch(getParticipants());
    dispatch(getGames());
    dispatch(getScores());
  }, [dispatch]);

  useEffect(() => {
    if (sessionState.isError) {
      toast.error(sessionState.message);
    }

    if (!user) {
      navigate("/login");
    }

    return () => {
      dispatch(sessionReset());
    };
  }, [user, navigate, sessionState.isError, sessionState.message, dispatch]);

  if (sessionState.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={12}>
          <SessionForm />
        </Grid>
        {sessionState.sessions.length > 0 ? (
          sessionState.sessions.map((session) => (
            <Grid xs={12} sm={6} md={4} item key={session._id}>
              <SessionItem
                session={session}
                onClick={() => setSelectedSession(session)}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <p className="text-lg text-center">
                  You don't have any sessions yet
                </p>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      {selectedSession && (
        <SessionDetail
          open={selectedSession !== null}
          handleClose={() => setSelectedSession(null)}
          session={selectedSession}
        />
      )}
    </>
  );
}

export default Dashboard;

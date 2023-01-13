import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SessionForm from "../components/SessionForm";
import Spinner from "../components/Spinner";
import {
  getSessions,
  reset as sessionReset,
} from "../features/sessions/sessionSlice";
import { getParticipants } from "../features/participants/participantSlice";
import { getGames } from "../features/games/gameSlice";
import { toast } from "react-toastify";
import SessionItem from "../components/SessionItem";
import { Card, CardContent, Grid } from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const sessionState = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getSessions());
    dispatch(getParticipants());
    dispatch(getGames());
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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <SessionForm />
      </Grid>
      {sessionState.sessions.length > 0 ? (
        sessionState.sessions.map((session) => (
          <Grid xs={12} md={6} item key={session._id}>
            <SessionItem session={session} />
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
  );
}

export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SessionForm from "../components/SessionForm";
import Spinner from "../components/Spinner";
import {
  getSessions,
  reset as sessionReset,
} from "../features/sessions/sessionSlice";
import { toast } from "react-toastify";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const sessionState = useSelector((state) => state.session);

  useEffect(() => {
    dispatch(getSessions());
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
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Session Dashboard</p>
      </section>

      <SessionForm />

      <section className="content">
        {sessionState.sessions.length > 0 ? (
          <div className="goals">
            {sessionState.sessions.map((session) => (
              <p key={session._id}>{session._id}</p>
            ))}
          </div>
        ) : (
          <h3>You don't have any sessions yet</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

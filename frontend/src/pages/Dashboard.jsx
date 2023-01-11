import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GameForm from "../components/GameForm";
import GameItem from "../components/GameItem";
import Spinner from "../components/Spinner";
import { getGames, reset } from "../features/games/gameSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { games, isLoading, isError, message } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    console.log(user);
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getGames());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GameForm />

      <section className="content">
        {games.length > 0 ? (
          <div className="goals">
            {games.map((game) => (
              <GameItem key={game._id} game={game} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;

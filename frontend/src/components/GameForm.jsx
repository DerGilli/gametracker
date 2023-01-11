import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGame } from "../features/games/gameSlice";

function GameForm() {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGame({ name }));
    setName("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GameForm;

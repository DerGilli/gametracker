import { Button } from "@mui/material";

function ScoreInput(props) {
  const handleIncrease = () => {
    props.handleChange(props.score.value + 1);
  };

  const handleDecrease = () => {
    props.handleChange(props.score.value - 1);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleDecrease}>
        -
      </Button>
      <input
        type="number"
        className="text-center w-12"
        value={props.score.value}
        onChange={(event) => props.handleChange(event.target.value)}
      />
      <Button variant="contained" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}
export default ScoreInput;

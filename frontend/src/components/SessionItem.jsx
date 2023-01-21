import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import boardGame from "../assets/default_board_game_small.jpg";

function SessionItem(props) {
  const gameState = useSelector((state) => state.game);
  const participantState = useSelector((state) => state.participants);
  const navigate = useNavigate();

  return (
    <Card onClick={props.onClick} classes={{ root: "h-full" }}>
      <CardMedia sx={{ height: 180 }} image={boardGame} title="boardgame" />
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <b>
            {
              gameState.games.find(
                (game) => game._id === props.session.game._id
              )?.name
            }
          </b>
          <small>
            {new Intl.DateTimeFormat("de-DE", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(props.session.createdAt))}
            {" Uhr"}
          </small>
        </div>
        <div className="flex gap-1 flex-wrap">
          {props.session.participants.map((participantID) => (
            <Chip
              key={participantID}
              variant="outlined"
              onClick={() => navigate(`/statistics/${participantID}`)}
              label={
                participantState.participants.find(
                  (participant) => participantID === participant._id
                )?.name
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default SessionItem;

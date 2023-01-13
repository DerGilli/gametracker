import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import { useSelector } from "react-redux";
import boardGame from "../assets/default_board_game_small.jpg";

function SessionItem(props) {
  const gameState = useSelector((state) => state.game);
  const participantState = useSelector((state) => state.participant);

  return (
    <Card>
      <CardMedia sx={{ height: 180 }} image={boardGame} title="green iguana" />
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between">
          <b>
            {
              gameState.games.find((game) => game._id === props.session.game)
                ?.name
            }
          </b>
          <span>
            {new Intl.DateTimeFormat("de-DE", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date(props.session.createdAt))}
            {" Uhr"}
          </span>
        </div>
        <div className="flex gap-1">
          {props.session.participants.map((participantID) => (
            <Chip
              key={participantID}
              variant="outlined"
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

import {
  Modal,
  Card,
  CardContent,
  CardMedia,
  Box,
  List,
  ListItem,
  ListItemText,
  CardActions,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import boardGame from "../assets/default_board_game_small.jpg";
import ScoreInput from "./ScoreInput";
import { updateScore } from "../features/scores/scoreSlice";
import { deleteSession } from "../features/sessions/sessionSlice";
import { useState } from "react";

function SessionDetail(props) {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const participantState = useSelector((state) => state.participant);
  const scoreState = useSelector((state) => state.score);

  const game = gameState.games.find((game) => game._id === props.session?.game);
  const participants = participantState.participants.filter((participant) =>
    props.session?.participants.includes(participant._id)
  );
  const [sessionScores, setSessionScores] = useState(
    scoreState.scores.filter((score) => score.session === props.session._id)
  );

  const handleUpdateScore = (value, score) => {
    const tmpScores = sessionScores
      .slice()
      .filter((other) => other._id !== score._id);
    tmpScores.push({ ...score, value });
    setSessionScores(tmpScores);
  };

  const handleSave = () => {
    sessionScores.forEach((score) => {
      console.log(score);
      dispatch(updateScore(score));
    });
    props.handleClose();
  };

  const handleDelete = () => {
    props.handleClose();
    dispatch(deleteSession(props.session._id));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      sx={{ display: "flex" }}
    >
      <Box sx={style}>
        <Card
          sx={{
            position: "relative",
          }}
        >
          <CardMedia
            sx={{ height: { xs: 140, sm: 240 } }}
            image={boardGame}
            title="boardgame"
          />
          <CardContent>
            <p className="text-2xl">{game?.name}</p>
            <List>
              {participants?.map((participant) => {
                const labelId = `checkbox-list-secondary-label-${participant.name}`;
                const score = sessionScores?.find(
                  (score) => score.participant === participant._id
                );
                return (
                  <ListItem
                    key={participant._id}
                    secondaryAction={
                      score && (
                        <ScoreInput
                          score={score}
                          handleChange={(value) =>
                            handleUpdateScore(value, score)
                          }
                        />
                      )
                    }
                  >
                    <ListItemText id={labelId} primary={participant.name} />
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
          <CardActions classes={{ root: "justify-between" }}>
            <Button size="large" variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Button size="large" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
export default SessionDetail;

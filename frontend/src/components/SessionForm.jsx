import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSession } from "../features/sessions/sessionSlice";
import { createScore } from "../features/scores/scoreSlice";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import {
  createParticipant,
  reset as participantReset,
} from "../features/participants/participantsSlice";
import { createGame, reset as gamesReset } from "../features/games/gameSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Card, Button, CardContent } from "@mui/material";

const filter = createFilterOptions();

function SessionForm() {
  const [game, setGame] = useState(null);
  const [participants, setParticipants] = useState(null);

  const participantState = useSelector((state) => state.participants);
  const gameState = useSelector((state) => state.game);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    let createdGame;
    if (game._id === undefined) {
      createdGame = await dispatch(createGame(game));
      console.log(createdGame);
    }

    const validParticipants = [];
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      if (participant._id === undefined) {
        const data = await dispatch(createParticipant(participant));
        validParticipants.push(data.payload);
      } else {
        validParticipants.push(participant);
      }
    }

    const createdSession = await dispatch(
      createSession({
        game: game._id ? game : createdGame.payload,
        participants: validParticipants.map((participant) => participant._id),
      })
    );

    for (let i = 0; i < validParticipants.length; i++) {
      const participant = validParticipants[i];
      console.log(participant);
      dispatch(
        createScore({
          value: 0,
          session: createdSession.payload._id,
          participant: participant._id,
        })
      );
    }

    setGame(null);
    setParticipants(null);
  };

  useEffect(() => {
    if (participantState.isError) {
      toast.error(participantState.message);
    }

    return () => {
      dispatch(participantReset());
    };
  }, [participantState.isError, participantState.message, dispatch]);

  useEffect(() => {
    if (gameState.isError) {
      toast.error(gameState.message);
    }

    return () => {
      dispatch(gamesReset());
    };
  }, [gameState.isError, gameState.message, dispatch]);

  if (participantState.isLoading) {
    return <Spinner />;
  }

  return (
    <Card>
      <CardContent>
        <p className="text-xl mb-3">Create Session</p>
        <form onSubmit={onSubmit}>
          <Grid container rowSpacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  multiple
                  freeSolo
                  autoHighlight
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  options={participantState.participants}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        name: inputValue,
                      });
                    }

                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Regular option
                    return option.name;
                  }}
                  onChange={(event, value) => setParticipants(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Participants" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  options={gameState.games}
                  freeSolo
                  autoHighlight
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Regular option
                    return option.name;
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        name: inputValue,
                      });
                    }

                    return filtered;
                  }}
                  onChange={(event, value) => setGame(value)}
                  renderInput={(params) => (
                    <TextField {...params} label="Game" />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default SessionForm;

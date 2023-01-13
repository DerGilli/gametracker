import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSession } from "../features/sessions/sessionSlice";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import {
  createParticipant,
  getParticipants,
  reset as participantReset,
} from "../features/participants/participantSlice";
import {
  createGame,
  getGames,
  reset as gamesReset,
} from "../features/games/gameSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@mui/material";

const filter = createFilterOptions();

function SessionForm() {
  const [game, setGame] = useState(null);
  const [participants, setParticipants] = useState(null);

  const participantState = useSelector((state) => state.participant);
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

    dispatch(
      createSession({
        game: game._id ? game : createdGame.payload,
        participants: validParticipants.map((participant) => participant._id),
      })
    );
    setGame(null);
    setParticipants(null);
  };

  useEffect(() => {
    dispatch(getParticipants());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

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
    <Box>
      <Accordion>
        <AccordionSummary>Create Session</AccordionSummary>
        <AccordionDetails>
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
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default SessionForm;

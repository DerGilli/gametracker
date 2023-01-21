import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getParticipant } from "../features/participants/participantsSlice";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Statistics() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { participant, isLoading } = useSelector((state) => state.participants);

  const [sessionData, setSessionData] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    dispatch(getParticipant(userId)).then((data) => {
      setSelectedSession(
        data.payload.sessions[data.payload.sessions.length - 1]._id
      );
    });
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedSession === null || participant === undefined) return;
    setSessionData(
      participant.sessions
        .find((session) => session._id === selectedSession)
        .participants.map((sessionParticipant) => {
          return {
            name: sessionParticipant.name,
            score: sessionParticipant.score,
          };
        })
    );
  }, [participant, selectedSession]);

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };

  const sessionCount = {};
  participant?.sessions?.forEach((session) => {
    if (sessionCount[session.game.name] === undefined) {
      sessionCount[session.game.name] = 1;
    } else {
      sessionCount[session.game.name] += 1;
    }
  });

  const sessionsData = Object.keys(sessionCount).map((key) => {
    return {
      name: key,
      value: sessionCount[key],
    };
  });
  sessionsData.sort((a, b) => (a.value < b.value ? 1 : -1));

  const playedAgaintCount = {};
  participant?.sessions?.forEach((session) => {
    session.participants.forEach((sessionParticipant) => {
      if (participant._id === sessionParticipant._id) return;
      if (playedAgaintCount[sessionParticipant.name] === undefined) {
        playedAgaintCount[sessionParticipant.name] = 1;
      } else {
        playedAgaintCount[sessionParticipant.name] += 1;
      }
    });
  });
  const pieData = Object.keys(playedAgaintCount).map((key) => {
    return {
      name: key,
      value: playedAgaintCount[key],
    };
  });
  pieData.sort((a, b) => (a.value < b.value ? 1 : -1));

  if (isLoading || sessionData === null) {
    return <Spinner />;
  }

  if (participant === null) {
    return (
      <Card>
        <CardContent>
          <p>Es ist ein Fehler aufgetreten</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <p className="text-4xl mb-12 text-center">{participant.name}</p>
          <Grid container className="mb-8" spacing={5}>
            <Grid item xs={12}>
              <p className="text-2xl border-b-2">Sessions</p>
            </Grid>
            <Grid item xs={12} sm={4}>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={sessionsData} dataKey="value" outerRadius="95%">
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Grid item xs={12} md={6} pl={3} pb={3}>
                <FormControl fullWidth>
                  <InputLabel>Session</InputLabel>
                  <Select
                    value={selectedSession}
                    label="Session"
                    labelId="select"
                    onChange={handleSessionChange}
                  >
                    {participant.sessions
                      .slice()
                      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                      .map((session) => {
                        return (
                          <MenuItem key={session._id} value={session._id}>
                            {`${session.game.name} (${new Date(
                              session.createdAt
                            ).toLocaleDateString()})`}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sessionData}>
                    <XAxis
                      dataKey="name"
                      tickFormatter={(tick) =>
                        tick.length <= 10 ? tick : tick.slice(0, 10) + "..."
                      }
                      padding={{ left: 50, right: 50 }}
                    />
                    <YAxis allowDecimals={false} width={20} />
                    <Tooltip />
                    <Bar dataKey="score" fill={COLORS[0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <p className="text-2xl border-b-2 mb-8">Opponents</p>
            </Grid>
            <Grid item xs={12}>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={pieData} outerRadius="90%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis />
                  <Tooltip />
                  <Radar dataKey="value" fill={COLORS[0]} fillOpacity={0.8} />
                </RadarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
export default Statistics;

import { Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getParticipant } from "../features/participants/participantsSlice";

function Statistics() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { participant, isLoading } = useSelector((state) => state.participants);

  useEffect(() => {
    dispatch(getParticipant(userId));
  }, [dispatch, userId]);

  if (isLoading) {
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
    <Card>
      <CardContent>
        <p className="text-2xl">{participant.name}</p>
      </CardContent>
    </Card>
  );
}
export default Statistics;

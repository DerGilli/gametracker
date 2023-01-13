import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {
  Card,
  CardContent,
  Button,
  FormControl,
  TextField,
} from "@mui/material";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto" }}>
      <CardContent>
        <section className="mb-5">
          <h1 className="text-4xl flex justify-center items-center gap-1">
            <FaSignInAlt /> Login
          </h1>
          <p className="text-center">Login and start tracking your games</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <FormControl fullWidth>
              <TextField
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl>
              <TextField
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Enter password"
                onChange={onChange}
              />
            </FormControl>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </section>
      </CardContent>
    </Card>
  );
}

export default Login;

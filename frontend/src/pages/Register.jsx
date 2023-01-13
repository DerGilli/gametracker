import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Button,
} from "@mui/material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

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

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Card sx={{ maxWidth: 800, margin: "auto" }}>
      <CardContent>
        <section className="mb-5">
          <h1 className="text-4xl flex justify-center items-center gap-1">
            <FaUser /> Register
          </h1>
          <p className="text-center">Please create an account</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <FormControl fullWidth>
              <TextField
                type="name"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Enter your name"
              />
            </FormControl>
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
            <FormControl>
              <TextField
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
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
export default Register;

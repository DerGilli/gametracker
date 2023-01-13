import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
} from "@mui/material";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="mb-5">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            {user ? (
              <>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <Link to="/">Dashboard</Link>
                </Typography>
                <Button onClick={onLogout} color="inherit">
                  <FaSignOutAlt /> Logout
                </Button>
              </>
            ) : (
              <div className="ml-auto flex">
                <Link className="flex items-center gap-1 px-4" to="/login">
                  <FaSignInAlt /> Login
                </Link>
                <Link className="flex items-center gap-1 px-4" to="/register">
                  <FaUser /> Register
                </Link>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  );
}
export default Header;

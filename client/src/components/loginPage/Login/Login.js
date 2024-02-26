import * as React from "react";
import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "../../../Services/axiosInterceptor";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

// const defaultTheme = createTheme();

function SignIn() {
  const primaryTextColor = '#42273b';
  const secondaryTextColor = '#F5F5F5';
  const primaryBackgroundColor = '#F5F5F5';
  const secondaryBackgroundColor = '#9ee493';
  const navBackgroundColor = '#daf7dc';
  const [cookies, setCookie] = useCookies(['user']);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    rememberMe: true
  });
  const handleInputChange = (event) => {
    const { name, value, checked, type } = event.target;

    // If the input is a checkbox, update the 'rememberMe' property
    // Otherwise, update the input property with the name
    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/auth/users/login", input);
      if (response.status === 200) {
        const rememberMeMaxAge = input.rememberMe ? 30 * 24 * 60 * 60 * 1000 : null; 
        const userCookie = [
          { name: 'token', value: response.data.token, options: {  maxAge: rememberMeMaxAge, path: '/' } },
          { name: 'email', value: response.data.email, options: {  maxAge: rememberMeMaxAge, path: '/' } },
          { name: 'name', value: response.data.name, options: {  maxAge: rememberMeMaxAge, path: '/' } },
          { name: 'locker', value: response.data.locker, options: {  maxAge: rememberMeMaxAge, path: '/' } },
          { name: 'rfid', value: response.data.rfid, options: {  maxAge: rememberMeMaxAge, path: '/' } },
          { name: 'tutorial', value: response.data.tutorial, options: {  maxAge: rememberMeMaxAge, path: '/' } }
        ];

        
        alert(response.data.message);
        userCookie.forEach(cookie => {
          setCookie(cookie.name, cookie.value, cookie.options);
        });
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const styles = {
    largeIcon: {
      width: 60,
      height: 60,
    },
  };

  return (
    <div>
      <Container component="main" maxWidth="xs" style={{ color: primaryTextColor }}>
        <CssBaseline />
        <Box

          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        
        >
          <Avatar sx={{ m: 1, bgcolor: secondaryBackgroundColor, fontSize: "Large" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={input.email} 
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={input.password}
              onChange={(e) =>
                setInput({
                  ...input,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              checked={input.rememberMe}
              name="rememberMe"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ color: secondaryTextColor, background: secondaryBackgroundColor }}
            >
              Sign In
            </Button>
            {loading && (
              <div className="loading-spinner-container" >
                <CircularProgress size={60} />
              </div>
            )}
            <Grid container>
              <Grid item xs>
                <Link to={"/reset-password"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}

export default SignIn;
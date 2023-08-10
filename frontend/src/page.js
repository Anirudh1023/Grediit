import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./login.js";
import Signup from "./signup.js";
import axios from "axios";
import { useNavigate } from "react-router";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";

const theme = createTheme();
export default function SignIn() {
  const navigate = useNavigate();
  const [mode, changemode] = useState(false);
  const [err, cherr] = useState(false);
  useEffect(function () {
    const user = JSON.parse(localStorage.getItem("data"));
    axios
      .post("/api", user)
      .then((data) => {
        console.log(data.data);
        if (data.data !== "Doesn't exist") navigate("/profile");
      })
      .catch((error) => console.log(error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/api/profiles", {
        Email: data.get("email"),
        Password: data.get("password"),
        Firstname: data.get("firstname"),
        Lastname: data.get("lastname"),
        Username: data.get("username"),
        Age: data.get("age"),
        Phone: data.get("contact"),
      })
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data.data));
        if (data.data !== "Already There") navigate("/profile");
        else cherr(true);
      })
      .catch((error) => console.log(error));
  };
  const handleSubmitlogin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Email = data.get("email");
    const Password = data.get("password");
    axios
      .post("/api", { Email, Password })
      .then((data) => {
        console.log(data.data);
        localStorage.setItem("data", JSON.stringify(data.data));
        if (data.data !== "Doesn't exist") navigate("/profile");
        else cherr(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 3, bgcolor: "secondary.main" }}>
            <img src="https://www.redditinc.com/assets/images/site/logo01.svg"></img>
          </Avatar>
          {mode ? (
            <div>
              {err ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
              ) : null}
              <Signup submit={handleSubmit} />
              <Link
                onClick={function () {
                  changemode(false);
                }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </div>
          ) : (
            <div>
              {err ? (
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  This is an error alert — <strong>check it out!</strong>
                </Alert>
              ) : null}
              <Login submit={handleSubmitlogin} />
              <Link
                variant="body2"
                onClick={function () {
                  changemode(true);
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>{" "}
            </div>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

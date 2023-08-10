import { styled } from "@mui/material/styles";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";
import { Email, Phone } from "@mui/icons-material";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import Moda from "./modal.js";
import Signup from "./signup.js";
import axios from "axios";

const ProfileContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(10),
  height: "100vh",
}));

const ProfileCard = styled(Card)(({ theme }) => ({
  maxWidth: 2000,
  margin: "auto",
  backgroundColor: theme.palette.primary.light,
  boxShadow: theme.shadows[10],
  borderRadius: theme.spacing(5),
  padding: theme.spacing(10),
  display: "flex",
  flexDirection: "row",
  minHeight: "50vh",
}));

const ProfileCardContent = styled(CardContent)({
  flex: "1",
});

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  margin: "auto",
  paddingRight: theme.spacing(5),
  borderRadius: theme.spacing(5),
}));

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("data"));
  useEffect(function () {
    axios
      .post("/api", user)
      .then((data) => {
        console.log(data);
        if (data.data === "Doesn't exist") navigate("/");
      })
      .catch((error) => console.log(error));
  }, []);
  function save(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const obj = {
      Email: user.Email,
      Password: data.get("password"),
      Firstname: data.get("firstname"),
      Lastname: data.get("lastname"),
      Username: data.get("username"),
      Age: data.get("age"),
      Phone: data.get("contact"),
    };
    console.log(obj);
    localStorage.removeItem("data");
    localStorage.setItem("data", JSON.stringify(obj));
    axios
      .patch("/api/profiles", obj)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  return (
    <ProfileContainer>
      <Container maxWidth="md">
        <ProfileCard>
          <ProfileAvatar src="https://i.insider.com/602ee9ced3ad27001837f2ac?width=750&format=jpeg&auto=webp" />
          <ProfileCardContent>
            <Typography variant="h4" component="div" color="textSecondary">
              {user.Username}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2}>
              {user.Firstname + " " + user.Lastname}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2}>
              {user.Age + " " + "Years"}
            </Typography>
            <br />
            <Divider variant="fullWidth" mt={6} mb={6} />
            <Typography variant="h6" component="div" color="textSecondary">
              Contact Information
            </Typography>
            <List>
              <ListItem disableGutters>
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText primary={user.Email} />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={user.Phone} />
              </ListItem>
            </List>
            <Moda
              name={"Edit Profile"}
              title={"Enter the fields"}
              content={
                <Signup
                  submit={save}
                  fname={user.Firstname}
                  lname={user.Lastname}
                  uname={user.Username}
                  pass={user.Password}
                  age={user.Age}
                  num={user.Phone}
                  mail={user.Email}
                  disabled={true}
                />
              }
            />
            <br />
            <Divider variant="fullWidth" mt={6} mb={6} />
            <Button
              variant=""
              onClick={function () {
                navigate("/subgreds");
              }}
            >
              Navigate to Subgreddiits
            </Button>
            <Button
              variant=""
              onClick={function () {
                localStorage.removeItem("data");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </ProfileCardContent>
        </ProfileCard>
      </Container>
    </ProfileContainer>
  );
}

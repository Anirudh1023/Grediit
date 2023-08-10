import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Moda from "./modal.js";
import Subs from "./subs.js";
import axios from "axios";
import { useNavigate } from "react-router";

const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  var obj = {};
  const mail = JSON.parse(localStorage.getItem("data")).Email;
  const [data, cdata] = useState([{}]);
  const [dis, cdis] = useState(false);
  useEffect(function () {
    axios
      .get("/api/subs/" + mail)
      .then((data) => cdata(data.data))
      .catch((error) => console.log(error));
  }, []);
  function save(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    obj = {
      CreatedBy: mail,
      Posts: 0,
      Followers: [mail],
      Title: data.get("title"),
      Content: data.get("content"),
      Image: data.get("img"),
      Bannedkeywords: data.get("banned"),
      Reports: [],
      Blocked: [],
      Requests: [],
      CreatedDate: new Date().toLocaleDateString(),
    };
    console.log(obj);
    axios
      .post("/api/subs/" + mail, obj)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    cdis(true);
  }
  function cards(card) {
    let len = card.Followers;
    return (
      <Grid key={card} item xs={12} sm={6} md={4}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={card.Image}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.Title}
            </Typography>
            <Typography>{card.Content}</Typography>
            <Typography>Banned Keywords : {card.Bannedkeywords}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={function () {
                navigate(`/subgreds/${card.Title}`);
              }}
            >
              Open
            </Button>
            <Button
              size="small"
              onClick={function () {
                const obj = {
                  CreatedBy: mail,
                  Title: card.Title,
                };
                console.log(obj);
                axios
                  .post("/api/subs", obj)
                  .then((data) => console.log(data.data))
                  .catch((error) => console.log(error));
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Subgreddiits
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Moda
                name={"Add"}
                title={"Enter the fields"}
                content={<Subs submit={save} />}
              />
              <Button
                variant="outlined"
                onClick={function () {
                  navigate("/allgreds");
                }}
              >
                All Subgreddiits
              </Button>
              <Button
                variant="outlined"
                onClick={function () {
                  navigate("/profile");
                }}
              >
                Profile
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {data.map(cards)}
            {dis ? cards(obj) : null}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

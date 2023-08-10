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
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "./navbar.js";

const theme = createTheme();

export default function Album() {
  const navigate = useNavigate();
  const mail = JSON.parse(localStorage.getItem("data")).Email;
  const [data, cdata] = useState([]);
  useEffect(function () {
    axios
      .get("/api/subs/")
      .then((data) => {
        cdata(data.data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  function NameAsc() {
    cdata([...data].sort((a, b) => a.Title.localeCompare(b.Title)));
  }
  function NameDesc() {
    cdata([...data].sort((a, b) => b.Title.localeCompare(a.Title)));
  }
  function Follow() {
    const sortedData = [...data].sort(
      (a, b) => b.Followers.length - a.Followers.length
    );
    cdata(sortedData);
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
              <Button
                variant="outlined"
                onClick={function () {
                  navigate("/");
                }}
              >
                Logout
              </Button>
              <Button
                variant="outlined"
                onClick={function () {
                  navigate("/subgreds");
                }}
              >
                My Subgreddiits
              </Button>
              <Button variant="outlined">Saved Posts</Button>
            </Stack>
          </Container>
        </Box>
        <Navbar
          nameasc={NameAsc}
          namedesc={NameDesc}
          followers={Follow}
          search={function (event) {
            const searchText = event.target.value;

            const filteredItems = data.filter((item) =>
              item.Title.toLowerCase().includes(searchText.toLowerCase())
            );
            cdata(filteredItems);
          }}
        />
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {console.log(data)}
            {data.map(function (card) {
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
                      <Typography>
                        Followers : {card.Followers.length}
                      </Typography>
                      <Typography>
                        Banned Keywords : {card.Bannedkeywords}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        disabled={card.Followers.includes(mail) ? true : false}
                        onClick={function () {
                          var newcomm = card.Requests;
                          if (!newcomm.includes(mail)) {
                            newcomm.push(mail);
                            const obj = {
                              Title: card.Title,
                              Requests: newcomm,
                            };
                            console.log(obj);
                            axios
                              .patch("/api/subs", obj)
                              .then((data) => console.log(data))
                              .catch((error) => console.log(error));
                          }
                        }}
                      >
                        Join
                      </Button>
                      <Button
                        size="small"
                        disabled={card.Followers.includes(mail) ? false : true}
                        onClick={function () {
                          navigate(`/allgreds/${card.Title}`);
                        }}
                      >
                        Open
                      </Button>
                      <Button
                        size="small"
                        disabled={
                          card.CreatedBy === mail ||
                          !card.Followers.includes(mail)
                            ? true
                            : false
                        }
                        onClick={function () {
                          var newcomm = card.Followers.filter(function (value) {
                            return value !== mail;
                          });
                          const obj = {
                            Title: card.Title,
                            Followers: newcomm,
                          };
                          console.log(obj);
                          axios
                            .patch("/api/subs", obj)
                            .then((data) => console.log(data))
                            .catch((error) => console.log(error));
                        }}
                      >
                        Leave
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

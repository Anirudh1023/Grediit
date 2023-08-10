import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import axios from "axios";

const theme = createTheme();

export default function BasicButtonGroup() {
  const value = useParams().val;
  console.log(value);
  const [state, chstate] = useState("users");
  const [data, chdata] = useState({
    CreatedBy: "",
    Posts: 0,
    Followers: [],
    Title: "",
    Content: "",
    Image: "",
    Bannedkeywords: "",
    Reports: [],
    Blocked: [],
    Requests: [],
  });
  useEffect(function () {
    const obj = { Title: value };
    axios
      .post("/api/subs", obj)
      .then((data) => chdata(data.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);
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
        ></Box>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={function () {
              chstate("users");
            }}
          >
            Users
          </Button>
          <Button
            onClick={function () {
              chstate("requests");
              console.log(state);
            }}
          >
            Joining requests page
          </Button>
          <Button
            onClick={function () {
              chstate("stats");
            }}
          >
            Stats
          </Button>
          <Button
            onClick={function () {
              chstate("reported");
            }}
          >
            Reported Page
          </Button>
        </ButtonGroup>
        {state === "users" ? (
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Followers</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.Followers.map(function (da) {
                  return <Typography>{da}</Typography>;
                })}
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Blocked users</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ) : state === "requests" ? (
          <List component="nav">
            {data.Requests.map(function (request) {
              return (
                <div>
                  <ListItem>
                    <ListItemText primary={request} />
                    <Button
                      size="small"
                      onClick={function () {
                        var newcomm1 = data.Followers;
                        var newcomm2 = data.Requests.filter(function (value) {
                          return value !== request;
                        });
                        newcomm1.push(request);
                        const obj = {
                          Title: data.Title,
                          Followers: newcomm1,
                          Requests: newcomm2,
                        };
                        console.log(obj);
                        axios
                          .patch("/api/subs", obj)
                          .then((data) => console.log(data))
                          .catch((error) => console.log(error));
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      size="small"
                      onClick={function () {
                        var newcomm2 = data.Requests.filter(function (value) {
                          return value !== request;
                        });
                        const obj = {
                          Title: data.Title,
                          Requests: newcomm2,
                        };
                        console.log(obj);
                        axios
                          .patch("/api/subs", obj)
                          .then((data) => console.log(data))
                          .catch((error) => console.log(error));
                      }}
                    >
                      Decline
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              );
            })}
          </List>
        ) : state === "reported" ? (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Reported By</TableCell>
                  <TableCell align="right">Reported On</TableCell>
                  <TableCell align="right">Concern</TableCell>
                  <TableCell align="right">Text</TableCell>
                  <TableCell align="right">Block user</TableCell>
                  <TableCell align="right">Ignore</TableCell>
                  <TableCell align="right">Delete Post</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.Reports.map(function (row) {
                  return (
                    <TableRow
                      key={row.By}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.By}
                      </TableCell>
                      <TableCell align="right">{row.On}</TableCell>
                      <TableCell align="right">{row.Concern}</TableCell>
                      <TableCell align="right">{row.Text}</TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={function () {
                            var a = row.Followers;
                            var b = row.Blocked;
                            b.push(row.Reports.On);
                            a = a.filter(function (val) {
                              return val !== row.Reports.On;
                            });
                            const obj = {
                              Title: value,
                              Followers: a,
                              Blocked: b,
                            };
                            axios
                              .patch("/api/subs", obj)
                              .then((data) => console.log(data.data))
                              .catch((error) => console.log(error));
                          }}
                        >
                          Block
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button size="small">Ignore</Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          onClick={function () {
                            var block = row.Reports.Title;
                            axios
                              .patch("/api/greds/" + block)
                              .then((data) => console.log(data.data))
                              .catch((error) => console.log(error));
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
      </Container>
    </ThemeProvider>
  );
}

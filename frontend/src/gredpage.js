import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Badge,
  CardActions,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {
  AddCircle,
  MoreVert,
  ThumbDown,
  ThumbUp,
  ThumbDownOutlined,
  ThumbUpOutlined,
  SaveOutlined,
  AddCircleOutlineOutlined,
  ReportOutlined,
} from "@mui/icons-material";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Post from "./post.js";
import Moda from "./modal.js";
import axios from "axios";
import Report from "./report.js";
import Comm from "./comment.js";

const MainContainer = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(10),
  minHeight: "100vh",
}));

const PostContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
}));

const PostHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const PostContent = styled(CardContent)({
  marginTop: 0,
});

const PostAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: red[500],
}));

const PostList = styled(List)({
  padding: 0,
  margin: 0,
});

const PostListItem = styled(ListItem)({
  padding: 0,
});

export default function Reddit() {
  const user = JSON.parse(localStorage.getItem("data"));
  const value = useParams().val;
  const [data, cdata] = useState([]);
  const [gred, cgred] = useState({});
  useEffect(function () {
    axios
      .get("/api/greds/" + value)
      .then((data) => cdata(data.data))
      .catch((error) => console.log(error));
    const obj = { Title: value };
    axios
      .post("/api/subs", obj)
      .then((data) => cgred(data.data))
      .catch((error) => console.log(error));
  }, []);
  function save1(event) {
    event.preventDefault();
    const Data = new FormData(event.currentTarget);
    const obj = {
      CreatedBy: user.Email,
      CreatedIn: gred.Title,
      Content: Data.get("content"),
      Comments: [],
      Upvotes: [],
      Downvotes: [],
    };
    console.log(obj);
    cdata([...data, obj]);
    axios
      .post("/api/greds/" + value, obj)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  return (
    <MainContainer maxWidth="md">
      <br />
      <PostContainer>
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 100, height: 100 }}
          src={gred.Image}
        />
        <Moda
          name={"Add"}
          title={"Enter the fields"}
          content={<Post submit={save1} />}
        />
        <Typography variant="h4" component="div" mb={4}>
          All posts in {value}
        </Typography>
        {data.map(function (d) {
          return (
            <div>
              <Card>
                <PostHeader
                  title={d.Content}
                  subheader={"Posted by " + d.CreatedBy}
                  action={
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  }
                />
              </Card>
              <PostContent>
                {console.log(d)}
                <CardActions>
                  <IconButton
                    onClick={function () {
                      var newcomm = d.Upvotes;
                      if (!newcomm.includes(user.Email))
                        newcomm.push(user.Email);
                      else {
                        newcomm = newcomm.filter(function (com) {
                          return com !== user.Email;
                        });
                      }
                      const obj = {
                        Title: d.Title,
                        Upvotes: newcomm,
                      };
                      console.log(obj);
                      axios
                        .patch("/api/greds/" + value, obj)
                        .then((data) => console.log(data))
                        .catch((error) => console.log(error));
                    }}
                  >
                    <Badge badgeContent={d.Upvotes.length} color="primary">
                      {d.Upvotes.includes(user.Email) ? (
                        <ThumbUp />
                      ) : (
                        <ThumbUpOutlined />
                      )}
                    </Badge>
                  </IconButton>
                  <IconButton
                    onClick={function () {
                      var newcomm = d.Downvotes;
                      if (!newcomm.includes(user.Email))
                        newcomm.push(user.Email);
                      else {
                        newcomm = newcomm.filter(function (com) {
                          return com !== user.Email;
                        });
                      }
                      const obj = {
                        Title: d.Title,
                        Downvotes: newcomm,
                      };
                      console.log(obj);
                      axios
                        .patch("/api/greds/" + value, obj)
                        .then((data) => console.log(data))
                        .catch((error) => console.log(error));
                    }}
                  >
                    <Badge badgeContent={d.Downvotes.length} color="primary">
                      {d.Downvotes.includes(user.Email) ? (
                        <ThumbDown />
                      ) : (
                        <ThumbDownOutlined />
                      )}
                    </Badge>
                  </IconButton>
                  <IconButton>
                    <SaveOutlined />
                  </IconButton>
                  <IconButton>
                    <AddCircleOutlineOutlined />
                  </IconButton>
                  {/* <IconButton>
                    <ReportOutlined />
                  </IconButton> */}
                  <Moda
                    name={"Report"}
                    title={"Enter the fields"}
                    content={
                      <Post
                        submit={function (event) {
                          event.preventDefault();
                          const Data = new FormData(event.currentTarget);
                          const obj = {
                            By: user.Email,
                            On: d.Email,
                            Concern: Data.get("content"),
                            Title: d.Title,
                          };
                          var change = gred.Reports;
                          change.push(obj);
                          const object = {
                            Title: gred.Title,
                            Reports: change,
                          };
                          console.log(object);
                          axios
                            .patch("/api/subs", object)
                            .then((data) => console.log(data))
                            .catch((error) => console.log(error));
                        }}
                      />
                    }
                  />
                </CardActions>
                <PostList>
                  <PostListItem>
                    <Comm
                      comm={d.Comments}
                      submit={function (event) {
                        event.preventDefault();
                        const Data = new FormData(event.currentTarget);
                        console.log(Data);
                        var newcomm = d.Comments;
                        newcomm.push(Data.get("content"));
                        const obj = {
                          Title: d.Title,
                          Comments: newcomm,
                        };
                        console.log(obj);
                        axios
                          .patch("/api/greds/" + value, obj)
                          .then((data) => console.log(data))
                          .catch((error) => console.log(error));
                      }}
                    />
                  </PostListItem>
                </PostList>
              </PostContent>
            </div>
          );
        })}
      </PostContainer>
    </MainContainer>
  );
}

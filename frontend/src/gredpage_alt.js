import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Badge,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  SaveOutlined,
  AddCircleOutlineOutlined,
  ReportOutlined,
} from "@mui/icons-material";

const Post = (props) => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    setComments([...comments, commentText]);
    setCommentText("");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.Title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.Content}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton>
          <Badge badgeContent={10} color="primary">
            <ThumbUpAltOutlined />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={5} color="primary">
            <ThumbDownAltOutlined />
          </Badge>
        </IconButton>
        <IconButton>
          <SaveOutlined />
        </IconButton>
        <IconButton>
          <AddCircleOutlineOutlined />
        </IconButton>
        <IconButton>
          <ReportOutlined />
        </IconButton>
      </CardActions>
      <CardContent>
        <TextField
          label="Leave a comment"
          multiline
          rows={4}
          variant="outlined"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleAddComment}>
          Post Comment
        </Button>
        <List sx={{ bgcolor: "#fff" }}>
          {comments.map((comment, index) => (
            <ListItem
              key={index}
              sx={{ bgcolor: index % 2 === 0 ? "#e3f2fd" : "#fafafa" }}
            >
              <ListItemText
                primary={comment}
                sx={{
                  color: index % 2 === 0 ? "primary.main" : "text.primary",
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Post;

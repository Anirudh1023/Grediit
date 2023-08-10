import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Login(props) {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Add new post
      </Typography>
      <Box component="form" onSubmit={props.submit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="text"
          label="Reported by"
          name="by"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="text"
          label="Reported on"
          name="on"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="text"
          label="concern"
          name="concern"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="text"
          label="Text of the post"
          name="text"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add
        </Button>
      </Box>
    </div>
  );
}

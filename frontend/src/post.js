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
          name="content"
          label="Enter Content"
          type="text"
          id="content"
          multiline
          rows={4}
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

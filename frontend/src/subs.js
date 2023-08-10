import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Login(props) {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Subgreddiits
      </Typography>
      <Box component="form" onSubmit={props.submit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          placeholder="Enter title"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="content"
          label="Content"
          type="content"
          id="content"
          placeholder="Enter content"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="img"
          label="Image"
          type="img"
          id="img"
          placeholder="Image URL"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="banned"
          label="Banned"
          type="bam"
          id="ban"
          placeholder="Enter Banned Keywords"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </div>
  );
}

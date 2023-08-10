import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function Signup(props) {
  return (
    <div>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={props.submit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstname"
              defaultValue={props.fname}
              // placeholder={props.fname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastname"
              defaultValue={props.lname}
              // placeholder={props.lname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              defaultValue={props.uname}
              // placeholder={props.uname}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              // placeholder={props.age}
              defaultValue={props.age}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="contact"
              name="contact"
              label="Contact"
              defaultValue={props.num}
              // placeholder={props.num}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              defaultValue={props.mail}
              // placeholder={props.mail}
              disabled={props.disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              type="password"
              id="password"
              label="Password"
              defaultValue={props.pass}
              // placeholder={props.pass}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

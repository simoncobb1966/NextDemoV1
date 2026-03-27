import React, { useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { ApiOneHandler } from "../routes";
import { User } from "~/types/User";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Notify from "~/components/Notify";

const Form: React.FunctionComponent = () => {
  const paperStyle = { padding: "25px 10px", width: 350, margin: "250px auto" };
  const headerStyle = { margin: 0 };
  const FormControlStyle = { marginTop: 5 };
  const [snackbarText, setSnackbarText] = useState<null | string>(null);
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: (payload: User) => ApiOneHandler("POST", { ...payload }),
    onError: (error) => {
      setSnackbarText(`Post Error ${error}`);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbarText("Posted");
    },
  });

  const onSubmit = async () => {
    const { firstName, lastName, status } = user;
    const payload = {
      firstName,
      lastName,
      status,
    };
    submitMutation.mutate(payload);
  };

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    status: false,
  });

  const changeHandler = (value: string, field: string) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        {snackbarText && <Notify text={snackbarText} />}
        <Grid>
          <h2 style={headerStyle}>MUI TUTORIAL v1</h2>
          <Typography variant="caption">
            Demo project for developers to learn quickly.
          </Typography>
        </Grid>
        {/* <form onSubmit={formHandel}> */}
        <TextField
          id="fn"
          fullWidth
          label="First Name"
          placeholder="enter your first name"
          style={{ marginTop: 10 }}
          value={user.firstName}
          onChange={(e) => changeHandler(e.currentTarget.value, "firstName")}
        />
        <TextField
          id="ln"
          fullWidth
          label="Last Name"
          placeholder="enter your last name"
          style={{ marginTop: 10 }}
          value={user.lastName}
          onChange={(e) => changeHandler(e.currentTarget.value, "lastName")}
        />
        <FormControl component="fieldset" style={FormControlStyle}>
          <FormLabel component="legend">Vote</FormLabel>
          <RadioGroup
            id="status"
            aria-label="status"
            name="status"
            style={{ display: "initial" }}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControlLabel
          control={<Checkbox name="checkedA" />}
          label="I accept the terms and conditions."
        />
        <Button onClick={onSubmit} variant="contained" color="primary">
          Submit
        </Button>
        {/* </form> */}
      </Paper>
    </Grid>
  );
};

export default Form;

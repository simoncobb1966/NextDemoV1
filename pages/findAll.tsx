"use client";
import React, { useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllApiOne, ApiOneHandler } from "../routes";
import Button from "@mui/material/Button";
import Notify from "~/components/Notify";
import Box from "@mui/material/Box";
import { User } from "~/types/User";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const FormControlStyle = { marginTop: 5 };
const padding = { padding: 8 };

const FindAll: React.FunctionComponent = () => {
  const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ["users"] });

  const [snackbarText, setSnackbarText] = useState<null | string>(null);
  const [selectedUser, setSelectedUser] = useState<Record<string, any> | null>(
    null,
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllApiOne,
  });

  const patchMutation = useMutation({
    mutationFn: (payload: User) => ApiOneHandler("PATCH", { ...payload }),
    onError: (error, variables, context) => {
      console.log(`Patch mutation error ${error}, ${variables}, ${context}`);
      setSnackbarText("Patch Error");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbarText("Patched");
    },
  });

  async function formHandler(e: React.SubmitEvent<HTMLFormElement>) {
    const payload = {
      id: selectedUser?.id,
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      status: selectedUser?.status,
    };
    console.log("payload", payload);
    patchMutation.mutate(payload);
  }

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ApiOneHandler("DELETE", { id }),
    onError: (error, variables, context) => {
      console.log(`mutation error ${error}, ${variables}, ${context}`);
      setSnackbarText("Delete Error");
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbarText("Deleted");
    },
  });

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const fetchByIdMutation = useMutation({
    mutationFn: (id: string) => {
      return ApiOneHandler("POST", { id });
    },
    onError: (error, variables, context) => {
      console.log(`mutation error ${error}, ${variables}, ${context}`);
      setSnackbarText("Fetch by ID Error");
      setSelectedUser(null);
    },
    onSuccess: async (user: User) => {
      setSnackbarText("Fetched by id");
      setSelectedUser(user);
    },
  });

  const selectHandler = async (id: string) => {
    fetchByIdMutation.mutate(id);
  };

  const changeHandler = (value: string, field: string) => {
    const newUser = { ...selectedUser, [field]: value };
    // newUser[field] = value;
    console.log("newUser", newUser);
    setSelectedUser(newUser);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError && error?.message) return <div>Error: {error.message}</div>;

  return (
    <Box sx={{ width: "100%" }}>
      {snackbarText && <Notify text={snackbarText} />}
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ border: "2px solid red", width: "50%" }}>
          <h1>Users</h1>
          <ul>
            {data.map((user: User) => (
              <li key={user.id}>
                <Button onClick={() => selectHandler(user.id)}>Select</Button>
                {`${user.id} ${user.firstName} ${user.lastName} ${user.status === "yes" ? "Yes" : "No"}`}
                <Button onClick={() => deleteHandler(user.id)}>Delete</Button>
              </li>
            ))}
          </ul>
          <Button onClick={() => selectHandler("99999")}>Select 9999</Button>
        </Box>
        <Box sx={{ border: "2px solid blue", width: "50%" }}>
          {selectedUser && (
            <Box style={padding}>
              <h1>Selected User</h1>

              <h2>{`${selectedUser.id} ${selectedUser.firstName} ${selectedUser.lastName}`}</h2>

              <form onSubmit={formHandler}>
                <TextField
                  id="fn"
                  fullWidth
                  label="First Name"
                  placeholder="enter your first name"
                  style={{ marginTop: 10 }}
                  value={selectedUser.firstName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    changeHandler(event.target.value, "firstName");
                  }}
                />
                <TextField
                  id="ln"
                  fullWidth
                  label="Last Name"
                  placeholder="enter your last name"
                  style={{ marginTop: 10 }}
                  value={selectedUser.lastName}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    changeHandler(event.target.value, "lastName");
                  }}
                />
                <FormControl component="fieldset" style={FormControlStyle}>
                  <FormLabel component="legend">Vote</FormLabel>
                  <RadioGroup
                    id="status"
                    aria-label="status"
                    name="status"
                    style={{ display: "initial" }}
                    value={selectedUser.status}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      changeHandler(event.target.value, "status");
                    }}
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>

                {/* <FormControlLabel
                  control={<Checkbox name="checkedA" />}
                  label="I accept the terms and conditions."
                /> */}
                <Button type="submit" variant="contained" color="primary">
                  Update User
                </Button>
              </form>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FindAll;

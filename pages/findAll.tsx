"use client";
import React, { useEffect, useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllApiOne, ApiOneHandler } from "../routes";
import Button from "@mui/material/Button";
import Notify from "~/components/Notify";
import Box from "@mui/material/Box";
import { User } from "~/types/User";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import isEmpty from "lodash/isEmpty";

const padding = { padding: 8 };

const FindAll: React.FunctionComponent = () => {
  const queryClient = useQueryClient();

  const [snackbarText, setSnackbarText] = useState<null | string>(null);
  const [selectedUser, setSelectedUser] = useState<Record<string, any> | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllApiOne,
  });

  const searchMutation = useMutation({
    mutationFn: (payload: Record<"search", string>) =>
      ApiOneHandler("POST", { ...payload }),
    onError: (error) => {
      console.log("Search error", error);
      setSnackbarText(`Search Error ${error}`);
      return [];
    },
    onSuccess: async (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbarText("Searched");
      setUsers(data);
    },
  });

  const searchHandler = () => {
    const payload = {
      search: searchTerm,
    };
    searchMutation.mutate(payload);
  };

  const patchMutation = useMutation({
    mutationFn: (payload: User) => ApiOneHandler("PATCH", { ...payload }),
    onError: (error) => {
      console.log("Patch error");
      setSnackbarText(`Patch Error ${error}`);
    },
    onSuccess: async () => {
      console.log("successfully patched");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSnackbarText("Patched");
    },
  });

  const onSubmit = () => {
    const payload = {
      id: selectedUser?.id,
      firstName: selectedUser?.firstName,
      lastName: selectedUser?.lastName,
      status: selectedUser?.status,
    };
    console.log("payload", payload);
    patchMutation.mutate(payload);
  };

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
    console.log("ChangeHandler", value, field);
    setSelectedUser((prev) => ({ ...prev, [field]: value }));
  };

  //   useEffect(() => {
  //   if (data || users !== data) {
  //     setUsers(data);
  //   }
  // }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error?.message) return <div>Error: {error.message}</div>;

  console.log("Data", data);

  const dataToRender = isEmpty(users) ? data : users;

  return (
    <Box sx={{ width: "100%" }}>
      {snackbarText && <Notify text={snackbarText} />}
      <Navbar />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ border: "2px solid red", padding: 1, width: "50%" }}>
          <h1>Users</h1>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              id="ln"
              fullWidth
              label="Search"
              placeholder="enter your search team"
              style={{ marginTop: 10 }}
              value={searchTerm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSearchTerm(event.target.value);
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={searchHandler}
              sx={{ height: 48, marginTop: 2 }}
            >
              submit
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setSearchTerm("");
                setUsers([]);
              }}
              sx={{ height: 48, marginTop: 2 }}
            >
              Reset
            </Button>
          </Box>
          <ul>
            {dataToRender.map((user: User) => (
              <li key={user.id}>
                <Button onClick={() => selectHandler(user.id || "")}>
                  Select
                </Button>
                {`${user.id} ${user.firstName} ${user.lastName} ${user.status ? "Yes" : "No"}`}
                <Button onClick={() => deleteHandler(user.id || "")}>
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Box>
        <Box sx={{ border: "2px solid blue", width: "50%" }}>
          {selectedUser && (
            <Box style={padding}>
              <h1>Selected User</h1>

              <h2>{`${selectedUser.id} ${selectedUser.firstName} ${selectedUser.lastName}`}</h2>

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

              <FormLabel component="legend">Vote</FormLabel>
              <RadioGroup
                id="status"
                aria-label="status"
                name="status"
                style={{ display: "initial" }}
                value={selectedUser.status}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(event.target.value);
                  changeHandler(event.target.value, "status");
                }}
              >
                <FormControlLabel
                  value={true}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>

              <Button variant="contained" color="primary" onClick={onSubmit}>
                Update User
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FindAll;

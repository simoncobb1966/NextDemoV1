"use client";
import React, { useState } from "react";
import Navbar from "~/components/Navbar/Navbar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteApiOne,
  fetchAllApiOne,
  fetchByIdApiOne,
  ApiOneHandler,
} from "../routes";
import Button from "@mui/material/Button";
import Notify from "~/components/Notify";
import Box from "@mui/material/Box";
import { User } from "~/types/User";

const FindAll: React.FunctionComponent = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["users"] });

  const [snackbarText, setSnackbarText] = useState<null | string>(null);
  const [selectedId, setSelectedId] = useState<null | string>(null);
  const [selectedUser, setSelectedUser] = useState<Record<string, any> | null>(
    null,
  );

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllApiOne,
  });

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => deleteApiOne(id),
  //   onError: (error, variables, context) => {
  //     console.log(`mutation error ${error}, ${variables}, ${context}`);
  //     setSnackbarText("Delete Error");
  //   },
  //   onSuccess: async () => {
  //     setSnackbarText("Deleted");
  //   },
  // });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ApiOneHandler(id, "DELETE"),
    onError: (error, variables, context) => {
      console.log(`mutation error ${error}, ${variables}, ${context}`);
      setSnackbarText("Delete Error");
    },
    onSuccess: async () => {
      setSnackbarText("Deleted");
    },
  });

  const deleteHandler = (id: string) => {
    deleteMutation.mutate(id);
  };

  const fetchByIdMutation = useMutation({
    mutationFn: (id: string) => {
      console.log("id", id);
      return fetchByIdApiOne(id);
    },
    onError: (error, variables, context) => {
      console.log(`mutation error ${error}, ${variables}, ${context}`);
      setSnackbarText("Fetch by ID Error");
      setSelectedUser(null);
    },
    onSuccess: async (oneById: User) => {
      console.log(`mutation onSuccess ${oneById}`);
      setSnackbarText("Fetched by id");
      setSelectedUser(oneById);
    },
  });

  const selectHandler = async (id: string) => {
    fetchByIdMutation.mutate(id);
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
                {`${user.id} ${user.firstName} ${user.lastName}`}
                <Button onClick={() => deleteHandler(user.id)}>Delete</Button>
              </li>
            ))}
          </ul>
          <Button onClick={() => selectHandler("99999")}>Select 9999</Button>
        </Box>
        <Box sx={{ border: "2px solid blue", width: "50%" }}>
          {selectedUser && (
            <Box>
              <h1>Selected User</h1>
              <h2>{`${selectedUser.id} ${selectedUser.firstName} ${selectedUser.lastName}`}</h2>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FindAll;

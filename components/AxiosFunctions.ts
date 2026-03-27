import axios from "axios";
import { User } from "~/types/User";

export const deleteOne = async (route: string, id: string) => {
  await axios.delete(`${route}/${id}`);
  return id;
};

export const fetchAll = async (route: string) => {
  const { data } = await axios.get(`${route}`);
  return data;
};

export const fetchById = async (route: string, id: string) => {
  const { data } = await axios.get(`${route}/${id}`);
  return data;
};

export const find = async (route: string, searchTerm: string) => {
  const { data } = await axios.post(`${route}`, {
    search: searchTerm,
  });
  return data;
};

export const update = async (route: string, user: User) => {
  const { data } = await axios.put(`${route}/${user.id}`, user);
  return data;
};

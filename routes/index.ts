import { ApiMethods } from "~/types/ApiMethods";

export const postApiOne = async (payload: Record<string, any>) => {
  const res = await fetch("/api/api_one", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

export const fetchByIdApiOne = async (id: string) => {
  const res = await fetch("/api/api_one", {
    body: id,
    method: "POST",
  });
  const data = await res.json();
  return data;
};

export const fetchAllApiOne = async () => {
  const res = await fetch("/api/api_one", {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const deleteApiOne = async (payload: string) => {
  const res = await fetch("/api/api_one", {
    method: "DELETE",
    body: payload,
  });
  const data = await res.json();
  return data;
};

export const ApiOneHandler = async (payload: string, method: ApiMethods) => {
  const newPayload = {
    body: payload,
    method: method,
  };

  console.log("newPayload", newPayload);

  const res = await fetch("/api/api_one", newPayload);
  const data = await res.json();
  return data;
};

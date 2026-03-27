import { ApiMethods } from "~/types/ApiMethods";

const route = "/api/medium_users/api_one";

export const fetchAllApiOne = async () => {
  const res = await fetch(route, {
    method: "GET",
  });
  const data = await res.json();
  return data;
};

export const ApiOneHandler = async (
  method: ApiMethods,
  payload?: Record<string, any>,
) => {
  let req: Record<string, any> = { method };

  if (payload) {
    req.body = JSON.stringify(payload);
  }

  console.log("req", req);

  const res = await fetch(route, req);
  const data = await res.json();
  return data;
};

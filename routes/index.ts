import { ApiMethods } from "~/types/ApiMethods";

export const fetchAllApiOne = async () => {
  const res = await fetch("/api/api_one", {
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

  const res = await fetch("/api/api_one", req);
  const data = await res.json();
  return data;
};

"use client";
import { User } from "../../../types/User";
import {
  create_medium_user,
  fetch_all_medium_users,
  delete_medium_users,
  fetch_one_medium_user,
  update_medium_user,
  findAll_medium_user,
} from "../../../service/medium_users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  try {
    const { body, method } = req;

    const payload = body ? JSON.parse(body) : {};
    const { id, search } = payload;

    switch (method) {
      case "GET": {
        const all_users = await fetch_all_medium_users();
        res.status(200).json(all_users);
        break;
      }
      case "DELETE": {
        if (id) {
          const deleted = await delete_medium_users(id);
          res.status(200).json(deleted);
        }
        break;
      }
      case "POST": {
        if (search) {
          const found_Users = await findAll_medium_user(search);
          res.status(200).json(found_Users);
          break;
        }
        if (id && Object.keys(payload).length === 1) {
          // fetch item by id
          const user = await fetch_one_medium_user(id);
          if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
          }
          res.status(200).json(user);
          break;
        }

        if (!id && Object.keys(payload).length > 0) {
          // create new user
          const created_user = await create_medium_user(payload as User);
          res.status(200).json(created_user);
        }
        break;
      }
      case "PATCH": {
        const updated_users = await update_medium_user(payload);
        res.status(200).json(updated_users);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "api_one",
      message: (err as DOMException).message,
    });
  }
};

export default handler;

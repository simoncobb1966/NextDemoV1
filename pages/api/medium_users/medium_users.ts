"use client";
import {
  create_medium_user,
  fetch_all_medium_users,
  find_medium_user,
} from "../../../service/medium_users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  try {
    const { body, method } = req;

    switch (method) {
      case "GET": {
        const all_users = await fetch_all_medium_users();
        res.status(200).json(all_users);
        break;
      }
      case "POST": {
        const { search } = body;
        if (!!search) {
          const found_users = await find_medium_user(search);
          res.status(200).json(found_users);
        } else {
          const created_user = await create_medium_user(body);
          res.status(200).json(created_user);
        }
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err) {
    res.status(400).json({
      error_code: "medium_users",
      message: (err as DOMException).message,
    });
  }
};

export default handler;

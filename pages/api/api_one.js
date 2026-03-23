"use client";

import {
  create_medium_user,
  fetch_all_medium_users,
  delete_medium_users,
  fetch_one_medium_user,
} from "../../service/dbService";
// import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req, res) => {
  try {
    const { body, method } = req;
    console.log("---=== method", method);
    switch (method) {
      case "DELETE": {
        console.log("---=== body", body);
        const deleted = await delete_medium_users(body);
        res.status(200).json(deleted);
        break;
      }
      case "POST": {
        if (body) {
          const user = await fetch_one_medium_user(body);
          if (!user) {
            return Response.json({ error: "User not found" }, { status: 404 });
          }
          res.status(200).json(user);
          break;
        }
        const created_user = await create_medium_user(body);
        res.status(200).json(created_user);
        break;
      }
      case "GET": {
        const all_users = await fetch_all_medium_users();
        res.status(200).json(all_users);
        break;
      }
      case "PUT": {
        //Do some thing
        res.status(200).send("We Secured the PUT API End Point");
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
      message: err.message,
    });
  }
};

export default handler;

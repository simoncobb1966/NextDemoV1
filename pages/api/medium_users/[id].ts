// import { User } from "../../../types/User";
// import {
//   create_medium_user,
//   fetch_all_medium_users,
//   delete_medium_users,
//   fetch_one_medium_user,
//   update_medium_user,
//   findAll_medium_user,
// } from "../../../service/medium_users";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  delete_medium_users,
  fetch_one_medium_user,
  update_medium_user,
} from "~/service/medium_users";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  const { id } = req.query;

  if (!id) {
    return;
  }

  const validatedId = typeof id === "string" ? id : id[0];

  try {
    const { body, method } = req;
    console.log("---=== body", body);
    console.log("---=== method", method);
    console.log("---=== id", id);

    switch (method) {
      case "DELETE": {
        if (id) {
          const deleted = await delete_medium_users(validatedId);
          res.status(200).json(deleted);
        }
        break;
      }
      case "PUT": {
        const updated_users = await update_medium_user(body);
        res.status(200).json(updated_users);
        break;
      }
      case "GET": {
        // fetch item by id
        const user = await fetch_one_medium_user(validatedId);
        if (!user) {
          return Response.json(
            { error: `User id = ${id} not found` },
            { status: 404 },
          );
        }
        res.status(200).json(user);
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

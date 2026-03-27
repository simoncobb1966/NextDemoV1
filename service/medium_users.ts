import { medium_users } from "../database/models";
import { Op } from "sequelize";
import { User } from "../types/User";

export async function create_medium_user(user: User) {
  const { firstName, lastName, status } = user;
  const users = await medium_users.create({
    firstName: firstName,
    lastName: lastName,
    status: status,
  });
  return users;
}

export async function fetch_all_medium_users() {
  const users = await medium_users.findAll();
  return users;
}

export async function delete_medium_users(id: string) {
  console.log("delete_medium_users - req", id);
  const qtyDeleted = await medium_users.destroy({
    where: {
      id: id,
    },
  });
  return qtyDeleted;
}

export async function fetch_one_medium_user(id: string) {
  console.log("dbService - fetch_one_medium_user", id, typeof id);
  return await medium_users.findByPk(id);
}

export async function update_medium_user(payload: User) {
  console.log("###--- payload", payload);
  const { firstName, lastName, status, id } = payload;
  const user = await medium_users.update(
    {
      firstName: firstName,
      lastName: lastName,
      status: status,
    },
    {
      where: {
        id: id,
      },
    },
  );

  return user;
}

export async function find_medium_user(searchTerm: String) {
  console.log("dbService - findAll_medium_user", searchTerm);
  return await medium_users.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.like]: `%${searchTerm}%` } },
        { lastName: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });
}

import { medium_users } from "../database/models";
const { Op } = require("sequelize");
// ----------------------------------------------------------------
export async function create_medium_user(body) {
  const { firstName, lastName, status } = JSON.parse(body);
  const users = await medium_users.create({
    firstName: firstName,
    lastName: lastName,
    status: status,
  });
  return users.dataValues;
}

//--------------------------------------------------------------------------

export async function fetch_all_medium_users() {
  const users = await medium_users.findAll();
  return users;
}

//--------------------------------------------------------------------------
export async function delete_medium_users(id) {
  console.log("delete_medium_users - req", id);
  const qtyDeleted = await medium_users.destroy({
    where: {
      id: id,
    },
  });
  return qtyDeleted;
}

//--------------------------------------------------------------------------

export async function fetch_one_medium_user(id) {
  console.log("dbService - fetch_one_medium_user", id, typeof id);
  return await medium_users.findByPk(id);
}

// ----------------------------------------------------------------
export async function update_medium_user(payload) {
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
//--------------------------------------------------------------------------

export async function findAll_medium_user(searchTerm) {
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

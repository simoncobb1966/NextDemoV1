import { medium_users } from "../database/models";
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
  return await medium_users.findByPk(parseInt(id));
}

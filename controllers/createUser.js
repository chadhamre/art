// modules
const pool = require("../database/mysql");

// controller
createUser = async ctx => {
  const query = `INSERT INTO users (name, age, location) VALUES ('${ ctx.request.body.name}', '${ctx.request.body.age}', '${ctx.request.body.location}')`;
  const results = await pool.query(query);
  ctx.body = {};
};

module.exports = createUser;

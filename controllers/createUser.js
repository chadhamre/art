// modules
const pool = require("../database/mysql");

// controller
createUser = async ctx => {
  // TODO: add pagination, for now limiting to first 100 records
  const query = `INSERT INTO users (name, age, location) VALUES ('${
    ctx.request.body.name
  }', '${ctx.request.body.age}', '${ctx.request.body.location}')`;
  const results = await pool.query(query);
  ctx.body = {};
};

module.exports = createUser;

// modules
const pool = require("../database/mysql");

// controller
createUser = async ctx => {
  try {
    const query = `UPDATE users SET max = '${
      ctx.request.body.max
    }' WHERE id = '${ctx.request.body.id}'`;
    const results = await pool.query(query);
    ctx.body = {};
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = createUser;

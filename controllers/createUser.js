// modules
const pool = require("../database/mysql");

// controller
createUser = async ctx => {
  try {
    const query = `INSERT INTO users (name, age, location) VALUES ('${
      ctx.request.body.name
    }', '${ctx.request.body.age}', '${ctx.request.body.location}')`;
    const results = await pool.query(query);
    ctx.body = {};
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = createUser;

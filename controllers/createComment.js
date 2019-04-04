// modules
const pool = require("../database/mysql");

// controller
ceateComment = async ctx => {
  const query = `INSERT INTO comments (content, name, userId, artId) VALUES ('${
    ctx.request.body.content
  }', '${ctx.request.body.name}', '${ctx.request.body.userID}', '${
    ctx.params.id
  }')`;
  const results = await pool.query(query);
  ctx.body = {};
};

module.exports = ceateComment;

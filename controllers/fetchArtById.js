// modules
const pool = require("../database/mysql");

// controller
fetchAllArtById = async ctx => {
  // TODO: add pagination, for now limiting to first 100 records
  const query = `select t1.*, u.name from (select a.id as artID, a.title, a.artist, c.content, c.userID from art as a left join comments as c on a.id = c.artID where a.id = ${
    ctx.params.id
  }) as t1 left join users as u on t1.userID = u.id`;
  const results = await pool.query(query);

  let output = {};
  results.forEach(row => {
    if (!output[row.artID]) {
      output[row.artID] = {
        id: row.artID,
        title: row.title,
        artist: row.artist,
        year: row.year,
        comments: []
      };
    }
    if (row.content) {
      output[row.artID].comments.push({
        id: row.id,
        content: row.content,
        name: row.name,
        userID: row.userID
      });
    }
  });

  let response = Object.keys(output).map(key => {
    return output[key];
  });

  ctx.body = response;
};

module.exports = fetchAllArtById;

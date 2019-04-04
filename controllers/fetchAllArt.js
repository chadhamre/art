// modules
const pool = require("../database/mysql");

// controller
fetchAllArt = async ctx => {
  try {

    // execute query
    const query =
      "select t1.*, u.name from (select a.id as artID, a.title, a.artist, c.content,  c.name as cName, c.userID from art as a left join comments as c on a.id = c.artID limit 100) as t1 left join users as u on t1.userID = u.id";
    const results = await pool.query(query);

    // TODO: add pagination, for now limiting to first 100 records


    // format response
    let output = {};
    results.forEach(row => {
      console.log(row)
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
          name: !row.name? row.cName : row.name,
          userID: row.userID
        });
      }
    });

    let response = Object.keys(output).map(key => {
      return output[key];
    });

    // return response
    ctx.body = response;

  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = fetchAllArt;

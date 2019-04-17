// modules
const pool = require("../database/mysql");

// controller
fetchAllArtById = async ctx => {
  try {
    // execute query
    const query = `select t2.*, b.* from (select t1.*, u.name from (select a.id as artID, a.title, a.artist, c.content, c.name as cName, c.userID from art as a left join comments as c on a.id = c.artID where a.id = ${
      ctx.params.id
    }) as t1 left join users as u on t1.userID = u.id) as t2 left join bids as b on t2.artID = b.artID;`;
    const results = await pool.query(query);
    let output = {};

    // format results
    results.forEach(row => {
      if (!output[row.artID]) {
        output[row.artID] = {
          id: row.artID,
          title: row.title,
          artist: row.artist,
          year: row.year,
          comments: [],
          status: row.status,
          bids: []
        };
      }
      if (row.content) {
        output[row.artID].comments.push({
          id: row.id,
          content: row.content,
          name: !row.name ? row.cName : row.name,
          userID: row.userID
        });
      }
      if (row.round) {
        output[row.artID].bids.push({
          userID: row.userId,
          name: row.name,
          randNum: row.random,
          bidInc: row.increment,
          amount: row.bid
        });
      }
    });

    let response = Object.keys(output).map(key => {
      return output[key];
    });

    // return data
    ctx.body = response;
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = fetchAllArtById;

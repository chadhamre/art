// modules
const pool = require("../database/mysql");

// controller
fetchAllArt = async ctx => {
  try {
    // execute query
    const query = "select * from users";
    const results = await pool.query(query);

    // TODO: add pagination, for now limiting to first 100 records

    // format response
    let output = [];
    results.forEach(row => {
      output.push({
        id: row.id,
        name: row.name,
        age: row.age,
        location: row.location,
        maxBid: row.max
      });
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

// modules
const pool = require("../database/mysql");

// main controller
startBid = async ctx => {
  try {
    let artID = ctx.params.id;
    let artStatus = await checkArtStatus(artID);
    if (!artStatus) {
      console.log("ERROR: Item Already Sold or In Open Auction");
      ctx.body = { error: "Item Already Sold or In Open Auction" };
    } else {
      let bidders = await fetchBidders();
      if (bidders.length < 3) {
        console.log("ERROR: Fewer than three bidders.");
        ctx.body = { error: "Fewer than three bidders." };
      } else {
        await openAuction(artID);
        let winner = await runAuction(artID, bidders);
        await closeAuction(artID);
        ctx.body = { success: winner };
      }
    }
  } catch (err) {
    console.log("ERROR 01", JSON.stringify(err));
  }
};

openAuction = async artID => {
  try {
    console.log("OPEN AUCTION");
    const queryUpdate = `UPDATE art SET status = 'Open' WHERE id = '${artID}'`;
    const resultsUpdate = await pool.query(queryUpdate);
  } catch (err) {
    console.log("ERROR 02", JSON.stringify(err));
  }
};

checkArtStatus = async artID => {
  try {
    console.log("CHECK ART STATUS");
    const querySelect = `SELECT status FROM art WHERE id = '${artID}'`;
    const resultsSelect = await pool.query(querySelect);
    if (resultsSelect[0].status !== "Unsold") return false;
    return true;
  } catch (err) {
    console.log("ERROR 03", JSON.stringify(err));
    return false;
  }
};

runAuction = async (artID, bidders) => {
  try {
    console.log("START BIDDING");
    let highBid = { id: null, name: null, bid: 0 };
    let rounds = 1;
    let history = [];
    while (rounds < 11) {
      for (let i = 0; i < bidders.length; i++) {
        if (rounds < 11) {
          let random = Math.random().toFixed(2);
          let bid = getRandomBid(random);
          let finalBid = 0;
          if (bidders[i].max > highBid.bid) {
            if (
              highBid.bid + bid < bidders[i].max &&
              bidders[i].id !== highBid.id
            ) {
              finalBid = highBid.bid + bid;
              highBid = {
                id: bidders[i].id,
                name: bidders[i].name,
                bid: finalBid
              };
            }
          }
          console.log(
            `round=${rounds} user=${bidders[i].id}-${bidders[i].name} max=${
              bidders[i].max
            } rand=${random} increment="${bid}" finalbid=${finalBid}`
          );
          history.push({
            artID: artID,
            round: rounds,
            userID: bidders[i].id,
            userName: bidders[i].name,
            random,
            increment: bid,
            bid: finalBid
          });
          rounds++;
        }
      }
    }
    console.log(`------`);
    console.log(`THE WINNER IS ${highBid.name} @ $${highBid.bid}`);
    console.log(`------`);
    await saveHistory(history);
    return `THE WINNER IS ${highBid.name} @ $${highBid.bid}`;
  } catch (err) {
    console.log("ERROR 04", err);
  }
};

closeAuction = async artID => {
  try {
    const query = `UPDATE art SET status = 'Sold' WHERE id = '${artID}'`;
    const results = await pool.query(query);
    console.log("AUCTION CLOSED");
  } catch (err) {
    console.log("ERROR", err);
  }
};

saveHistory = async history => {
  let query = `INSERT INTO bids (artId, round, userId, name, random, increment, bid) VALUES `;
  history.forEach(item => {
    query += `(${item.artID},${item.round},${item.userID},"${item.userName}",${
      item.random
    },${item.increment},${item.bid}),`;
  });
  let formattedQuery = query.slice(0, -1) + ";";
  const results = await pool.query(formattedQuery);
  console.log("HISTORY SAVED");
};

getRandomBid = random => {
  if (random < 0.4) return 1;
  if (random < 0.7) return 5;
  if (random < 0.9) return 10;
  return 20;
};

fetchBidders = async () => {
  console.log("FETCH BIDDERS");
  try {
    const query = `SELECT * from users where max > 0`;
    const results = await pool.query(query);
    return results.map(item => {
      return { id: item.id, name: item.name, max: item.max };
    });
  } catch (err) {
    console.log("ERROR", err);
  }
};

module.exports = startBid;

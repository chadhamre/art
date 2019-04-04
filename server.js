require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const router = require("./routes");
const cors = require("koa2-cors");

// initialize app
const app = new Koa();

// cors settings
const corsSettings = {
  AllowedMethod: ["GET", "POST", "OPTIONS"],
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true
};

app
  .use(logger())
  .use(cors(corsSettings))
  .use(bodyParser())
  .use(router.routes());

app.listen(process.env.PORT || 3000);
console.log("\u001b[31mSERVER STARTED\u001b[0m");

require("dotenv").config();

const Koa = require("koa");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const router = require("./routes");

// initialize app
const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes());

app.listen(process.env.PORT || 3000);
console.log("\u001b[31m31 - RESTARTED\u001b[0m");

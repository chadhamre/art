// modules
const Router = require("koa-router");
const router = new Router();

// controllers
const fetchAllArt = require("./controllers/fetchAllArt");

// routes
router.get("/api/art", fetchAllArt);

// export
module.exports = router;

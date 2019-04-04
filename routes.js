// modules
const Router = require("koa-router");
const router = new Router();

// controllers
const fetchAllArt = require("./controllers/fetchAllArt");
const fetchArtById = require("./controllers/fetchArtById");

// routes
router.get("/api/art", fetchAllArt);
router.get("/api/art/:id", fetchArtById);

// export
module.exports = router;

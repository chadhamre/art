// modules
const Router = require("koa-router");
const router = new Router();

// controllers
const fetchAllArt = require("./controllers/fetchAllArt");
const fetchArtById = require("./controllers/fetchArtById");
const createComment = require("./controllers/createComment");
const createUser = require("./controllers/createUser");

// routes
router.get("/api/art", fetchAllArt);
router.get("/api/art/:id", fetchArtById);
router.post("/api/art/:id/comments", createComment);
router.post("/api/users", createUser);

// export
module.exports = router;

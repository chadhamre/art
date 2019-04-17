// modules
const Router = require("koa-router");
const router = new Router();

// controllers
const fetchAllArt = require("./../controllers/fetchAllArt");
const fetchArtById = require("./../controllers/fetchArtById");
const createComment = require("./../controllers/createComment");
const createUser = require("./../controllers/createUser");
const fetchAllUsers = require("./../controllers/fetchAllUsers");
const setMaxBid = require("./../controllers/setMaxBid");
const startBid = require("./../controllers/startBid");

// routes
router.get("/api/art", fetchAllArt);
router.get("/api/art/:id", fetchArtById);
router.post("/api/art/:id/comments", createComment);
router.post("/api/users", createUser);
router.get("/api/users", fetchAllUsers);
router.post("/api/users/maxBid", setMaxBid);
router.post("/api/art/:id/startBid", startBid);

// export
module.exports = router;

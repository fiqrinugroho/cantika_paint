const router = require("express").Router();

// controller
const auth = require("../../app/controllers/authController");

// middleware
const Authentication = require("../../middlewares/authenticate");
const isAdmin = require("../../middlewares/isAdmin");

// API auth
router.get("/user", Authentication, isAdmin, auth.user);
router.post("/register", Authentication, isAdmin, auth.register);
router.post("/login", auth.login);

module.exports = router;

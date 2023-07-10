const router = require("express").Router();

// controller
const trans= require("../../app/controllers/transactionController");

// middleware
const Authentication = require("../../middlewares/authenticate");
const isAdmin = require("../../middlewares/isAdmin");

// API auth
// router.get("/getAll", Authentication, isAdmin, trans.getAll);
router.delete("/delete/:id", Authentication, trans.deleteTr);
router.get("/get", Authentication,  trans.getByBranch);
router.get("/search", Authentication,  trans.searchByDate);
router.post("/add", Authentication, trans.add);
router.put("/update/:id", Authentication, trans.update);

module.exports = router;

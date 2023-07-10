const router = require("express").Router();

// controller
const item = require("../../app/controllers/itemController");

// middleware
const Authentication = require("../../middlewares/authenticate");
const isAdmin = require("../../middlewares/isAdmin");

// API auth
router.put("/update/:id", Authentication, isAdmin, item.update);
router.post("/add", Authentication, isAdmin, item.add);
router.get("/get/:id", item.getById);
router.get("/getAll", item.getAll);
router.delete("/delete/:id", Authentication, isAdmin, item.deleteItem);

router.get("/filter", item.filterByType);
router.get("/search", item.searchByColor);
router.get("/branch/:id", item.getByBranch);

module.exports = router;

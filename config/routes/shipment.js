const router = require("express").Router();

// controller
const shipment= require("../../app/controllers/shipmentController");

// middleware
const Authentication = require("../../middlewares/authenticate");
const isAdmin = require("../../middlewares/isAdmin");

// API auth

router.delete("/delete/:id", Authentication, shipment.deleteShip);
router.get("/get", Authentication,  shipment.getByBranch);
router.get("/search", Authentication,  shipment.searchByDate);
router.post("/add", Authentication, shipment.add);
router.put("/update/:id", Authentication, shipment.update);

module.exports = router;

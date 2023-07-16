const router = require("express").Router();

// import 
const docs = require("./docs");
const auth = require("./auth");
const item = require("./item");
const trans = require("./transaction");
const shipment = require("./shipment");
const views = require("./views");
const viewsTrans = require("./viewsTrans");

// endpoint
router.use("/api-docs", docs);
router.use("/api/auth/", auth);
router.use("/api/item/", item);
router.use("/api/transaction/", trans);
router.use("/api/shipment/", shipment);
// views
router.use("/", views);
router.use("/penjualan", viewsTrans);

router.use('/',(req, res) => {
    res.render("404")
})

module.exports = router;
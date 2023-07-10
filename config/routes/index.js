const router = require("express").Router();
// import 
const docs = require("./docs");
const auth = require("./auth");
const item = require("./item");
const trans = require("./transaction");
const shipment = require("./shipment");
// const home = require("./../app/controllers/homepage.js");
// endpoint
router.use("/api-docs", docs);
router.use("/api/auth/", auth);
router.use("/api/item/", item);
router.use("/api/transaction/", trans);
router.use("/api/shipment/", shipment);

// // dashboard admin
// router.get('/', home.get)
router.get('/', (req, res) => {
    const data = {
      title: 'My EJS App'
    };
    res.render('index', data);
  });

module.exports = router;
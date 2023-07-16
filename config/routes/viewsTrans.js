const router = require("express").Router();
const axios = require("axios");
const auth = require("../../middlewares/authViews");
const host = "http://localhost:3002";
// dashboard admin
router.get('/', auth, (req, res) => {
  const token = req.cookies.token;

  axios.get(`${host}/api/transaction/get`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(response => {
    // Menangani respons
    res.render('transaction', {transaction : response.data.data,});

  })
  .catch(error => {
    // Menangani kesalahan
    console.error(error);
  });
});


module.exports = router;
const router = require("express").Router();
const axios = require("axios");

// dashboard admin
router.get('/', (req, res) => {
  const token = req.cookies.token;
  const branch = req.cookies.branch;
  const role = req.cookies.role;

  // Jika token tidak ada, alihkan ke halaman login
  if (!token) {
    res.redirect('/login');
  } else {
    // Jika token ada, lanjutkan ke halaman berikutnya
    const data = {
      branch,
      role,
    };
    res.render('index', data);
  }
});

router.get('/login', (req, res) => {
  res.render('login', { error: "" });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Mengambil respons dari API menggunakan Axios
    const response = await axios.post('http://localhost:3002/api/auth/login', { username, password });
    // Menyimpan data respons ke cookie
    res.cookie('token', response.data.data.accessToken);
    res.cookie('branch', response.data.data.branchId);
    res.cookie('role', response.data.data.roleId);
    // Menampilkan halaman utama 
    res.redirect('/');
  } catch (error) {
    const errorMessage = error.response.data.message; // Mengambil pesan kesalahan dari respons API
    res.render('login', { error: errorMessage }); // Mengirimkan pesan kesalahan ke halaman login
  }
});
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('branch');
  res.clearCookie('role');
  res.redirect('/login');
});

module.exports = router;
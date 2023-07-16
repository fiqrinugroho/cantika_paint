module.exports = function (req, res, next){
    const token = req.cookies.token;
  
    // Jika token tidak ada, alihkan ke halaman login
    if (!token) {
      res.redirect('/login');
    }
    // Jika token ada, lanjutkan ke halaman berikutnya
    next();
};
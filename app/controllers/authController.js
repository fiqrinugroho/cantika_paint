// services
const authService = require("../services/authServices");

const login = (req, res, next) => {
  authService
    .login(req.body)
    .then((user) => {
      res.status(200).json({
        status: "OK",
        message: "Success Login",
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const register = (req, res, next) => {
  authService
    .registerNewUser(req.body)
    .then((user) => {
      res.status(201).json({
        status: "OK",
        message: "Success Register New User",
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const user = (req, res, next) => {
  authService
    .getAllUser(req.body)
    .then((user) => {
      res.status(200).json({
        status: "OK",
        totalData: user.length,
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const editUser = (req, res, next) => {
  authService
    .editUser(req.body, req.params.id)
    .then(() => {
      res.status(200).json({
        status: "OK",
        message: "Success Update User",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const changePassword = (req, res, next) => {
  authService
    .changePassword(req.body, req.user.id)
    .then((user) => {
      res.status(200).json({
        status: "OK",
        message: "Success Update Password",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteUser = (req, res, next) => {
  authService
    .deleteUserById(req.params.id)
    .then(() => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Menghapus Data User",
      });
    })
    .catch((err) => {
      next(err);
    });
};


module.exports = {
  login,
  register,
  user,
  editUser,
  changePassword,
  deleteUser
  };

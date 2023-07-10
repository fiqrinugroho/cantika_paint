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
    .registerNewEmployee(req.body)
    .then((user) => {
      res.status(201).json({
        status: "OK",
        message: "Success Register New Employee",
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
      res.status(201).json({
        status: "OK",
        totalData: user.length,
        data: user,
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
};

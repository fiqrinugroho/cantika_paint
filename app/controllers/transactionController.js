// services
const transactionService = require("../services/transactionServices");

const add = (req, res, next) => {
  transactionService
    .addTransaction(req.body)
    .then((transaction) => {
      res.status(201).json({
        status: "OK",
        message: "laporan berhasil disimpan",
        data: transaction,
      });
    })
    .catch((err) => {
      next(err);
    });
};

// const getAll = (req, res, next) => {
//   transactionService
//     .getAllTransaction()
//     .then((transaction) => {
//       res.status(200).json({
//         status: "OK",
//         message: "Data Transaksi Berhasil ditampilkan",
//         totalData: transaction.length,
//         data: transaction,
//       });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

const getByBranch = (req, res, next) => {
  transactionService
    .getTransactionByBranch(req.user.branchId)
    .then((transaction) => {
      res.status(200).json({
        status: "OK",
        message: "Data Transaksi Berhasil ditampilkan",
        totalData: transaction.length,
        data: transaction,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const update = (req, res, next) => {
  transactionService
    .updateTransById(req.body, req.params.id)
    .then((transaction) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Mengupdate Data Transaksi",
        data: transaction,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteTr = (req, res, next) => {
  transactionService
    .deleteTransById(req.params.id)
    .then((transaction) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Menghapus Data Transaksi",
        data: transaction,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const searchByDate = (req, res, next) => {
  transactionService
    .getTransByDate(req.query.date, req.user.branchId)
    .then((transaction) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Transaksi",
        totalData: transaction.length,
        data: transaction,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  add,
  // getAll,
  getByBranch,
  update,
  deleteTr,
  searchByDate,
};

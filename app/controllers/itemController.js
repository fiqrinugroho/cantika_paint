// services
const itemService = require("../services/itemServices");

const add = (req, res, next) => {
  itemService
    .addItem(req.body)
    .then((item) => {
      res.status(201).json({
        status: "Sukses",
        message: "Sukses Menambahkan Data Barang",
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const update = (req, res, next) => {
  itemService
    .updateItemById(req.body, req.params.id)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Mengupdate Data Barang",
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  itemService
    .deleteItemById(req.params.id)
    .then(() => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Menghapus Data Barang",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAll = (req, res, next) => {
  itemService
    .getAllItem()
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Menampilkan Data Barang",
        totalData: item.length,
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getById = (req, res, next) => {
  itemService
    .getItemById(req.params.id)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Data Barang ditemukan",
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const filterByType = (req, res, next) => {
  itemService
    .getItemByType(req.query.type, req.query.branchId)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Barang",
        totalData: item.length,
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const searchByColor = (req, res, next) => {
  itemService
    .getItemByColor(req.query.color, req.query.branchId)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Barang",
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getByBranch = (req, res, next) => {
  itemService
    .getItemByBranch(req.params.id)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Barang",
        totalData: item.length,
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getAutocomplete = (req, res, next) => {
  itemService
    .getAutocomplete(req.params.id)
    .then((item) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Barang",
        totalData: item.length,
        data: item,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  add,
  update,
  deleteItem,
  getAll,
  getById,
  filterByType,
  searchByColor,
  getByBranch,
  getAutocomplete
};

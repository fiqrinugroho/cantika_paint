// services
const shipmentService = require("../services/shipmentServices");

const add = (req, res, next) => {
  shipmentService
    .addShipment(req.body)
    .then((shipment) => {
      res.status(201).json({
        status: "OK",
        message: "laporan pengiriman berhasil disimpan",
        data: shipment,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const getByBranch = (req, res, next) => {
  shipmentService
    .getShipmentByBranch(req.user.branchId)
    .then((shipment) => {
      res.status(200).json({
        status: "OK",
        message: "Data Pengiriman Berhasil ditampilkan",
        totalData: shipment.length,
        data: shipment,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const update = (req, res, next) => {
  shipmentService
    .updateShipById(req.body, req.params.id)
    .then((shipment) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Mengupdate Data Pengiriman",
        data: shipment,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteShip = (req, res, next) => {
  shipmentService
    .deleteShipById(req.params.id)
    .then((shipment) => {
      res.status(200).json({
        status: "OK",
        message: "Sukses Menghapus Data Pengiriman",
        data: shipment,
      });
    })
    .catch((err) => {
      next(err);
    });
};

const searchByDate = (req, res, next) => {
  shipmentService
    .getShipByDate(req.query.date, req.query.branchId)
    .then((shipment) => {
      res.status(200).json({
        status: "OK",
        message: "Menampilkan Data Shipment",
        totalData: shipment.length,
        data: shipment,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  add,
  getByBranch,
  update,
  deleteShip,
  searchByDate,
};

const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const transactionRepository = require("../repositories/transactionRepository");
const itemRepository = require("../repositories/itemRepository");

var moment = require("moment"); //
moment().format();

const addTransaction = async (reqBody) => {
  const { itemId, branchId, out, date } = reqBody;
  const checkItem = await transactionRepository.findDuplicateTrans(formatTime(date), itemId, branchId)
  if (checkItem)
    throw new ApiError(httpStatus.BAD_REQUEST, "Data transaksi sudah ada");

  if (!out)
    throw new ApiError(httpStatus.BAD_REQUEST, "masukan jumlah barang keluar");
  if (!date)
    throw new ApiError(httpStatus.BAD_REQUEST, "tanggal transaksi tidak boleh kosong");
  if (!branchId)
    throw new ApiError(httpStatus.BAD_REQUEST, "cabang belum dipilih");
  if (!itemId)
    throw new ApiError(httpStatus.BAD_REQUEST, "barang tidak boleh kosong");
  const item = await itemRepository.findItemById(itemId)
  if (out > item.stock) {
    if (item.stock === 0) {
      throw new ApiError(httpStatus.BAD_REQUEST, "stok barang sudah habis");
    } else {
      throw new ApiError(httpStatus.BAD_REQUEST, "barang keluar lebih banyak dari stok yang ada");
    }
  } else {
    const finalStock = item.stock - out
    const stock = item.stock
    const transactionDate = formatTime(date);
    const report = {
      branchId,
      itemId,
      stock,
      out,
      finalStock,
      transactionDate,
    }
    const trans = await transactionRepository.createTrans(report);

    if (!trans) {
      throw new ApiError(httpStatus.BAD_REQUEST, "laporan gagal disimpan");
    } else {
      const updateItem = await itemRepository.updateStock(finalStock, itemId)

      if (!updateItem) {
        throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
      } else {
        return await transactionRepository.findTransById(trans.id)
      }
    }
  }
}

const formatTime = (date) => {
  const localTime = moment().format(`${date}`);
  const proposedDate = localTime + "T00:00:00.000Z";
  return proposedDate;
};

// const getAllTransaction = async () => {
//   return await transactionRepository.getTransaction();
// }

const getTransactionByBranch = async (branchId) => {
  return await transactionRepository.getTransByBranch(branchId);
}

const updateTransById = async (reqBody, id) => {
  const { out, } = reqBody;
  if (!out)
    throw new ApiError(httpStatus.BAD_REQUEST, "masukan jumlah barang keluar");

  const trans = await transactionRepository.findTransById(id);

  if (!trans) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Transaksi Tidak Ditemukan");
  } else {
    const item = await itemRepository.findItemById(trans.itemId);
    if (out > item.stock) {
      if (item.stock === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "stok barang sudah habis");
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, "barang keluar lebih banyak dari stok yang ada");
      }
    }
    const finalStock = item.stock + trans.out;
    const update = await itemRepository.updateStock(finalStock, trans.itemId)
    const newItem = await itemRepository.findItemById(trans.itemId);
    if (!update) {
      throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
    } else {
      const newFinalStock = newItem.stock - out;

      const updateItem = await itemRepository.updateStock(newFinalStock, trans.itemId)
      const stock = newItem.stock;
      if (!updateItem) {
        throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
      } else {
        const final = stock - out
        const newTrans = {
          stock,
          out,
          finalStock: final,
        }
        await transactionRepository.updateTrans(newTrans, id);
        return await transactionRepository.findTransById(id);
      }
    }

  }
};

const deleteTransById = async (id) => {
  const trans = await transactionRepository.findTransById(id);
  if (!trans) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Transaksi Tidak Ditemukan");
  } else {
    const item = await itemRepository.findItemById(trans.itemId);
    const finalStock = item.stock + trans.out;
    const update = await itemRepository.updateStock(finalStock, trans.itemId);
    if (!update) {
      throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
    } else {
      const del = await transactionRepository.deleteTrans(id);
      if (!del) {
        throw new ApiError(httpStatus.BAD_REQUEST, "data transaksi gagal dihapus");
      } else {
        return await itemRepository.findItemById(trans.itemId);
      }
    };
  };
};

const getTransByDate = async (date, branchId) => {
  const transactionDate = formatTime(date);
  const trans = await transactionRepository.findTransByBranch(transactionDate, branchId);
  // if(trans.length == 0){
  //   throw new ApiError(httpStatus.NOT_FOUND, "Data Transaksi Masih Kosong");
  // }else{
  //   return trans
  // }
  return trans
};

module.exports = {
  addTransaction,
  // getAllTransaction,
  getTransactionByBranch,
  updateTransById,
  deleteTransById,
  getTransByDate,
};

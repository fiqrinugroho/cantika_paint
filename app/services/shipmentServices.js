const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const shipmentRepository = require("../repositories/shipmentRepository");
const itemRepository = require("../repositories/itemRepository");

var moment = require("moment"); //
moment().format();

const addShipment = async (reqBody) => {
  const { itemId, branchId, add, date } = reqBody;
  if (!add)
    throw new ApiError(httpStatus.BAD_REQUEST, "masukan jumlah barang keluar");
  if (!date)
    throw new ApiError(httpStatus.BAD_REQUEST, "tanggal pengiriman tidak boleh kosong");
  if (!branchId)
    throw new ApiError(httpStatus.BAD_REQUEST, "cabang belum dipilih");
  if (!itemId)
    throw new ApiError(httpStatus.BAD_REQUEST, "barang tidak boleh kosong");

  const item = await itemRepository.findItemById(itemId)
  const finalStock = parseInt(item.stock) + parseInt(add)
  const stock = item.stock
  const shipmentDate = formatTime(date);
  const report = {
    branchId,
    itemId,
    stock,
    add,
    finalStock,
    shipmentDate,
  }
  const ship = await shipmentRepository.createShipment(report);

  if (!ship){
    throw new ApiError(httpStatus.BAD_REQUEST, "laporan gagal disimpan");
  }else{
    const updateItem = await itemRepository.updateStock(finalStock, itemId)
    if(!updateItem){
      throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
    }else {
      return await shipmentRepository.findShipById(ship.id)
    }
  }
}

const formatTime = (date) =>{
  const localTime = moment().format(`${date}`); 
  const proposedDate = localTime + "T00:00:00.000Z";
  return proposedDate;
};

const getShipmentByBranch = async (branchId) => {
  return await shipmentRepository.getShipByBranch(branchId);
}

const updateShipById = async (reqBody, id) => {
  const { add,} = reqBody;
  if (!add)
    throw new ApiError(httpStatus.BAD_REQUEST, "masukan jumlah barang masuk");
    
  const ship = await shipmentRepository.findShipById(id);

  if (!ship) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Pengiriman Tidak Ditemukan");
  } else {
    const item = await itemRepository.findItemById(ship.itemId);
    const finalStock = parseInt(item.stock) - parseInt(ship.add);
    const update = await itemRepository.updateStock(finalStock, ship.itemId)
    const newItem =  await itemRepository.findItemById(ship.itemId);
    if(!update){
      throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
    }else{
      const newFinalStock = parseInt(newItem.stock) + parseInt(add);

      const updateItem = await itemRepository.updateStock(newFinalStock, ship.itemId)
      const stock = newItem.stock;
      if(!updateItem){
        throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
      }else {
        const final = parseInt(stock) + parseInt(add)
        const newShip = {
          stock,
          add,
          finalStock: final,
        }
        await shipmentRepository.updateShip(newShip, id);
        return await shipmentRepository.findShipById(id);
      }
    }
  }
};

const deleteShipById = async (id) => {
  const ship = await shipmentRepository.findShipById(id);
  if (!ship) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Pengiriman Tidak Ditemukan");
  } else {
    const item = await itemRepository.findItemById(ship.itemId);
    const finalStock = item.stock - ship.add;
    const update = await itemRepository.updateStock(finalStock, ship.itemId);
    if(!update){
      throw new ApiError(httpStatus.BAD_REQUEST, "data barang gagal diperbarui");
    }else{
      const del = await shipmentRepository.deleteShip(id);
      if(!del){
        throw new ApiError(httpStatus.BAD_REQUEST, "data pengiriman gagal dihapus");
      }else {
        return await itemRepository.findItemById(ship.itemId);
      }
    };
  };
};

const getShipByDate = async (date, branchId) => {
  const shipmentDate = formatTime(date);
  const ship = await shipmentRepository.findShipByBranch(shipmentDate, branchId);
  return ship
  // if(ship.length == 0){
  //   throw new ApiError(httpStatus.NOT_FOUND, "Data Pengiriman Masih Kosong");
  // }else{
  //   return ship
  // } 
};

module.exports = {
  addShipment, 
  getShipmentByBranch,
  updateShipById,
  deleteShipById,
  getShipByDate,
};
  
const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const itemRepository = require("../repositories/itemRepository");

const addItem = async (reqBody) => {
  const { color, type, stock, branchId } = reqBody;
  // validasi data yang kosong
  if (!color)
    throw new ApiError(httpStatus.BAD_REQUEST, "warna tidak boleh kosong");
  if (!type)
    throw new ApiError(httpStatus.BAD_REQUEST, "jenis tidak boleh kosong");
  if (!branchId)
    throw new ApiError(httpStatus.BAD_REQUEST, "cabang belum dipilih");
    
  const newColor = color.toLowerCase()
  const newType = type.toLowerCase()
  const isNewColor = await itemRepository.findItemByColorAndType(newColor, newType, branchId)
  if (isNewColor)
    throw new ApiError(httpStatus.BAD_REQUEST, "data barang sudah ada");
    
  const addNewItem = await itemRepository.createItem(newColor, newType, stock, branchId);
  
  return await itemRepository.findItemById(addNewItem.id);
};

const updateItemById = async (reqBody, id) => {
  const { color, type, stock} = reqBody;

  const item = await itemRepository.findItemById(id);

  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Barang Tidak Ditemukan");
  } else {
    const newColor = color.toLowerCase()
    const newType = type.toLowerCase()
    await itemRepository.updateItem(newColor, newType, stock, id);
    return await itemRepository.findItemById(id);
  }
};

const deleteItemById = async (id) => {
  const item = await itemRepository.findItemById(id);

  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, "Data Barang Tidak Ditemukan");
  } else {
    return await itemRepository.deleteItem(id);
  }
};

const getAllItem = async () => {
  return await itemRepository.getItem();
}

const getItemById = async (id) => {
  return await itemRepository.findItemById(id);
}

const getItemByType = async (type, branchId) => {
  return await itemRepository.findItemByType(type, branchId);
}

const getItemByColor = async (color, branchId) => {
  const getItem = await itemRepository.findItemByColor(color.toLowerCase(), branchId);
  if(getItem.length == 0){
    throw new ApiError(httpStatus.NOT_FOUND, "Data Barang Tidak Ditemukan");
  }else{
    return getItem
  }
}

const getItemByBranch = async (branchId) => {
  const getItem = await itemRepository.findItemByBranch(branchId);
  if(getItem.length == 0){
    throw new ApiError(httpStatus.NOT_FOUND, "Data Barang Masih Kosong");
  }else{
    return getItem
  }
}

module.exports = {
  addItem,
  getAllItem,
  updateItemById,
  deleteItemById,
  getItemById,
  getItemByType,
  getItemByColor,
  getItemByBranch
};
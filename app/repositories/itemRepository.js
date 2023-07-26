// import models
const { item, branch } = require("../models");
const { Op, } = require("sequelize");

const createItem = (color, type, stock, branchId) => {
  return item.create({color, type, stock, branchId});
};

const findItemById = (id) => {
  const find = item.findOne({
    where: {
      id,
    },
    include: [
      {
        model: branch,
      },
    ]
  });
  return find;
};

const findItemByType = (type, branchId) => {
  if (branchId == 0) {
    const find = item.findAll({
      order: [
        ['branchId', 'ASC'],   
      ],
      include: [
        {
          model: branch,
        },
      ]
    });
    return find;
  }
  const find = item.findAll({
    where: {
      [Op.and] :[
        {
          type,
        },
        {
          branchId
        }
      ]
    },
    include: [
      {
        model: branch,
      },
    ]
  });
  return find;
};

const findItemByColor = (color, branchId) => {
  const find = item.findAll({
    where: {
      [Op.and] :[
        {
          color:{[Op.like]:`%${color}%`,},
        },
        {
          branchId
        }
      ]
    },
    include: [
      {
        model: branch,
      },
    ]
  });
  return find;
};

const findItemByBranch = (branchId) => {
  // attributes: ['email'],
  // raw: true, // Agar hasil query berupa data mentah (plain JSON)
  // distinct: true,
  if (branchId == 0) {
    const find = item.findAll({
      order: [
        ['branchId', 'ASC'],
        ['type', 'ASC'],   
      ],
      include: [
        {
          model: branch,
        },
      ]
    });
    return find;
  }else{
    const find = item.findAll({
      order: [
        ['type', 'ASC'],   
      ],
      where : {
        branchId
      },
      include: [
        {
          model: branch,
        },
      ],
    });
    return find;
  }
  
};

const getAuto = (branchId, type) => {
    const find = item.findAll({
      attributes: ['id','color'],
      raw : true,
      where : {
        branchId,
        type
      },
    });
    return find;
};

const findItemByColorAndType = (color, type, branchId) => {
  const find = item.findOne({
    where: {
      [Op.and] :[
        {
          color
        },
        {
          type
        },
        {
          branchId
        }
      ]
    },
    include: [
      {
        model: branch,
      },
    ]
  });
  return find;
};

const getItem = () => {
  return item.findAll({ 
    order: [
      ['branchId', 'ASC'],   
    ],
    include: [
      {
        model: branch,
      },
    ]
  });
};

const updateItem = async (color, type, stock, id) => {
  return await item.update({color, type, stock, }, { 
    where: { id, }, 
    include: [
      {
        model: branch,
      },
    ]
  });
};

const updateStock = async (stock, id) => {
  return await item.update({stock}, { 
    where: { id, }, 
    include: [
      {
        model: branch,
      },
    ]
  });
};

const deleteItem = async (id) => {
  return await item.destroy({ 
    where: { id, }, 
    include: [
      {
        model: branch,
      },
    ]
  });
};

module.exports = {
  createItem,
  updateItem,
  deleteItem,
  findItemById,
  findItemByType,
  findItemByColor,
  findItemByBranch,
  findItemByColorAndType,
  getItem,
  updateStock,
  getAuto
};
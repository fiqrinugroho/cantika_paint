// import models
const { shipment, item, branch } = require("../models");
const { Op, } = require("sequelize");

const createShipment = (newTrans) => {
  return shipment.create(newTrans);
};

const findShipById = (id) => {
  const find = shipment.findOne({
    where: {
      id,
    },
    include: [
      {
        model: item,
      },
      {
        model: branch,
      },
    ]
  });
  return find;
};

const getShipment = () => {
  return shipment.findAll({ 
    order: [
      ['branchId', 'ASC'],   
      ['shipmentDate', 'DESC']
    ],
    include: [
      {
        model: item,
      },
      {
        model: branch,
      },
    ]
  });
};

const getShipByBranch = (branchId) => {
  if (branchId === 0) {
    return shipment.findAll({ 
      order: [
        ['branchId', 'ASC'],   
        ['shipmentDate', 'DESC']
      ],
      include: [
        {
          model: item,
        },
        {
          model: branch,
        },
      ]
    });
  }else {
    return shipment.findAll({ 
      where: {
        branchId
      },
      order: [  
        ['shipmentDate', 'DESC']
      ],
      include: [
        {
          model: item,
        },
        {
          model: branch,
        },
      ]
    });
  }
};

const updateShip = async (reqBody, id) => {
  return await shipment.update(reqBody, { 
    where: { id, }, 
    include: [
      {
        model: item,
      },
      {
        model: branch,
      },
    ]
  });
};

const deleteShip = async (id) => {
  return await shipment.destroy({ 
    where: { id, }, 
  });
};

const findShipByBranch = (shipmentDate, branchId) => {
  if (branchId === 0) {
    const find = shipment.findAll({
      where: {
        shipmentDate
      },
      include: [
        {
          model: item,
        },
        {
          model: branch,
        },
      ]
    });
    return find;
  }else{
    const find = shipment.findAll({
      where: {
        [Op.and] :[
          {
            shipmentDate,
          },
          {
            branchId
          }
        ]
      },
      include: [
        {
          model: item,
        },
        {
          model: branch,
        },
      ]
    });
    return find;
  }
};

module.exports = {
  createShipment,
  findShipById,
  getShipment,
  getShipByBranch,
  updateShip,
  deleteShip,
  findShipByBranch,

}
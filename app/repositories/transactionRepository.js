// import models
const { transaction, item, branch } = require("../models");
const { Op, } = require("sequelize");

const createTrans = (newTrans) => {
  return transaction.create(newTrans);
};

const findTransById = (id) => {
  const find = transaction.findOne({
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

const getTransaction = () => {
  return transaction.findAll({ 
    order: [
      ['branchId', 'ASC'],   
      ['transactionDate', 'DESC']
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

const getTransByBranch = (branchId) => {
  if (branchId === 0) {
    return transaction.findAll({ 
      order: [
        ['branchId', 'ASC'],   
        ['transactionDate', 'DESC']
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
    return transaction.findAll({ 
      where: {
        branchId
      },
      order: [  
        ['transactionDate', 'DESC']
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

const updateTrans = async (reqBody, id) => {
  return await transaction.update(reqBody, { 
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

const deleteTrans = async (id) => {
  return await transaction.destroy({ 
    where: { id, }, 
  });
};

const findTransByBranch = (transactionDate, branchId) => {
  if (branchId === 0) {
    const find = transaction.findAll({
      where: {
        transactionDate
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
    const find = transaction.findAll({
      where: {
        [Op.and] :[
          {
            transactionDate,
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
const findTransByColor = (transactionDate, itemId) => {
    const find = transaction.findAll({
      where: {
        transactionDate
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

module.exports = {
  createTrans,
  findTransById,
  getTransaction,
  getTransByBranch,
  updateTrans,
  deleteTrans,
  findTransByBranch,
  findTransByColor

}
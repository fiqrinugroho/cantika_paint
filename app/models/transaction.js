'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.branch, {
        foreignKey: "branchId",
      });
      this.belongsTo(models.item, {
        foreignKey: "itemId",
      });
    }
  }
  transaction.init({
    branchId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    out: DataTypes.INTEGER,
    finalStock: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
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
      this.hasMany(models.transaction, { foreignKey: "itemId" });
      this.hasMany(models.shipment, { foreignKey: "itemId" });
    }
  }
  item.init({
    color: DataTypes.STRING,
    type: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};
"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("users", [
      {
        id: 1,
        fullName: "Irwan Dinata",
        username: "irwan",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 1,
        branchId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        fullName: "Ahmadi",
        username: "ahmadi",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 2,
        branchId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        fullName: "Muhammad Saddam Hussein",
        username: "adam",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 2,
        branchId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        fullName: "Dani",
        username: "dani",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 2,
        branchId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        fullName: "Yogo Budi Santoso",
        username: "yogo",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 2,
        branchId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        fullName: "Nendi",
        username: "nendi",
        password: bcrypt.hashSync("qwerty123", 10),
        roleId: 2,
        branchId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

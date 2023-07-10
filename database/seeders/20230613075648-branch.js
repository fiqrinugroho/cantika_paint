'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("branches", [
      {
        id: 0,
        location: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 1,
        location: "Cikampek",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        location: "Klari",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        location: "Wadas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        location: "Tanjung Pura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        location: "Rengasdengklok",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

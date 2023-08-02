'use strict';
const path = require('path');
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
    const csv = require('csvtojson');

    const csvFilePath = path.join(__dirname, '/../../data', 'dengklok.csv');
    // JSON-array of courses from CSV
    const courses = await csv().fromFile(csvFilePath);
    return await queryInterface.bulkInsert('items',courses);
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

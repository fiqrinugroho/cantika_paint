'use strict';
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser')
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
    // return queryInterface.bulkInsert("items", [
    //   {
    //     id: 1,
    //     color: "white",
    //     type: "pro",
    //     stock: 10,
    //     branchId: 1
    //   },
    //   {
    //     id: 1,
    //     color: "black",
    //     type: "pro",
    //     stock: 10,
    //     branchId: 1
    //   },
    // ]);
    const csvFilePath = path.join(__dirname, 'data', 'item.csv'); // Ubah sesuai dengan path file CSV Anda
    const results = [];

    // Baca file CSV dan parse datanya
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Masukkan data ke dalam tabel menggunakan queryInterface.bulkInsert
        await queryInterface.bulkInsert('Users', results, {});
      });
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

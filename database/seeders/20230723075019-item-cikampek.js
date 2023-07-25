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
    // const csvFilePath = path.join(__dirname, '/../../data', 'book1.csv'); // Ubah sesuai dengan path file CSV Anda
    // const results = [];

    // // Baca file CSV dan parse datanya
    // fs.createReadStream(csvFilePath)
    //   .pipe(csvParser())
    //   .on('data', (data) => results.push(data))
    //   .on('end', async () => {
    //     // Masukkan data ke dalam tabel menggunakan queryInterface.bulkInsert
    //     await queryInterface.bulkInsert('Items', results, {});
    //     console.log(results)
    //   });
    const filePath = path.join(__dirname, '/../../data', 'cikampek.csv');
    try {
        const data = await fs.readFile(filePath); // Read the CSV file
        const rows = data.toString().split('\n'); // Split CSV data into rows
      console.log(rows)
        for (const row of rows) {
          const [id, type, color, stock, branchId] = row.split(','); // Assuming the CSV columns are name, email, and age
          console.log(id, row)
          // Insert data into the "Users" table
          return await queryInterface.bulkInsert('items', [
            {
              id,
              type,
              color,
              stock,
              branchId,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error('Error while seeding data:', error);
      }
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

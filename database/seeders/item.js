// const fs = require('fs-extra');
// const csvParser = require('csv-parser');
// const path = require('path');
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     const filePath = path.join(__dirname, '/../../data', 'cikampek.csv');
//     try {
//         const data = await fs.readFile(filePath); // Read the CSV file
//         const rows = data.toString().split('\n'); // Split CSV data into rows
  
//         for (const row of rows) {
//           const [id, type, color, stock, branchId] = row.split(','); // Assuming the CSV columns are name, email, and age
  
//           // Insert data into the "Users" table
//           await queryInterface.bulkInsert('Items', [
//             {
//                 id: parseInt(id),
//                 type,
//                 color,
//                 stock: parseInt(stock),
//                 branchId: parseInt(branchId),
//               createdAt: new Date(),
//               updatedAt: new Date(),
//             },
//           ]);
//         }
//       } catch (error) {
//         console.error('Error while seeding data:', error);
//       }
    
//   },

//   down: async (queryInterface, Sequelize) => {
//     // Remove the seeded data
//     await queryInterface.bulkDelete('items', null, {});
//   },
// };


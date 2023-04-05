'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse (fs.readFileSync("./data-json/courses.json", "utf-8"))
    data.forEach(e => {
     delete e.id
     e.createdAt = new Date()
     e.updatedAt = new Date()
     return e
    });
    return queryInterface.bulkInsert('Courses', data, {});
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Courses', data, {})
  }
};

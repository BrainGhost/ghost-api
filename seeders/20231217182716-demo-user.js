'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demoUsers = [
      {
        firstName: 'Ekene',
        lastName: 'Willie',
      },
      {
        firstName: 'Emerson',
        lastName: 'Jo',
      },
      {
        firstName: 'Quin',
        lastName: 'Karsyn',
      },
      {
        firstName: 'Billie',
        lastName: 'Vic',
      },
      {
        firstName: 'Dusty',
        lastName: 'Jayden',
      },
      {
        firstName: 'Daley',
        lastName: 'Dusty',
      },
      {
        firstName: 'Blythe',
        lastName: 'Sequoia',
      },
      {
        firstName: 'Dada',
        lastName: 'London',
      },
      {
        firstName: 'Teddie',
        lastName: 'Dale',
      },
      {
        firstName: 'Egypt',
        lastName: 'Ufuoma',
      }
    ].map(({ firstName, lastName }) => ({
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Users', demoUsers);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};





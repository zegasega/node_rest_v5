const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs_api', 'user', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    logging: false
});

module.exports = sequelize; 
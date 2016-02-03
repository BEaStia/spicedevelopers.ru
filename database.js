var Sequelize = require('sequelize');
var connectionString = 'postgres://postgres:root@localhost:5432/node';
var sequelize = new Sequelize(connectionString);

exports.sequelize = sequelize;
var Sequelize = require('sequelize');
var connectionString = 'sqlite://node.sqlite';
var sequelize = new Sequelize(connectionString);

exports.sequelize = sequelize;
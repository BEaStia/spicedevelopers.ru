var database = require('../../database');
var Sequelize = require('sequelize');
var Visitor = database.sequelize.define('visitors', {
    address: {
        type: Sequelize.STRING,
        validate: {
            isIPv4: true
        }
    },
    useragent: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


exports.createVisitor = function(ip, useragent) {
    Visitor.sync({force: true}).then(function () {
        // Table created
        return Visitor.create({
            address: ip,
            useragent: useragent
        });
    });
};

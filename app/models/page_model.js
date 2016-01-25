var database = require(__dirname + '/../../database');
var Sequelize = require('sequelize');

var Page = database.sequelize.define('pages', {
    title: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    keywords: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    view: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


exports.createPage = function(title, desc, keywords, address) {
    Page.sync().then(function () {
        // Table created
        return Page.create({
            title: title,
            description: desc,
            keywords: keywords,
            address: address
        });
    });
};

exports.getPage = function(path) {
    return Page.findOne({where: {address: path}});

};

exports.getPages = function() {
    return Page.findAll();
};

exports.Page = Page;

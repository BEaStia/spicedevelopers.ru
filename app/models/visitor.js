var database = require('../../database');
var Sequelize = require('sequelize');
var Visitor = database.sequelize.define('visitors', {
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


var Visit = database.sequelize.define('visits', {
  ip: {
      type: Sequelize.STRING,
      validate: {
          isIPv4: true
      }
  },
  useragent: {
      type: Sequelize.STRING
  },
  referrer: {
    type: Sequelize.STRING
  },
  good_headers: {
    type: Sequelize.BOOLEAN
  },
  address: {
    type: Sequelize.STRING
  }
});

exports.makeVisit = (ip, ua, address, referrer, good_header) => {
  Visit.create({ip: ip, useragent: ua, referrer: referrer, address: address, good_headers: good_header})
};

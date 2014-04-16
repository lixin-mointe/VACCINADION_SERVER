var orm      = require('orm');
var settings = require('../config/settings');

var connection = null;

function setup(db, cb) {
  /*require('./message')(orm, db);
  require('./comment')(orm, db);*/
  require('./information')(orm, db);
  require('./Informationcomtent')(orm, db);
  require('./appversion')(orm, db);
 // db.close();
  return cb(null, db);
}

module.exports = function (cb) {
  if (connection) return cb(null, connection);
 // console.log("settings.database"+settings.database);
  	orm.connect(settings.database, function (err, db) {
    if (err) return cb(err);

    db.settings.set('instance.returnAllErrors', true);
    
    setup(db, cb);
   // orm.connect.close();
  });
};

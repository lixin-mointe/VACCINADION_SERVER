var path       = require('path');

var settings = {
  path       : path.normalize(path.join(__dirname, '..')),
  port       : process.env.NODE_PORT || 3000,
  database   : {
	  	protocol : "mysql", // or "mysql" postgresql
	//    query    : { pool: true },
	    host     : "192.168.1.113",
	    database : "Vaccination",
	    user     : "root",
	    password : "mointe",
	    timezone : "zh"
  }
};

module.exports = settings;

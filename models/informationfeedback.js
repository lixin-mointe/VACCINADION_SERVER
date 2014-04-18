/**
 * information 信息
 * INFORMATION
 */
var moment = require('moment');

module.exports = function (orm, db) {
  var Informationfeedback = db.define('informationfeedback', {
	  comtent			: { type: 'number',  },
	  contact			: { type: 'number'},
	  create_date	    : { type: 'date',  time: true },
      app_version		: { type: 'text' }
   
  },
  {
    hooks: {
      beforeValidation: function () {
    	  if(this.create_date =='' ){
    		  this.create_date = new Date();
    	  }
        
      }
    },
    
    methods: {
      serialize: function () {
        return {
          id        		    : this.id,
          comtent				: this.comtent,
          contact				: this.contact,
          create_date			: this.create_date,
          app_version			: this.app_version

        };
      }
    }
  });
};

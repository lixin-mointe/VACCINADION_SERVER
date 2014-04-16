/**
 * appVersion 信息 appVersion
 */
var moment = require('moment');

module.exports = function(orm, db) {
	var Information = db.define('appversion', {

		create_time : {type : 'date',required : true,time : true},
		version 	: {	type : 'text'},
		up_url		: {	type : 'text'}
	}, {
		 

		methods : {
			serialize : function() {

				return {
					id : this.id,
					version : this.version,
					create_time : this.create_time,
					up_url:this.up_url
				};
			}
		}
	});
};

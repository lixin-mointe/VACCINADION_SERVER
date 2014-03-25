/**
 * New node file
 */
/*`main_id` int(7) default null comment 'info的id',
  `sort` int(4) not null comment '排序',
  `comtent` varchar(5120) not null comment '内容',
  `class` varchar(512) not null default '' comment '样式',
  `img` longblob not null comment '显示图片',*/

/**
 * informationcomtent 信息
 *  
 */
var moment = require('moment');

module.exports = function (orm, db) {
  var Informationcomtent = db.define('informationcomtent', {
	 
	  information_id	: { type: 'number' },
	  sort  		    : { type: 'number'},
	  comtent			: { type: 'text' },
	  style 			: { type: 'text' },
      img				: { type: 'binary'} 
   
    
  /*  body      : { type: 'text', required: true,  big:  true },
    createdAt : { type: 'date', required: true, time: true }*/
  },
  {
 
  
    methods: {
      serialize: function () {
    //	  console.log("  Icnformationcomtent================serialize" );
        return {
          id        : this.id,
          information_id 	: this.information_id,
          sort  	: this.sort,
    	  comtent	: this.comtent,
    	  style 	: this.style,
    	  img		: this.img
        };
      }
    }
  });
 // console.log("  Icnformationcomtent================Icnformationcomtent" );
  Informationcomtent.hasOne('information', db.models.information
		  , { required: true, reverse: 'comments', autoFetch: true 
	  ,field:'information_id',order:'information_id'}
  
  );
  //Icnformationcomtent.hasOne('information', db.models.information, { required: true, reverse: 'comments', autoFetch: true });
	/*
	 * 注意： 
	 * 1.hasOne和hasMany必须写在方法外面
	 * 2.hasOne方法的第一个参数相当于student表的外键，
	 * 		比如，我这里是“department”,orm2会自动生成一个department_id属性。
	 * 		所以你的student表中的外键字段名必须命名为department_id。
	 * 3.hasMany方法的第一个参数为“course”,orm2会自动生成一个student_course表名，
	 * 		所以你的student和course的多对多关系表必须命名为student_course
	 */
};

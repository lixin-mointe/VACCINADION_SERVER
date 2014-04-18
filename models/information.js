/**
 * information 信息
 * INFORMATION
 */
var moment = require('moment');

module.exports = function (orm, db) {
  var Information = db.define('information', {
	/*  
	 * `TYPE` int(7) NOT NULL COMMENT '类型：1最新资讯；2：疫苗知识；3：常见问题；4：疫情报告',
	  `LEVEL` int(7) NOT NULL COMMENT '级别：区分是否是在广告区域显示，1显示，2不显示',
	  `PUBILSHED_DATE` date NOT NULL COMMENT '发布时间',
	  `SOURES` varchar(32) NOT NULL COMMENT '作者，来源',
	  `IMG` longblob NOT NULL COMMENT '显示图片',
	  `INTRODUCTION` varchar(128) NOT NULL COMMENT '简介',
	  `TITLE` varchar(32) NOT NULL COMMENT '标题',
	  `SORT` int(7) NOT NULL COMMENT '排序'
	  */
    type			: { type: 'number', required: true },
    level			: { type: 'number'},
    pubilshed_date	: { type: 'date', required: true, time: true },
    soures			: { type: 'text' },
    img_url			: { type: 'text'},
    introduction	: { type: 'text' },
    title		    : { type: 'text' },
    sort  		    : { type: 'number'}
  /*  body      : { type: 'text', required: true,  big:  true },
    createdAt : { type: 'date', required: true, time: true }*/
  },
  {
    hooks: {
      beforeValidation: function () {
    	  if(this.pubilshed_date ==''){
    		  this.pubilshed_date = new Date();
    	  }
        
      }
    },
    validations: {
    	title: [
        orm.enforce.ranges.length(1, undefined, "标题	    必须填写"),
        orm.enforce.ranges.length(undefined, 12, "标题不能超过12个字符")
      ],
      introduction: [
        orm.enforce.ranges.length(1, undefined, "简介    必须填写"),
        orm.enforce.ranges.length(undefined, 64, "简介不能超过64个字符")
      ] ,
      sort: [
        orm.enforce.ranges.number(0, undefined, "排序    请填写0~999的数字"),
        orm.enforce.ranges.number(undefined, 999, "排序    请填写0~999的数字")
      ]  
      
    },
    methods: {
      serialize: function () {
    	 
        var comments;
        var typeVal;
        switch (this.type)
		  {
		  case 1:
			  typeVal="最新资讯";
		    break;
		  case 2:
			  typeVal="疫苗知识";
		    break;
		  case 3:
			  typeVal="常见问题";
		    break;
		  case 4:
			  typeVal="疫情报告";
		    break;
		  }
        var levelVal;
        switch (this.level)
		  {
		  case 1:
			  levelVal="是";
		    break;
		  case 2:
			  levelVal="否";
		    break;
		  }
        if (this.comments) {
          comments = this.comments.map(function (c) { 
        	  return c.serialize();
          });
        } else {
          comments = [];
        }
        var introductionAttr ='';
        
        return {
          id        		: this.id,
          type				: this.type,
          level				: this.level,
          soures			: this.soures,
          img_url			: this.img_url,
          introduction		: this.introduction,
          title		    	: this.title,
          sort  			: this.sort,
          pubilshed_date	: this.pubilshed_date,
          //pubilshed_date : moment(this.pubilshed_date,"YYYY-MM-DD").fromNow(),
          comments  		: comments,
          introductionAttr  :this.introduction.substring(0,10),
          typeVal			:typeVal,
          levelVal			:levelVal
        };
      }
    }
  });
 // console.log("Information=========Information");
   /*
    * 一对多 映射关系  
    *  'comment'：  表名称 comment.js 中定义db.define('comment'
    *   db.models.comment： 映射对象
    *    { body: String } 需要显示组装的 comment的属性
    *    { reverse: 'message_id' } comment表中的外键，
    * ；*/
 // console.log("6666666666"+this.id);
 // Information.hasMany('informationcomtent', db.models.informationcomtent, { style: String }, { reverse: 'main_id' })
//  console.log("6666666666"+this.id);
};

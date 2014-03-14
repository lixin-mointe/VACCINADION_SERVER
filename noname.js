/**
 * New node file
 */

function createSpecialObject(obj, tag) {
	Object.defineProperty(obj, "sql_comparator", {
		configurable : false,
		enumerable   : false,
		value        : function () { return tag; }
	});

	return obj;
}

var v;
v.sql_comparator="";
console.log(createSpecialObject({ val: v }, 'lte'));


var util = require('util');

module.exports =  function(myObject){
	console.log(util.inspect(myObject, false, null));
}

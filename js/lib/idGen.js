var crypto = require("crypto");

module.exports = function(){
	return crypto.randomBytes(Math.ceil(32 * 3 / 4))
		.toString('base64')   // convert to base64 format
		.slice(0, 32)        // return required number of characters
		.replace(/(\+|\/)/g, '_');  // replace '+' and '/' with '_'
}

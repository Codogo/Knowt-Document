var IDGen = require("../lib/idGen.js");

class KnowtModule{
	constructor(type_, content_){
		this.id = IDGen();
		this.type = type_;
		(content_ === undefined) ? this.content = "" : this.content = content_;
	}
}

module.exports = KnowtModule;

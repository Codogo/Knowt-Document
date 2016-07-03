var IDGen = require("../lib/idGen.js");

var types = [
	"image",
	"body",
	"header",
];

class KnowtModule{
	constructor(type_, depth_, content_, id_){
		this.id = id_ || IDGen();
		this.type = type_;
		this.content = content_ || "";
		this.depth = depth_ || -1;
	}

	static HigherType(arg){
		var i = types.indexOf(arg);
		return types[++i];
	}

	higherType(){
		var i = types.indexOf(this.type);
		return types[++i];
	}

	static LowerType(arg){
		var i = types.indexOf(arg);
		return types[--i];
	}

	lowerType(){
		var i = types.indexOf(this.type);
		return types[--i];
	}

	gt(rhs){
		const myTypeIndex = types.indexOf(this.type);
		const rhsTypeIndex = types.indexOf(rhs.type);
		return this.depth < rhs.depth ? 
			true : 
			(this.depth === rhs.depth) && (myTypeIndex > rhsTypeIndex);
	}

	eq(rhs){
		return !(this.gt(rhs) || this.lt(rhs));
	}

	lt(rhs){
		const myTypeIndex = types.indexOf(this.type);
		const rhsTypeIndex = types.indexOf(rhs.type);
		return this.depth > rhs.depth ? 
			true : 
			(this.depth === rhs.depth) && (myTypeIndex < rhsTypeIndex);
	}
}

module.exports = KnowtModule;

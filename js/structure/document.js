var KnowtModule = require("./module");
var IDGen = require("../lib/idGen.js");
var diff = require('deep-diff').diff;
var util = require('util');

class KnowtDocument{
	constructor(){
		this.id = IDGen();
		this.title = "Untitled Knowt Document";
		this.contents= [
			new KnowtModule("header")
		]
	}

	flattenContents(structContents){
		console.log(util.inspect(structContents, false, null) + "\n\n");
		if(structContents instanceof Array){
			for(var i = 0; i < structContents.length; i++){
				var flattenedModule = JSON.parse(JSON.stringify(structContents[i]));
				delete flattenedModule.children;
				this.contents.push(flattenedModule);
				if(structContents[i].children !== undefined){
					this.flattenContents(structContents[i].children);
				}
			}
		}
	}

	static FromStructured(structDoc){
		var retStructDoc = new KnowtDocument();
		retStructDoc.id = structDoc.id || retStructDoc.id;
		retStructDoc.title = structDoc.title || retStructDoc.title;

		if(structDoc.contents !== undefined){
			retStructDoc.contents = [];
			retStructDoc.flattenContents(structDoc.contents);
		}
		return retStructDoc;
	}

	forwardDelta(rhs){
		return diff(this, rhs);
	}

	backwardDelta(rhs){
		return diff(rhs, this);
	}

	applyDelta(delta){
		delta.forEach(function (change) {
			diff.applyChange(source, true, change);
		});
	}
}

module.exports = KnowtDocument;

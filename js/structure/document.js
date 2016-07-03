var KnowtModule = require("./module");
var IDGen = require("../lib/idGen.js");
var Clone = require("../lib/clone.js");
var ExampleStructured = require("../example/fullDocument.js");

class KnowtDocument{
	constructor(){
		this.id = IDGen();
		this.title = "Untitled Knowt Document";
		this.contents = [
			new KnowtModule("body", 1, "")
		]
	}

	static Example(){
		return KnowtDocument.FromStructured(ExampleStructured);
	}

	flattenContents(structContents, depth){
		for(var i = 0; i < structContents.length; i++){
			var flattenedModule = new KnowtModule(
				structContents[i].type,
				depth,
				structContents[i].content,
				structContents[i].id
			);
			this.contents.push(flattenedModule);
			if(structContents[i].children !== undefined){
				this.flattenContents(structContents[i].children, depth + 1);
			}
		}
	}

	static FromStructured(structDoc){
		var retFlatDoc = new KnowtDocument();
		retFlatDoc.id = structDoc.id || retFlatDoc.id;
		retFlatDoc.title = structDoc.title || retFlatDoc.title;

		if(structDoc.contents !== undefined){
			retFlatDoc.contents = [];
			retFlatDoc.flattenContents(structDoc.contents, 1);
		}
		return retFlatDoc;
	}

	toStructured(){
		var retStructDoc = {
			id: this.id,
			title: this.title
		};

		var childrenArray = [];
		var rootModules = [];
		for(var i = 0; i < this.contents.length; i++){
			childrenArray[i] = [];
		}

		for(var i = 0; i < this.contents.length; i){
			for(var p = i - 1; p >= 0; p--){
				if(this.contents[i].lt(this.contents[p])){
					childrenArray[p].push(i);
					break;
				}
			}
			if(p === -1){rootModules.push(i);}
			i++;
		}

		var structModules = Clone(this.contents);
		for(var i = 0; i < structModules.length; i++){
			structModules[i].children = [];
			delete structModules[i].depth;
			if(childrenArray[i].length === 0){delete structModules[i].children;}
		}

		for(var i = structModules.length - 1; i >= 0; i--){
			for(var j = 0; j < childrenArray[i].length; j++){
				var childI = childrenArray[i][j];
				structModules[i].children.push(structModules[childI]);
			}
		}

		retStructDoc.contents = [];
		for(var i = 0 ; i < rootModules.length; i++){
			retStructDoc.contents.push(structModules[rootModules[i]]);
		}

		return retStructDoc;
	}
}

module.exports = KnowtDocument;

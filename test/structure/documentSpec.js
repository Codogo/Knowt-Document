var IDGen = require("../../js/lib/idGen.js");
var KnowtDoc = require("../../js/structure/document");
var KnowtMod= require("../../js/structure/module");

describe("A Document", function(){
	var kd1, kd2;

	beforeEach(function(){
		kd1 = new KnowtDoc();
		kd2 = KnowtDoc.FromStructured({});
	});

	it("Has Unique ID", function(){
		expect(kd1.id).not.toEqual(kd2.id);
	});

	it("Has Default Title", function(){
		expect(kd1.title).toEqual("Untitled Knowt Document");
		expect(kd2.title).toEqual("Untitled Knowt Document");
	});

	it("Has Default Modules", function(){
		expect(kd1.contents.length).toEqual(1);
		expect(kd1.contents[0].type).toEqual("header");
		expect(kd1.contents[0].content).toEqual("");
	});

	it("Can Construct From Structured", function(){
		var structuredKnowtDoc = {
			id: IDGen(),
			title: "Untitled Knowt Document",
			contents:[
				{
					id: IDGen(), type: "header", content: "First Header 1",
					children: [
						{
							id: IDGen(), type: "header", content: "First Header 2",
							children: [
								{ id: IDGen(), type: "body", content: "First Body", },
								{ id: IDGen(), type: "body", content: "Second Body", }
							]
						},
						{
							id: IDGen(), type: "header", content: "Second Header 2",
							children: [
								{ id: IDGen(), type: "body", content: "Third Body", },
							]
						}
					]
				},
				{
					id: IDGen(), type: "header", content: "Second Header 1",
					children: [
						{ id: IDGen(), type: "body", content: "Forth Body" }
					]
				}
			]
		};

		var kdStructured = KnowtDoc.FromStructured(structuredKnowtDoc);
		console.log(kdStructured);
	});

});


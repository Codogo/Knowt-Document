var IDGen = require("../../js/lib/idGen.js");
var PF= require("../../js/lib/printFull.js");
var KnowtDoc = require("../../js/structure/document");
var KnowtMod= require("../../js/structure/module");
var diff = require('deep-diff').diff;

describe("A Document", function(){
	var kd1, kd2;
	var structuredKnowtDoc = {
		id: IDGen(),
		title: "Generated Knowt Document",
		contents:[ { id: IDGen(), type: "header", content: "First Header 1", children: [ { id: IDGen(), type: "header", content: "First Header 2", children: [ { id: IDGen(), type: "body", content: "First Body", }, { id: IDGen(), type: "body", content: "Second Body", } ] }, { id: IDGen(), type: "header", content: "Second Header 2", children: [ { id: IDGen(), type: "body", content: "Third Body", }, ] } ] }, { id: IDGen(), type: "header", content: "Second Header 1", children: [ { id: IDGen(), type: "body", content: "Forth Body" } ] } ]
	};

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

	it("Can Convert To And From Structured", function(){
		var kdStructured = KnowtDoc.FromStructured(structuredKnowtDoc);

		expect(kdStructured.title).toEqual("Generated Knowt Document");
		expect(kdStructured.contents[0].content).toEqual("First Header 1");
		expect(kdStructured.contents[0].depth).toEqual(1);
		expect(kdStructured.contents[1].content).toEqual("First Header 2");
		expect(kdStructured.contents[1].depth).toEqual(2);
		expect(kdStructured.contents[2].content).toEqual("First Body");
		expect(kdStructured.contents[2].depth).toEqual(3);
		expect(kdStructured.contents[3].content).toEqual("Second Body");
		expect(kdStructured.contents[3].depth).toEqual(3);
		expect(kdStructured.contents[4].content).toEqual("Second Header 2");
		expect(kdStructured.contents[4].depth).toEqual(2);
		expect(kdStructured.contents[5].content).toEqual("Third Body");
		expect(kdStructured.contents[5].depth).toEqual(3);
		expect(kdStructured.contents[6].content).toEqual("Second Header 1");
		expect(kdStructured.contents[6].depth).toEqual(1);
		expect(kdStructured.contents[7].content).toEqual("Forth Body");
		expect(kdStructured.contents[7].depth).toEqual(2);

		var backAgain = kdStructured.toStructured();

		expect(backAgain).toEqual(structuredKnowtDoc);
	});
});


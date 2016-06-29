var KnowtDoc = require("../../js/structure/document");

describe("Document Attributes", function(){
	it("Has Unique ID", function(){
		var kd1 = new KnowtDoc();
		var kd2 = new KnowtDoc();
		expect(kd1.id).not.toBe(null);
		expect(kd2.id).not.toBe(null);
		expect(kd1.id).not.toEqual(kd2.id);
	});
});


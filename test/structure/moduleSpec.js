var KnowtMod= require("../../js/structure/module");
var IDGen = require("../../js/lib/idGen.js");

describe("A Module", function(){
	var headerMod = new KnowtMod("header");
	var bodyMod = new KnowtMod("body");
	var imageMod = new KnowtMod("image");


	it("Can Default Initalise", function(){
		var justType = new KnowtMod("header");
		var andDepth = new KnowtMod("header", 2);
		var andContent = new KnowtMod("header", 2, "foo_bar");

		var id = IDGen();
		var andID = new KnowtMod("header", 2, "foo_bar", id);

		expect(justType.id).not.toBe(null);
		expect(justType.content).toEqual("");
		expect(justType.depth).toEqual(-1);

		expect(andDepth.id).not.toBe(null);
		expect(andDepth.content).toEqual("");
		expect(andDepth.depth).toEqual(2);

		expect(andContent.id).not.toBe(null);
		expect(andContent.content).toEqual("foo_bar");
		expect(andContent.depth).toEqual(2);

		expect(andID.id).toEqual(id);
		expect(andID.content).toEqual("foo_bar");
		expect(andID.depth).toEqual(2);
	});

	it("Can Show Order Of Module Types", function(){
		expect(headerMod.higherType()).toBe(undefined);
		expect(headerMod.lowerType()).toEqual("body");

		expect(bodyMod.higherType()).toEqual("header");
		expect(bodyMod.lowerType()).toEqual("image");

		expect(imageMod.higherType()).toEqual("body");
		expect(imageMod.lowerType()).toBe(undefined);


		expect(KnowtMod.HigherType("header")).toBe(undefined);
		expect(KnowtMod.LowerType("header")).toEqual("body");

		expect(KnowtMod.HigherType("body")).toEqual("header");
		expect(KnowtMod.LowerType("body")).toEqual("image");

		expect(KnowtMod.HigherType("image")).toEqual("body");
		expect(KnowtMod.LowerType("image")).toBe(undefined);
	});

	it("Can Compare Module Types", function(){
		expect(bodyMod.gt(headerMod)).toBe(false);
		expect(bodyMod.gt(bodyMod)).toBe(false);
		expect(bodyMod.gt(imageMod)).toBe(true);

		expect(bodyMod.eq(headerMod)).toBe(false);
		expect(bodyMod.eq(bodyMod)).toBe(true);
		expect(bodyMod.eq(imageMod)).toBe(false);

		expect(bodyMod.lt(headerMod)).toBe(true);
		expect(bodyMod.lt(bodyMod)).toBe(false);
		expect(bodyMod.lt(imageMod)).toBe(false);
	});

	it("Can Compare Module Depths", function(){
		var headerHigh = new KnowtMod("header", 1);
		var headerDeep = new KnowtMod("header", 2);

		var bodyHigh = new KnowtMod("body", 1);
		var bodyDeep = new KnowtMod("body", 2);

		expect(bodyHigh.gt(headerHigh)).toBe(false);
		expect(bodyHigh.eq(headerHigh)).toBe(false);
		expect(bodyHigh.lt(headerHigh)).toBe(true);

		expect(bodyDeep.gt(headerHigh)).toBe(false);
		expect(bodyDeep.eq(headerHigh)).toBe(false);
		expect(bodyDeep.lt(headerHigh)).toBe(true);

		expect(bodyHigh.gt(headerDeep)).toBe(true);
		expect(bodyHigh.eq(headerDeep)).toBe(false);
		expect(bodyHigh.lt(headerDeep)).toBe(false);

		expect(bodyDeep.gt(headerDeep)).toBe(false);
		expect(bodyDeep.eq(headerDeep)).toBe(false);
		expect(bodyDeep.lt(headerDeep)).toBe(true);

		expect(headerHigh.gt(bodyHigh)).toBe(true);
		expect(headerHigh.eq(bodyHigh)).toBe(false);
		expect(headerHigh.lt(bodyHigh)).toBe(false);

		expect(headerDeep.gt(bodyHigh)).toBe(false);
		expect(headerDeep.eq(bodyHigh)).toBe(false);
		expect(headerDeep.lt(bodyHigh)).toBe(true);

		expect(headerHigh.gt(bodyDeep)).toBe(true);
		expect(headerHigh.eq(bodyDeep)).toBe(false);
		expect(headerHigh.lt(bodyDeep)).toBe(false);

		expect(headerDeep.gt(bodyDeep)).toBe(true);
		expect(headerDeep.eq(bodyDeep)).toBe(false);
		expect(headerDeep.lt(bodyDeep)).toBe(false);
	});
});

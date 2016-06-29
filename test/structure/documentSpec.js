class KnowtDocument{
	constructor(){
		this.id = btoa(Math.floor(Math.random() * (max - min + 1)) + min);
	}
};

module.exports = KnowtDocument;

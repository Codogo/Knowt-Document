var Base64 = require('js-base64').Base64;

class KnowtDocument{
	constructor(){
		const min = 0, max = 340282366920938463463374607431768211456;
		this.id = Base64.encode(
			Math.floor(Math.random() * (max - min + 1)) + min
		);
	}
}

module.exports = KnowtDocument;

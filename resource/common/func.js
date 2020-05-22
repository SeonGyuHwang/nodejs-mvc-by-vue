let func = {};

func.createRandomId = function () {
	let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	let string_length = Math.floor(Math.random() * 10) + 2;
	let randomstring = '';
	for (let i = 0; i < string_length; i++) {
		let rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum, rnum + 1);
	}

	return randomstring;
};

func.htmlspecialchars = function (string, quote_style, charset, double_encode) {
	let optTemp = 0, i = 0, noquotes = false;
	if (typeof quote_style === 'undefined' || quote_style === null) {
		quote_style = 2;
	}
	string = string.toString();
	if (double_encode !== false) {
		// Put this first to avoid double-encoding
		string = string.replace(/&/g, '&amp;');
	}
	string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

	let OPTS = {
		'ENT_NOQUOTES': 0,
		'ENT_HTML_QUOTE_SINGLE': 1,
		'ENT_HTML_QUOTE_DOUBLE': 2,
		'ENT_COMPAT': 2,
		'ENT_QUOTES': 3,
		'ENT_IGNORE': 4
	};
	if (quote_style === 0) {
		noquotes = true;
	}
	if (typeof quote_style !== 'number') {
		// Allow for a single string or an array of string flags
		quote_style = [].concat(quote_style);
		for (i = 0; i < quote_style.length; i++) {
			// Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
			if (OPTS[quote_style[i]] === 0) {
				noquotes = true;
			} else if (OPTS[quote_style[i]]) {
				optTemp = optTemp | OPTS[quote_style[i]];
			}
		}
		quote_style = optTemp;
	}
	if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
		string = string.replace(/'/g, '&#039;');
	}
	if (!noquotes) {
		string = string.replace(/"/g, '&quot;');
	}

	return string;
};

func.number_format = (number, decimals, decPoint, thousandsSep) => {
	number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	let n = !isFinite(+number) ? 0 : +number;
	let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
	let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep;
	let dec = (typeof decPoint === 'undefined') ? '.' : decPoint;
	let s = '';
	let toFixedFix = function (n, prec) {
		let k = Math.pow(10, prec);
		return '' + (Math.round(n * k) / k)
			.toFixed(prec);
	};

	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	if (s[0].length > 3) {
		s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	}
	if ((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
};

func.Encrypt = str => {
	str = str || '';

	try {

		let cipher = crypto.createCipheriv('AES-256-CBC', ENC_KEY, ENC_IV),
			enc_str = cipher.update(str, 'utf8', 'base64');
			enc_str += cipher.final('base64');

		return Buffer.from(enc_str).toString('base64').replace('=', '');

	} catch(e) {}

};

func.Decrypt = str => {
	str = str || '';

	try {

		let decipher = crypto.createDecipheriv('AES-256-CBC', ENC_KEY, ENC_IV),
			dnc_str = decipher.update(Buffer.from(str, 'base64').toString('utf8'), 'base64', 'utf8');
			dnc_str += decipher.final('utf8');

		return dnc_str;

	} catch(e) {}

};

module.exports = func;

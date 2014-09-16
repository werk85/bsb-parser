var parser = require('./parser');
var reader = require('./reader');

exports.parse = function (header) {
	return parser.parse(header);
};

exports.fromFile = function (filepath, callback) {
	reader.read(filepath, function (err, header) {
		if (err) return callback(err);

		var result, error;
		try {
			result = parser.parse(header);
		} catch (e) {
			error = e;
		} finally {
			callback(error, result);
		}
	});
};
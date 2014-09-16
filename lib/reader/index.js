var fs = require('fs');

exports.read = function (filepath, callback) {
	var stream = fs.createReadStream(filepath);
	var offset = 0;
	var isFinished = false;
	var header = '';
	stream.on('data', function (chunk) {
		if (isFinished) return;

		header += chunk;
		var length = header.length;
		for (var i = offset; i < length; ++i) {
			if (header.charCodeAt(i) === 26) {
				// Check if the end was reached
				if (i + 1 >= length) {
					// If that was the last sign decrease the offset by one
					offset--;
				} else {
					if (header.charCodeAt(i + 1) === 0) {
						isFinished = true;
						header = header.substr(0, i);
						stream.destroy();
					}
				}
			}
		}
		offset += chunk.length;
	});

	stream.on('error', callback);

	stream.on('close', function () {
		callback(null, header);
	});
};
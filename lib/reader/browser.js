exports.read = function (file, callback) {
	var reader = new FileReader();

	reader.onerror = callback;

	reader.onload = function (evt) {
		var content = evt.target.result;
		var index = content.length;
		for (var i = 0; i < content.length - 1; i++) {
			if (content.charCodeAt(i) === 26 && content.charCodeAt(i + 1) === 0) {
				index = i;
				break;
			}
		}
		callback(null, content.substr(0, index));
	};

	reader.readAsText(file);
};
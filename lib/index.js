var fs = require('fs');
var _ = require('lodash-node');

var liner = require('./liner');

var handlers = {
	'PLY': function (line) {
		var result = [];
		var tokens = line.split(',');
		var numbers = _.map(tokens, Number);
		result[numbers[0] - 1] = [numbers[1], numbers[2]];
		return result;
	},
	'VER': function (line) {
		return line;
	}
};

function Parser() {
	this._result = {};
}

Parser.prototype = {
	_toArray: function (line, formatter, result) {
		var tokens = line.split(',');
		var array = _.map(tokens, formatter);
		return result[array[0] - 1] = array.splice(1);
	},
	_ply: function (line) {
		var polygon = this._result.polygon = this._result.polygon || [];
		this._toArray(line, Number, polygon);
	},
	_ver: function (line) {
		this._result.version = line;
	},
	_rgb: function (line) {
		var rgb = this._result.colormap = this._result.colormap || [];
		this._toArray(line, Number, rgb);
	},
	parse: function (lines) {
		lines.forEach(function (line) {
			if (line.startsWith('!')) return;
			// TODO: Add multiline support
			if (line.startsWith('    ')) return;
			var tokens = line.split('/');
			var method = '_' + tokens[0].toLowerCase();
			if (this[method]) {
				this[method](tokens[1]);
			}
		}, this);
		return this._result;
	}
};


var keys = _.keys(handlers);

exports.parse = function (filepath, callback) {
	var stream = fs.createReadStream(filepath);
	var isFinished = false;
	var header = [];
	stream.pipe(liner)
		.on('readable', function () {
			var line;
			while(line = liner.read()) {
				if (line.charCodeAt(0) === 26 && line.charCodeAt(1) === 0) {
					isFinished = true;
					stream.unpipe(liner);
					stream.destroy();
				}
				if (!isFinished) {
					header.push(line.replace(/\r/g, ''));
				}
			}
		})
		.on('unpipe', function () {
			var parser = new Parser();
			var result = parser.parse(header);
			callback(null, result);
		});
};
var fs = require('fs');

var PEG = require('pegjs');

var grammar = fs.readFileSync(__dirname + '/grammar.pegjs', 'utf8');

module.exports = PEG.buildParser(grammar);
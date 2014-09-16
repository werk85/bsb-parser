bsb-parser
===============

BSB/KAP Parser that parses a subset of the BSB/KAP specification used from here:

 * [OpenCPN](http://opencpn.org/ocpn/kap_format)
 * [libbsb](http://libbsb.sourceforge.net/bsb_file_format.html)

# Usage

## Browser

### Installation

For browserify builds use

```
npm install bsb-parser --save-dev
```

For bower builds use

```
bower install bsb-parser --save
```

Or as standalone version include the `dist/bsb-parser.js` or `dist/bsb-parser.min.js` file.

### Usage

The bsb-parser is BSB compatible and support the HTML5 Filereader API. See `dist/index.html` for a usage example.

## Node

### Installation

```
npm install bsb-parser --save
```

### Usage

```js
var bsbParser = require('bsb-parser');

// If you already have the header without the binary content use:
bsbParser.parse('I am an extracted header');

// Or if you want to extract the content by the this lib
bsbParser.parseFile('path/to/file.kap', function (err, obj) {
    // All attributes are added to obj
});
```

# Example

If you want to see the library in action open the `dist/index.html` in your browser.

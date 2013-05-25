# level-defaults [![Build Status](https://secure.travis-ci.org/shama/level-defaults.png)](http://travis-ci.org/shama/level-defaults)

Adds a `defaults()` method to your [LevelUp](https://github.com/rvagg/node-levelup).

Install the module with: `npm install level-defaults --save`

```js
var levelup = require('levelup');
var levelDefaults = require('level-defaults');

var db = levelup('/tmp/foo.db');
db = levelDefaults(db);

db.defaults({
  user: 'shama',
  pass: '1234',
}, {
  homepage: 'http://dontkry.com'
}, function(err, data) {
  // data = {user: 'shama', pass: '1234', homepage: 'http://dontkry.com'}
});

// ... later ...

db.defaults({
  user: null,
  pass: null
}, function(err, data) {
  // data = {user: 'shama', pass: '1234'}
});
```

## Release History
* 0.1.0 - initial release

## License
Copyright (c) 2013 Kyle Robinson Young  
Licensed under the MIT license.

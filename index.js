// level-defaults
// Copyright (c) 2013 Kyle Robinson Young
// Licensed under the MIT license.

module.exports = function(db) {
  if (db.defaults) return db;

  db.defaults = function() {
    var done = Array.prototype.slice.call(arguments, -1)[0];
    var gets = Array.prototype.slice.call(arguments, 0, -1);

    Array.prototype.slice.call(gets, 1).forEach(function(arg) {
      if (arg) for (var p in arg) if (gets[0][p] === void 0) gets[0][p] = arg[p];
    });
    gets = gets[0];

    var puts = [];
    Object.keys(gets).forEach(function(k) {
      if (Object.prototype.hasOwnProperty.call(gets, k)) {
        if (gets[k] !== null) {
          puts.push({type: 'put', key: k, value: gets[k]});
        }
      }
    });
    gets = Object.keys(gets);

    var data = {};
    function getAll() {
      if (gets.length > 0) {
        var n = gets.shift();
        db.get(n, function(err, val) {
          if (err) val = null;
          data[n] = val;
          getAll();
        });
      } else {
        done(null, data);
      }
    }

    db.batch(puts, function(err) {
      if (err) return done(err);
      getAll();
    });
  };

  return db;
};

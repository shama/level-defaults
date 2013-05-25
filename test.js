var test = require('tap').test;
var rimraf = require('rimraf');
var levelup = require('levelup');
var levelDefaults = require('./');

function ltest(name, fn) {
  test(name, function(t) {
    var location = '__defaults-' + Math.random();
    var db = levelDefaults(levelup(location));
    t._end = t.end;
    t.end = function() {
      db.close(function(err) {
        t.notOk(err, 'no error on close()');
        rimraf(location, t._end.bind(t));
      });
    };
    fn(db, t);
  });
}

ltest('default keys', function(db, t) {
  db.defaults({
    one: 1,
    two: 'two',
  }, {
    three: '333',
  }, function(err, data) {
    t.notOk(err, 'no error');
    t.equal(data.one, '1');
    t.equal(data.two, 'two');
    t.equal(data.three, '333');

    db.defaults({
      three: null,
      another: 'test'
    }, function(err, data) {
      t.notOk(err, 'no error');
      t.equal(data.three, '333');
      t.equal(data.another, 'test');
      t.end();
    });
  });
});

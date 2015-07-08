var app = require('../app');
var request = require('supertest');
var assert = require('assert');
var fs = require('fs');
//var assert = require('assert');

describe('Express Summernote Test Suite: ', function() {
  it('uploadImage must work.', function(done) {
    request(app)
      .post('/uploadImage')
      .attach('file', 'test/fixtures/testimage.png')
      .expect(200)
      .expect(/png/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('uploadPage must work.', function(done) {
    var content = '<p>Hello Summernote</p>';
    request(app)
      .post('/uploadPage')
      .send({
        content: content
      })
      .expect(200)
      .expect(/html/)
      .end(function(err, res) {
        if (err) return done(err);
        //console.log(res.text);
        fs.readFile('./public' + res.text, 'utf8', function(err, data) {
          if (err) return done(err);
          assert.equal(data, content);
          done();
        });
      });
  });
});

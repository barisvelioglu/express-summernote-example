var app = require('../app');
var request = require('supertest');
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
        request(app)
            .post('/uploadPage')
            .field('content', '<p>Hello Summernote</p>')
            .expect(200)
            .expect(/html/)
            .end(function(err, res) {
                if (err) return done(err);
                console.log(res.text);
                fs.open('./public' + res.text,'r', function(err,stat) {
                    if(err) return done(err);
                    done();
                });
            });
    });
});

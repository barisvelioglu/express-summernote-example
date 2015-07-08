var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.post('/uploadImage', [
    multer({
        dest: './public/images/'
    }),
    function(req, res, next) {
        var path = req.files.file.path;
        console.log(path);
        path = path.replace(/^public/, '');
        res.send(path);
    }
]);

router.post('/uploadPage', function(req, res, next) {
    console.log(req.body.content);
    var content = req.body.content;
    var page_path = '/pages/' + uniqfilename() + '.html';
    fs.writeFile('public' + page_path, content, function(err) {
        if (err) throw err;
        console.log('File write completed');
        res.send(page_path);
    });
    //res.status(204).end();
});

var uniqfilename = function() {
    //   return '_' + Math.random().toString(36).substr(2, 9);
    return new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
};

router.post('/save', function(req, res, next) {
    console.log(req.body.content);
    res.status(204).end();
});

module.exports = router;

var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express Summernote Example'
    });
});

/* POST upload image, save it on public/images */
router.post('/uploadImage', [
    multer({
        dest: './public/images/' // which image save
    }),
    function(req, res, next) {
        var path = req.files.file.path;
        //console.log(path);
        path = path.replace(/^public/, '');
        res.send(path);
    }
]);

/* POST upload html data, save it on public/pages/ */
router.post('/uploadPage', function(req, res, next) {
    //console.log(req.body.content);
    var content = req.body.content;
    var page_path = '/pages/' + uniqname() + '.html';
    fs.writeFile('./public' + page_path, content, function(err) {
        if (err) throw err;
        //console.log('File write completed');
        res.send(page_path);
    });
});

// return uniq name
var uniqname = function() {
    //   return '_' + Math.random().toString(36).substr(2, 9);
    return new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = router;

$(document).ready(function() {
    // Init Summernote
    $('#summernote').summernote({
        height: 300, // set editor height

        minHeight: null, // set minimum height of editor
        maxHeight: null, // set maximum height of editor

        focus: true, // set focus to editable area after initializing summernote
        lang: 'ko-KR', // default: 'en-US'
        onImageUpload: function(files) {
            uploadImage(files[0]);
        }
    });

    // upload image to server.
    var uploadImage = function(file) {
        var formData = new FormData();
        formData.append("file", file);
        $.ajax({
            url: '/uploadImage',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(url) {
                //console.log("server url:", url);
                $('#summernote').summernote('insertImage', url);
            }
        });
    };

    // save Created html data on server.
    $('#saveButton').click(function() {
        var content = $('#summernote').code();
        $.ajax({
            url: '/uploadPage',
            type: 'POST',
            data: {
                content: content
            },
            success: function(url) {
                console.log("server url:", url);
                // something what you want... 
            }
        });
    });
});

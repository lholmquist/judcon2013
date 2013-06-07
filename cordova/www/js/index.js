var cordovaApp = {
    initialize: function() {
        cordovaApp.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        $( "a[href='#contact']" ).on( "click", cordovaApp.loadContacts );
        $( "a[href='#photos']" ).on( "click", cordovaApp.loadPhotos );
        $( "a[href='#save']" ).on( "click", cordovaApp.saveCanvasImage );
        coolapp.init();
    },
    saveCanvasImage: function() {
        var canvas2ImagePlugin = window.plugins.canvas2ImagePlugin;
        canvas2ImagePlugin.saveImageDataToLibrary(
            function(msg){
                console.log(msg);
            },
            function(err){
                console.log(err);
            },
            'canvas'
        );
    },
    loadPhotos: function() {
         //lets empty the photo div first
        $( "#photoList div" ).empty();
        var cameraOptions = {
            quality: 50,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            targetWidth: window.innerWidth,
            targetHeight: ( window.innerHeight - 20 ),
        },
        success,
        error;


        success = function( picture ) {
            console.log( picture );
            var photoDiv = $( "<div>" ),
                img = new Image();

            img.src = picture;

            $( photoDiv ).append( img );
            $( "#photoList" ).append( photoDiv );
        };

        error = function( error ) {
            console.log( error );
        };

        navigator.camera.getPicture( success, error, cameraOptions );
    },
    loadContacts: function() {

        //lets empty the contact div first
        $( "#contactsList div" ).empty();
        //load all contacts
        var options = new ContactFindOptions(),
            fields = ["displayName", "name", "emails"],
            success,
            error;

        options.multiple=true;

        success = function( contacts ) {
            var i=0,
                contactDiv = $( "<div>" ),
                ul = $( "<ul>" ),
                li;

            for( i; i < contacts.length; i++ ) {
                li = $( "<li>" + contacts[ i ].name.formatted + "</li>" );
                ul.append( li );
            }

            contactDiv.append( ul );
            $( "#contactsList" ).append( contactDiv );
        };

        error = function( error ) {
            alert( "error" );
            console.log( error );
        };

        navigator.contacts.find(fields, success, error, options);
    }
};

var cordovaApp = {
    initialize: function() {
        cordovaApp.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        $( "a[href='#contact']" ).on( "click", cordovaApp.loadContacts );
        coolapp.init();
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

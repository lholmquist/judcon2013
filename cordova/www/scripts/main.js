var coolapp = {
    canvas: document.getElementById( "canvas" ),
    ctx: this.canvas.getContext( "2d" ),
    picker: document.getElementById( "pickers" ),
    currentColor: [],
    colors: {
        "0": "black",
        "1": "blue",
        "2": "green",
        "3": "red",
        "4": "white",
        "5": "yellow"
    },
    oldX: 0,
    oldY: 0,
    originX: $( this.canvas ).offset().left,
    originY: $( this.canvas ).offset().top,
    init: function() {
        var canvas = this.canvas,
            ctx = this.ctx;

        this.doCanvasStuff( canvas, ctx );

        ctx.translate( -this.originX, -this.originY );

        this.initListeners();
        this.initPicker();
    },
    doCanvasStuff: function( canvas, ctx ) {
        canvas.height = ( window.innerHeight - 75 );
        canvas.width = ( window.innerWidth );
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
    },
    initListeners: function() {
        var canvas = this.canvas;

        canvas.addEventListener( "touchstart", this.touchstart, false );
        canvas.addEventListener( "touchend", this.touchend, false );
        canvas.addEventListener( "touchmove", this.touchmove, false );

        $( "#reset" ).on( "touchend", this.reset );
        $( "a" ).on( "click", this.navigate );
        $( window ).on( "orientationchange", this.orient );
    },
    initPicker: function() {
        var picker = this.picker,
            colors = this.colors,
            currentColor = this.currentColor,
            ul = $(picker).find("ul"),
            li,
            i = 0;

        for( i; i<6; i++ ) {
            li = $("<li>").css( { "background": colors[ i ] } );
            ul.append( li );
        }

        currentColor = colors[ 5 ];
    },
    orient: function() {
        coolapp.doCanvasStuff( coolapp.canvas, coolapp.ctx );
    },
    touchstart: function( event ) {
        event.preventDefault();
        var max=0,
            min=5;

        //get random color
        coolapp.currentColor = coolapp.colors[ Math.floor(Math.random() * (max - min + 1)) + min ];
    },
    touchend: function( event ) {
        event.preventDefault();
        coolapp.oldX = 0;
        coolapp.oldY = 0;
    },
    touchmove: function( event ) {
        event.preventDefault();
        coolapp.draw();
    },
    draw: function() {
        var ctx = coolapp.ctx,
        x = event.changedTouches[ 0 ].clientX,
        oldX = this.oldX,
        y = event.changedTouches[ 0 ].clientY,
        oldY = this.oldY;

        ctx.strokeStyle = this.currentColor;
        ctx.fillStyle = this.currentColor;
        ctx.beginPath();
        if (this.oldX > 0 && this.oldY > 0) {
            ctx.moveTo(oldX, oldY);
        }
        ctx.lineTo(x+1, y+1);
        ctx.stroke();
        ctx.closePath();

        this.oldX = x,
        this.oldY = y;
    },
    navigate: function( event ) {
        event.preventDefault();

        switch( this.hash ) {
        case "":
            $( "#mainCanvas" ).removeClass( "hidden" );
            $( "div[id!='mainCanvas'][class^='container-fluid']" ).addClass( "hidden" );
            break;
        case "#contact":
            $( "#contactsList" ).removeClass( "hidden" );
            $( "div[id!='contactsList'][class^='container-fluid']" ).addClass( "hidden" );
            break;
        case "#photos":
            $( "#photoList" ).removeClass( "hidden" );
            $( "div[id!='photoList'][class^='container-fluid']" ).addClass( "hidden" );
            break;
        case "#fun":
            $( "#funList" ).removeClass( "hidden" );
            $( "div[id!='funList'][class^='container-fluid']" ).addClass( "hidden" );
            break;
        case "#reset":
            coolapp.reset();
            break;
        default:
        }

    },
    reset: function() {
        var ctx = coolapp.ctx;
        ctx.clearRect(0,0, document.width, document.height);
    }
};

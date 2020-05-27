"use strict";
(function() {

    window.socket = {};
    window.onunload = () => {
    	if( typeof socket.disconnect === "object" )
    		socket.disconnect();
    };

    var setSocket = () => {

      try {
        console.info('socket.js!', 'try');

        window.socket = io({
            'forceNew': true
        });

        socket.on('connect', () => {

            socket.emit('setUser', {
                'url': location.href
            });

        });

        socket.on('disconnect', () => {
            window.socket = {};
        });

        socket.on('loginResult', data => {
            if( data.msg )
                alert(data.msg);

            if( data.status == '200' )
                location.replace(data.redirect);

        });

        socket.on('error', err => {
            socket.disconnect();
            window.socket = {};

            console.log(err);
        });

      } catch(err) {
          console.info('socket.js!catch', err.message);
          window.socket = {};
      }

    };

    var _init = () => {

      if( typeof io === "object" )
        window.onload = () => setSocket()

	};

    jQuery(function() {
      _init();

    });

})( jQuery );

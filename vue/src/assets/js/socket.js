"use strict";

import router from '@/router'

(function($) {
	var userInfo = {};

    window.socket = {};
    window.onunload = () => {
    	if( typeof socket.disconnect === "object" )
    		socket.disconnect();
    };

    var setSocket = () => {

      try {

        window.socket = io({
            'forceNew': true
        });

        socket.on('connect', () => {

          socket.emit('setUser', {
              'url': router.currentRoute.path
          });

        });

        socket.on('disconnect', () => {
            window.socket = {};
        });

        socket.on('redirect', data => {
          router.push(data.redirect || '/')
        });

        socket.on('getUser', data => {
            userInfo = data;
        });

        socket.on('loginResult', data => {
          if( data.msg )
            alert(data.msg);

          if( data.status === '200' )
            router.push(data.redirect || '/')
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

      window.onload = () => {

        if( typeof io === "function" )
          setSocket()

      }

	};

  $(() => {
      _init();
  });

})( jQuery );

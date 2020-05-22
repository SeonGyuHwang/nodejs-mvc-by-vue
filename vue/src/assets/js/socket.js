"use strict";
(function($) {
	var userInfo = {};

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

        socket.on('redirect', data => {
            if( $('body').hasClass('is_pop') )
                window.close();

            top.location.replace(data.redirect);
        });

        socket.on('getUser', data => {
            userInfo = data;
        });

        socket.on('loginResult', data => {
            if( data.msg )
                alert(data.msg);

            if( data.status == '200' )
                location.replace(data.redirect);

        });

        socket.on('room_notice', data => {
            $('.nowChat').append('<li><span style="color:green;">[Notice]</span> '+data.msg+'</li>');

            $('.chatWrap').scrollTop($(".nowChat")[0].scrollHeight);
        });

        socket.on('user_list', data => {
            $('.joinUser').empty();
            $.each(data.users, (user_id, user_name) => {
                $('.joinUser').append('<option value="'+ user_id +'">'+ user_name +'</option>');
            });
        });

        socket.on('chat_history', data => {

            var historyChat = '';
            $.each(data, (row_key, row) => {
                var isMy = row['notice_yn'] == 'N' && row['sender'] == joinInfo.userId ? true : false;

                var historyChat = '<li class="text-'+( isMy ? 'right' : 'left' )+'" data-group="'+ row.group_id +'">';

                    if( row['notice_yn'] == 'Y' ) {
                        historyChat += '<span style="color:green;">[Notice]</span> ';
                    } else if( !isMy ) {
                        historyChat += '<span style="color:black;">['+ row.sender.userNm +']</span> : ';
                    }

                    historyChat += row.send_text;
                historyChat += '</li>';

                $('.nowChat').prepend(historyChat);
            });


            $('.chatWrap').scrollTop($(".nowChat")[0].scrollHeight);
        });

        socket.on('send_text', data => {
            var addChat = '', isMy = data.sender.userId == joinInfo.userId ? true : false;

            addChat += '<li class="text-'+( isMy ? 'right' : 'left' )+'" data-group="'+ data.group_id +'">';

                if( data.notice_yn == 'Y' ) {
                    addChat += '<span style="color:green;">[Notice]</span> ';
                } else if( !isMy ) {
                    addChat += '<span style="color:black;">['+ data.sender.userNm +']</span> : ';
                }

                addChat += data.send_text;
            addChat += '</li>';

            $('.nowChat').append(addChat);

            $('.chatWrap').scrollTop($(".nowChat")[0].scrollHeight);
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

    $(function() {
        _init();

    });

})( jQuery );

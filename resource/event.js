const biz = {}, rooms = {};

module.exports = () => {

    let getChatHistory = (args, callback) => {
        let tmpRow = [], params = [args.roomName, args.userId];

        pool.getConnection( (err, conn) => {
        	let setQuery = 'SELECT ';
        		setQuery += ' 	cl.* ';
        		setQuery += ' 	,IF(cl.sender = m.member_id, m.member_id, b.idx) AS sender_id ';
        		setQuery += ' 	,IF(cl.custom_sender_name <> "", cl.custom_sender_name, IF(cl.sender = m.member_id, m.member_name, b.business_name)) AS sender_name ';
        		setQuery += ' 	,IF(cl.sender = m.member_id, "user", "biz") AS sender_type ';
        		setQuery += ' 	,IFNULL(im.user_id, "") AS planner_id ';
        		setQuery += ' 	,IFNULL(im.user_name, "") AS planner_name ';
        		setQuery += ' FROM chat_log cl ';
        		setQuery += ' 	LEFT JOIN member m ON m.member_id = cl.chat_group ';
        		setQuery += ' 	LEFT JOIN business b ON b.idx = cl.biz_idx ';
        		setQuery += ' 	LEFT JOIN intradb.intra_member im ON im.idx = cl.office_member ';
        		setQuery += ' WHERE cl.del_yn = "N" ';

        	if( params.length > 0 ) {
				setQuery += ' AND cl.biz_idx = ? ';
				setQuery += ' AND cl.chat_group = ? ';
			}

			setQuery += ' GROUP BY cl.idx ';
			setQuery += ' ORDER BY idx DESC LIMIT ?, ? ';

            params.push( parseInt(args.start) || 0 );
            params.push( parseInt(args.length) || 50 );

            let query_exec = conn.query(setQuery, params, function (err, rows) {
                if(err){
                    conn.release();
                    throw err;
                }
                //console.log(rows);
                conn.release();

                for(let i in rows) {
					rows[i]['group_id'] = args.userId;
					rows[i]['info'] = rows[i]['sender_type'] == 'user' ? users[rows[i]['sender_id']] : biz[rows[i]['sender_id']];

					rows[i]['regdate'] = moment(rows[i]['regdate'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

					tmpRow.push(rows[i]);
				}

				//tmpRow.reverse();

				if (typeof callback === "function") {
					callback.apply(null, [tmpRow]);
				}

            });

            //console.log(query_exec);

        });

    };

    let setJoinUserList = roomName => {
        if( rooms[roomName].entry )
		    io.sockets.in(roomName).emit('user_list', {users: rooms[roomName].entry});
    };

    let getChatAvailableBizList = () => {
		let tmpList = [];
		for(let i in Object.keys(biz)) {

			let getBiz = biz[Object.keys(biz)[i]];
			if( getBiz.allowStatus == 'Y' ) {
				/*tmpList[getBiz.userId] = {
					'bizKey': getBiz.roomKey
					,'bizName': getBiz.userNm
				};*/
				tmpList.push(getBiz.userId);
			}

		}

		io.sockets.emit('chatAvailableBizList', {
			'bizList': tmpList
		});

	};

    /*let newMsgNotiKakaoPush = args => {
		const request = require("request");

		let send_host = IS_REAL ? 'www.eweddingfair.co.kr' : 'devonlinefair.directwed.co.kr';
		request.post({
			url: "http://"+ send_host +"/swagger/kakao/noti_push"
			,form: args
		}, (error, response, body) => {
			//console.log(body);
		});

	};*/


    io.on('connection', socket => {
 		socket.userInfo = {};
		//console.log(ip.address());

		socket.on('setUser', data => {

			if( socket.handshake.session.userInfo ) {

				let args = socket.handshake.session.userInfo;
				args['id'] = socket.id;
				socket.userInfo = args;

				users[socket.userInfo.userId] = socket.userInfo;

			} else {

				let parseUrl = url.parse(data.url, true, true);
				let uriArr = parseUrl.pathname.split('/');
				let uriExistsValues = uriArr.filter( n => {
					return EXCLUDE_URI.includes(n);
				});

				if( uriExistsValues.length <= 0 ) {

					io.sockets.to(socket.id).emit('redirect', {
						'redirect': '/auth/login?redirect='+parseUrl.pathname
					});

				}

			}

		});

		socket.on('userLogin', args => {
			socket.handshake.session.userInfo = args;
			socket.handshake.session.save();

			args['id'] = socket.id;
			socket.userInfo = args;

			users[socket.userInfo.userId] = socket.userInfo;

			io.sockets.to(socket.id).emit('loginResult', {
				'status': '200'
				,'loginType': args.loginType
				,'redirect': global.user_redirect
			});
		});

		socket.on('disconnect', function () {
            /*if( socket.userInfo && typeof socket.userInfo.joinRoom != 'undefined' ) {
                delete rooms[socket.userInfo.joinRoom].entry[socket.userInfo.userId];
                setJoinUserList(socket.userInfo.joinRoom);
            }*/

            delete users[socket.userInfo.userId];

            socket.disconnect(true);
        });
    });
};




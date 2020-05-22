let router = express.Router();

router.get('/loginCheck', (req, res) => {

	if( !req.session.userInfo ) {
		resultArr.status = 403;
		resultArr.msg = '접근권한 없음';
	} else {
		resultArr.status = 200;
		resultArr.msg = '로그인 되어있습니다';
	}

    res.json(resultArr);

});

router.post('/loginProc', (req, res) => {
	let userinfo = req.body || {};

	if( !userinfo ) {

        resultArr.status = 500;
        resultArr.msg = '잘못된 접근입니다.';

	} else {

        resultArr.status = 200;
        resultArr.msg = '로그인 성공';
        resultArr.url = user_redirect;
        resultArr.arr.userinfo = userinfo;

        req.session.userInfo = userinfo;
        //req.session.save();

	}

    res.json(resultArr);

});

router.post('/logoutProc', (req, res) => {
	delete req.session.userInfo;

	resultArr.status = 200;
	resultArr.msg = '로그아웃 성공';

	res.json(resultArr);
});


/*let multiparty = require("multiparty");
router.post('/file_upload', (req, res) => {
	let fs = require('fs');

	let up_user_info = {}, tmp_del_files = [];

	let form = new multiparty.Form();

	form.on('field',(name,value) => {
		up_user_info[name] = value;
	});

	form.parse(req, (err, fields, files) => {

		let FormData = require("form-data");
		let request = require("request");

		let form = new FormData();

		form.append('sender', up_user_info.up_user_id || '');
		form.append('sender_type', up_user_info.up_user_type || '');

		if( typeof files == 'object' ) {
			for(let i in files.up_file) {
				tmp_del_files.push(files.up_file[i]['path']);
				form.append("up_file[]", fs.createReadStream(files.up_file[i]['path']));
			}
		}

		let send_host = /(localhost|dev)/i.test(req.headers.host) ? 'devonlinefair.directwed.co.kr' : 'eweddingfair.co.kr';
		let send_request = request.post("http://"+ send_host +"/swagger/chat/upload_image",{
				"headers": {
					"transfer-encoding": "chunked"
				}
			},
			function (err, _res, body) {
				res.end(body);

				for(let i in tmp_del_files) {
					if( fs.existsSync(tmp_del_files[i]) )
						fs.unlinkSync(tmp_del_files[i]);
				}

			}
		);

		send_request._form = form;

	});

});*/

module.exports = router;

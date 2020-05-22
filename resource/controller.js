module.exports = fs => {

	app.all(/.*/, (req, res, next) => {
		if( global.DOMAIN === null )
			global.DOMAIN = req.get('host');

		global.user_email = req.session.userInfo
			? req.session.userInfo.userId
			: null;

        global.resultArr = {
            'status': 500
            ,'msg': '잘못된 접근입니다.'
            ,'url': ''
            ,'arr': {}
            ,'group': {}
            ,'html': ''
            ,'close': 'off'
            ,'reload': 'off'
            ,'openerUrl': ''
            ,'openerReload': 'off'
            ,'dataReload': 'off'
            ,'openerDataReload': 'off'
            ,'recordsTotal': 0
            ,'recordsFiltered': 0
        };

        let access_token = req.headers['access-token'];
		let parseUrl = url.parse(req.originalUrl, true, true);
		let uriArr = parseUrl.pathname.split('/');

		let uriExistsValues = uriArr.filter( n => {
			return EXCLUDE_URI.includes(n);
		});

		if( uriExistsValues.length <= 0
			&& (!user_email && uriArr.indexOf('api') !== -1) ) {

			resultArr.status = 403;
			resultArr.msg = 'Access Denied';

			res.status(403).json(resultArr);

		} else {

			next()

		}

	});


	fs.readdirSync(ROUTES).forEach( target => {

	    if( fs.statSync(ROUTES+'/'+target).isDirectory() ) {

            fs.readdirSync(ROUTES+'/'+target).forEach( subTarget => {
                let pathName = subTarget.split('.')[0] || '';
                let setPath = '/'+target+'/'+pathName;

                app.use(setPath, require(ROUTES+'/'+target+'/'+subTarget));

            });

        } else {

            let pathName = target.split('.')[0] || '';
            let setPath = '/'+( pathName == 'index' ? '' : pathName );

            app.use(setPath, require(ROUTES+'/'+target));

        }

    });

    app.use((req, res) => res.render('index'));
};




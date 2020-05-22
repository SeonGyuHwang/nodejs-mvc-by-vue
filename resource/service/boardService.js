let boardService = {};


boardService.getDataRow = async args => {

    return await boardDao.getDataRow(args);

};

boardService.getDataList = async args => {

    return {
        'count': await boardDao.getDataCount(args)
        ,'list': await boardDao.getDataList(args)
    }

};

boardService.saveData = async args => {

	let idx = args.idx || '';
	let user_email = global.user_email;

	let title = args.title || '';
	let contents = args.contents || '';

	let params = {
		'title': title
		,'contents': contents
	}


	if( !idx ) {
		params.user_email = user_email
		params.created_id = user_email
		params.created_date = moment().format('YYYY-MM-DD HH:mm:ss')

		idx = await boardDao.insertData(params)
		resultArr.status = 200;
		resultArr.msg = "처리 되었습니다.";

	} else {

		let row = await boardDao.getDataRow({ 'idx': idx });
		if( !row ) {

			resultArr.status = 404;
			resultArr.msg = "존재하지 않는 데이터 입니다.";

		} else if( row['created_id'] !== global.user_email ) {

			resultArr.status = 403;
			resultArr.msg = "본인만 수정 가능합니다.";

		} else {

			params.updated_id = user_email
			params.updated_date = moment().format('YYYY-MM-DD HH:mm:ss')

			await boardDao.updateData(idx, params)
			resultArr.status = 200;
			resultArr.msg = "처리 되었습니다.";

		}
	}

	return resultArr
};

boardService.deleteData = async args => {

	let idx = args.idx || '';

	if( !idx ) {

		resultArr.status = 404;
		resultArr.msg = "필수값이 존재하지 않습니다";

	} else {

		let row = await boardDao.getDataRow({ 'idx': idx });
		if( !row ) {

			resultArr.status = 404;
			resultArr.msg = "존재하지 않는 데이터 입니다.";

		} else if( row['created_id'] !== global.user_email ) {

			resultArr.status = 403;
			resultArr.msg = "본인만 삭제 가능합니다.";

		} else {

			let params = {
				'del_yn': 'Y'
				,'updated_id': global.user_email
				,'updated_date': moment().format('YYYY-MM-DD HH:mm:ss')
			}

			await boardDao.updateData(idx, params)

			resultArr.status = 200;
			resultArr.msg = "처리 되었습니다.";

		}

	}


	return resultArr
};

module.exports = boardService;

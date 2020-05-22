let router = express.Router();

router.get('/getDataRow', (req, res) => {

	boardService.getDataRow(req.query)
		.then(data => {

			resultArr.status = 200;
			resultArr.msg = '로드 성공';
			resultArr.arr.row = data;

			res.json(resultArr);

	}).catch(() => res.json(resultArr));

});

router.get('/getDataList', (req, res) => {

    boardService.getDataList(req.query)
        .then(data => {

        resultArr.status = 200;
        resultArr.msg = '로드 성공';
        resultArr.arr.list = data.list;

        resultArr.recordsTotal = data.count;
        resultArr.recordsFiltered = data.count;

        res.json(resultArr);

    }).catch(() => res.json(resultArr));

});

router.post('/saveData', (req, res) => {

	boardService.saveData(req.body)
		.then(() => res.json(resultArr))
		.catch(() => res.json(resultArr));

});

router.delete('/deleteData', (req, res) => {

	boardService.deleteData(req.query)
		.then(() => res.json(resultArr))
		.catch(() => res.json(resultArr));

});



module.exports = router;

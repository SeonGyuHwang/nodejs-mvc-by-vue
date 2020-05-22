let boardDao = {};

boardDao.getDataRow = (args) => {
	var tmpRow = [], params = [];

    return new Promise((resolve, reject) => {

        if( !args.idx ) {

            resolve(tmpRow);

        } else {

            pool.getConnection((err, conn) => {
                if(err) {
                    conn.release();
	                reject(resultArr.msg="커넥션 에러!");
                }

                let setQuery = 'SELECT ';
                    setQuery += ' 	* ';
                    setQuery += ' FROM board ';
                    setQuery += ' 	WHERE del_yn = "N" ';

	            Object.keys(args).forEach(function(key){
		            setQuery += ' AND '+ key +' = ? ';
		            params.push( args[key] );
	            });

	            conn.query(setQuery, params, function (err, rows) {
					conn.release();
                    if(err) reject(resultArr.msg="SQL 에러!");

		            try {

			            tmpRow = rows.shift();

		            } catch (e) {
			            resultArr.msg = e.message
		            }

                    resolve(tmpRow);

                });

            });

        }

    });

};

boardDao.getDataCount = (args) => {
    var tmpRow = [], params = [];

    return new Promise((resolve, reject) => {

        pool.getConnection((err, conn) => {
            if(err) {
                conn.release();
	            reject(resultArr.msg="커넥션 에러!");
            }

            let setQuery = 'SELECT ';
                setQuery += ' 	COUNT(idx) AS cnt ';
                setQuery += ' FROM board ';
                setQuery += ' 	WHERE del_yn = "N" ';

            if( args.sch_user_email ) {
                setQuery += ' AND user_email = ? ';
                params.push( args.sch_user_email );
            }

            if( args.sch_start_date ) {
                setQuery += ' AND updated_date >= ? ';
                params.push( args.sch_start_date );
            }

            if( args.sch_end_date ) {
                setQuery += ' AND updated_date <= ? ';
                params.push( args.sch_end_date );
            }

            conn.query(setQuery, params, (err, rows) => {
				conn.release();
                if(err) reject(resultArr.msg="SQL 에러!");

                let totalCount = 0;

                try {
                    tmpRow = rows.shift();
	                totalCount = tmpRow.cnt || 0
                } catch (e) {
	                resultArr.msg = e.message
                }

                resolve(totalCount);

            });

        });
    });


};

boardDao.getDataList = (args) => {
	var params = [];
	var returnData = [];

    return new Promise((resolve, reject) => {

        pool.getConnection((err, conn) => {
            if(err) {
                conn.release();
	            reject(resultArr.msg="커넥션 에러!");
            }

            let setQuery = 'SELECT ';
                setQuery += ' 	* ';
                setQuery += ' FROM board ';
                setQuery += ' 	WHERE del_yn = "N" ';

	        if( args.sch_user_email ) {
		        setQuery += ' AND user_email = ? ';
		        params.push( args.sch_user_email );
	        }

            if( args.sch_start_date ) {
                setQuery += ' AND updated_date >= ? ';
                params.push( args.sch_start_date );
            }

            if( args.sch_end_date ) {
                setQuery += ' AND updated_date <= ? ';
                params.push( args.sch_end_date );
            }

            setQuery += ' 	ORDER BY idx DESC ';

            if( args.start && args.length > 0 ) {
                setQuery += ' LIMIT ?, ? ';

                params.push( parseInt(args.start) || 0 );
                params.push( parseInt(args.length) || 50 );
            }


            conn.query(setQuery, params, function (err, rows) {
				conn.release();
                if(err) reject(resultArr.msg="SQL 에러!");

                rows.forEach( (row, index) => {

                    row['created_date'] = moment(row['created_date'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

                    if( row['updated_date'] )
                        row['updated_date'] = moment(row['updated_date'], 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');

                    returnData.push(row);
                });

                resolve(returnData);

            });

        });


    });

};

boardDao.insertData = params => {
    let add_params = params || {};

    return new Promise((resolve, reject) => {

        if (typeof add_params !== 'object')
            reject(false);

        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
	            reject(resultArr.msg="커넥션 에러!");
            }

            conn.query('INSERT INTO `board` SET ?', add_params, (err, rows) => {
                conn.release();
                if (err) reject(resultArr.msg="SQL 에러!");

                resolve(rows.insertId);
            });

        });

    });

};

boardDao.updateData = (idx, params) => {
    let add_params = params || {};

    return new Promise((resolve, reject) => {

        if( typeof add_params !== 'object' )
            reject(false);

        let setQuery = ' UPDATE `board` SET ';
            setQuery += ' 	? ';
            setQuery += ' WHERE idx = ? ';

        pool.getConnection((err, conn) => {
            if (err) {
                conn.release();
	            reject(resultArr.msg="커넥션 에러!");
            }

            conn.query(setQuery, [add_params, idx], (err, rows) => {
                conn.release();
                if (err) reject(resultArr.msg="SQL 에러!");

                resolve(true);
            });
        });

    });

};

module.exports = boardDao;

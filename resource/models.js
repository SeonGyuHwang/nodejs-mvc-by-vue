module.exports = fs => {

	fs.readdirSync(DAO).forEach( target => {

	    if( fs.statSync(DAO+'/'+target).isDirectory() ) {

            fs.readdirSync(DAO+'/'+target).forEach(subTarget => {

                let pathName = subTarget.split('.')[0] || '';
				if( pathName != 'TABLE_DDL' )
                	global[pathName] = require(DAO+'/'+target+'/'+pathName);

            });

        } else {

            let pathName = target.split('.')[0] || '';
            if( pathName != 'TABLE_DDL' )
            	global[pathName] = require(DAO+'/'+pathName);

        }

    });

};




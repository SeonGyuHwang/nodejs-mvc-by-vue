module.exports = fs => {

	fs.readdirSync(SERVICE).forEach(target => {

	    if( fs.statSync(SERVICE+'/'+target).isDirectory() ) {

            fs.readdirSync(SERVICE+'/'+target).forEach(subTarget => {

                let pathName = subTarget.split('.')[0] || '';
                global[pathName] = require(SERVICE+'/'+target+'/'+pathName);

            });

        } else {

            let pathName = target.split('.')[0] || '';
            global[pathName] = require(SERVICE+'/'+pathName);

        }

    });

};




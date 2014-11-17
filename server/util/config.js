var config;
config = {
		server: {
			ip: process.env.IP || '0.0.0.0',
			port: process.env.PORT || 9005
		},
		db: {
			conn: 'mongodb://0.0.0.0:27017/pqr_db'
		}
	};

module.exports = config;

//revisar cuando tengamos openshift desplegado
// if (process.env.CONFIG) {
// 	config = require('../config/' + process.env.CONFIG);
// } else {
//   // config = require('../config/dev');
// 	config = {
// 		server: {
// 			ip: process.env.IP || '0.0.0.0',
// 			port: process.env.PORT || 9005
// 		},
// 		db: {
// 			conn: 'mongodb://0.0.0.0:27017/socialscoreboard'
// 		}
// 	};
// }
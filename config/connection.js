const Sequelize = require('sequelize');
require('dotenv').config();

// let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
// 	dialect: 'mysql',
// 	host: '/cloudsql/found-ark-backend:us-west1:foundarkbe',
// 	timestamps: false,
// 	dialectOptions: {
// 		socketPath: '/cloudsql/found-ark-backend:us-west1:foundarkbe'
// 	}
// });

let sequelize;

if (process.env.PORT) {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
		host: `/cloudsql/${process.env.DB_INSTANCE}`,
		dialect: 'mysql',
		dialectOptions: {
			socketPath: `/cloudsql/${process.env.DB_INSTANCE}`
		}
	});
} else {
	sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
		host: 'localhost',
		dialect: 'mysql',
		port: 3306
	});
}

module.exports = sequelize;

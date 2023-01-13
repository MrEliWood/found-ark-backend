const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	dialect: 'mysql',
	host: '/cloudsql/blog-template-374321:us-west1:fabe',
	timestamps: false,
	dialectOptions: {
		socketPath: '/cloudsql/blog-template-374321:us-west1:fabe'
	}
});

// let sequelize;

// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//     sequelize = new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USER,
//         process.env.DB_PASSWORD,
//         {
//             host: 'localhost',
//             dialect: 'mysql',
//             port: 3306
//         }
//     );
// }

module.exports = sequelize;

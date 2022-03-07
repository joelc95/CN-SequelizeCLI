require("dotenv").config();

// destructure Sequelize from its node module
const { Sequelize } = require("sequelize");

// export new Sequelize class object which allows us to open and close connections
exports.sequelize = new Sequelize(process.env.MYSQL_URI);

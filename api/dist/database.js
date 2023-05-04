"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dbHost = (_a = process.env.DB_HOST) !== null && _a !== void 0 ? _a : '127.0.0.1';
const dbDatabase = (_b = process.env.DB_DATABASE) !== null && _b !== void 0 ? _b : 'assessment';
const dbUsername = (_c = process.env.DB_USERNAME) !== null && _c !== void 0 ? _c : 'root';
const dbPassword = (_d = process.env.DB_PASSWORD) !== null && _d !== void 0 ? _d : '';
exports.sequelize = new sequelize_1.Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
});
require('./src/models/Product');
const connection = () => {
    exports.sequelize
        .authenticate()
        .then(() => {
        console.log('Connection has been established successfully.');
    })
        .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    exports.sequelize.sync({
        force: true,
    }).then(() => {
        require('./src/seeds/productSeed');
        console.log('Connection has been established successfully.');
    })
        .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });
    ;
};
exports.connection = connection;

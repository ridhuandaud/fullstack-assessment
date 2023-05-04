
import { Sequelize } from 'sequelize';

const dbHost: string = process.env.DB_HOST ?? '127.0.0.1';
const dbDatabase: string = process.env.DB_DATABASE ?? 'assessment';
const dbUsername: string = process.env.DB_USERNAME ?? 'root';
const dbPassword: string = process.env.DB_PASSWORD ?? '';

export const sequelize = new Sequelize(dbDatabase, dbUsername, dbPassword, {
    host: dbHost,
    dialect: 'mysql'
})

require('./src/models/Product');

export const connection = () => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });


    sequelize.sync({
        force: true,
    }).then(() => {
        require('./src/seeds/productSeed');
        console.log('Connection has been established successfully.');
    })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });;
}

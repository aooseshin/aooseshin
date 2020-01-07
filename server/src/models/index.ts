import { Sequelize } from 'sequelize-typescript';
import { ENV } from '../config/env.config';
import { Dialect } from 'sequelize/types';

export const sequelize =  new Sequelize({
    database: ENV.DB_NAME,
    dialect: ENV.DB_DIALECT as Dialect,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    storage: ':memory:',
    dialectOptions: {
        socketPath: ENV.DB_SOCKET
    },
    modelPaths: [__dirname + '/*.model{.js,.ts}'],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase();
    },
});

// export const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
//     host: ENV.DB_HOST,
//     port: +ENV.DB_PORT,
//     dialect: ENV.DB_DIALECT as Dialect,
//     dialectOptions: {
//         socketPath: ENV.DB_SOCKET
//     },
//     logging: false,
// });

// sequelize.addModels([User]);
export { User } from './user.model';

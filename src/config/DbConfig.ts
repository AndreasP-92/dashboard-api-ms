import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const ssl: boolean = process.env.ENVIRONMENT == "dev" ? false : true;
const sqlHost: string = process.env.ENVIRONMENT == "dev" ? process.env.DEV_SQL_HOST ?? "" : process.env.SQL_HOST ?? "";
const sqlPort: number = process.env.ENVIRONMENT == "dev" ? Number(process.env.DEV_SQL_PORT) ?? 0 : Number(process.env.SQL_PORT) ?? 0;
const sqlUser: string = process.env.ENVIRONMENT == "dev" ? process.env.DEV_SQL_USER ?? "" : process.env.SQL_USER ?? "";
const sqlPass: string = process.env.ENVIRONMENT == "dev" ? process.env.DEV_SQL_PASS ?? "" : process.env.SQL_PASS ?? "";
const SQLDB: string = process.env.ENVIRONMENT == "dev" ? process.env.DEV_SQL_DB ?? "" : process.env.SQL_DB ?? "";

const sequelizeConnection  = new Sequelize(SQLDB, sqlUser, sqlPass, {
    host: sqlHost,
    port: sqlPort,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: ssl,
            rejectUnauthorized: false,
        },
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: "+02:00"
});

// db.users = require("../model/user")(sequelize, Sequelize);


// Syncs all of the tables >> WARNING << exclude this from production, or create migrations instead, as it deletes all rows and create new ones
// sequelize.sync({ force: true }).then(() => {
//   console.log('Tables have been created!');
// });

// Resaerch more, as it doesn't auto generate from models ==>
// More safe methods are migrations:
// 1. npm install -g sequelize-cli
// 2. npm install SQL2 --global    
// 3. sequelize init       
// 4. Go to config/config.json and set up connection to db
// 5. npx sequelize-cli migration:generate --name create-users-table
// 6. npx sequelize-cli db:migrate
// Note, if you're running es6 or "type" : "module" in package.json, migration extensions should be .cjs in /migrations

export default sequelizeConnection;

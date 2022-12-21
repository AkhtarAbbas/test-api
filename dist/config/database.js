"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConfig = void 0;
const path_1 = require("path");
const dbConfig = () => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false,
    entities: [(0, path_1.join)(__dirname, '../**/*.entity{.ts,.js}')],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    logging: false,
    migrations: [(0, path_1.join)(__dirname, '../migrations/**/*{.ts,.js}')],
    cli: {
        migrationsDir: (0, path_1.join)(__dirname, '../migrations'),
        entitiesDir: (0, path_1.join)(__dirname, '../**/*.entity{.ts,.js}'),
    },
});
exports.dbConfig = dbConfig;
exports.default = (0, exports.dbConfig)();
//# sourceMappingURL=database.js.map
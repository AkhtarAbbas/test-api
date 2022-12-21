"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    keys: {
        privateKey: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
        publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
    },
    database: (0, database_1.dbConfig)(),
});
//# sourceMappingURL=index.js.map
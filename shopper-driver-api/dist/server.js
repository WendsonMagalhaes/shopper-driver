"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./database");
const populateDrivers_1 = require("./migrations/populateDrivers");
const initDataBase_1 = require("./services/initDataBase");
const PORT = process.env.PORT || 8080;
const initializeServer = async () => {
    try {
        const db = await (0, database_1.connectDatabase)();
        await (0, initDataBase_1.createTables)();
        await (0, populateDrivers_1.populateDrivers)().then(() => {
        });
        app_1.default.listen(PORT, () => {
        });
        await db.close();
    }
    catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};
initializeServer();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTables = exports.logDatabaseContents = void 0;
const database_1 = require("../database");
const logDatabaseContents = async () => {
    const db = await (0, database_1.connectDatabase)();
    try {
        const drivers = await db.all(`SELECT * FROM drivers`);
        console.table(drivers);
        const rides = await db.all(`SELECT * FROM rides`);
        console.table(rides);
    }
    catch (error) {
        console.error('Erro ao consultar o banco de dados:', error);
    }
    finally {
        await db.close();
    }
};
exports.logDatabaseContents = logDatabaseContents;
const createTables = async () => {
    const db = await (0, database_1.connectDatabase)();
    try {
        await db.run(`
            CREATE TABLE IF NOT EXISTS rides (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id TEXT NOT NULL,
                origin TEXT NOT NULL,
                destination TEXT NOT NULL,
                distance REAL NOT NULL,
                duration TEXT NOT NULL,
                driver_id INTEGER NOT NULL,
                driver_name TEXT NOT NULL,
                value REAL NOT NULL,
                created_at DATETIME DEFAULT (DATETIME('now', 'localtime'))
            )
        `);
        await db.run(`
            CREATE TABLE IF NOT EXISTS drivers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                vehicle TEXT NOT NULL,
                review_rating REAL NOT NULL,
                review_comment TEXT,
                rate_per_km REAL NOT NULL,
                min_km REAL NOT NULL
            )
        `);
    }
    catch (error) {
        console.error('Erro ao criar as tabelas:', error);
    }
    finally {
        await db.close();
    }
};
exports.createTables = createTables;

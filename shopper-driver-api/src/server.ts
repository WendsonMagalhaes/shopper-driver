import app from './app';
import { connectDatabase } from './database';
import { populateDrivers } from './migrations/populateDrivers';
import { createTables } from './services/initDataBase';



const PORT = process.env.PORT || 8080;

const initializeServer = async () => {
    try {
        const db = await connectDatabase();

        await createTables();
        await populateDrivers().then(() => {
        });
        app.listen(PORT, () => {
        });
        await db.close();

    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

initializeServer();


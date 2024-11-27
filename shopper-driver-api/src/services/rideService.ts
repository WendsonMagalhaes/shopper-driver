import { connectDatabase } from '../database';

interface Driver {
    id: number;
    name: string;
    description: string;
    vehicle: string;
    review: {
        rating: number;
        comment: string;
    };
    ratePerKm: number;
    minKm: number;
}

export const getDrivers = async (): Promise<Driver[]> => {
    const db = await connectDatabase();
    const query = 'SELECT * FROM drivers';

    try {
        const drivers = await db.all(query);
        return drivers;
    } catch (error) {
        console.error('Erro ao buscar motoristas:', error);
        throw new Error('Erro ao recuperar motoristas do banco de dados.');
    } finally {
        await db.close();
    }
};

export const getDriverById = async (driverId: number): Promise<Driver | null> => {
    const db = await connectDatabase();
    const query = 'SELECT * FROM drivers WHERE id = ?';

    try {
        const driver = await db.get(query, [driverId]);
        return driver || null;
    } catch (error) {
        console.error('Erro ao buscar motorista:', error);
        throw new Error('Erro ao recuperar motorista do banco de dados.');
    } finally {
        await db.close();
    }
};

export const addDriver = async (driver: Driver): Promise<void> => {
    const db = await connectDatabase();

    const query = `
        INSERT INTO drivers (name, description, vehicle, review_rating, review_comment, rate_per_km, min_km)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await db.run(query, [
            driver.name,
            driver.description,
            driver.vehicle,
            driver.review.rating,
            driver.review.comment,
            driver.ratePerKm,
            driver.minKm
        ]);
        console.log('Motorista adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar motorista:', error);
        throw new Error('Erro ao adicionar motorista no banco de dados.');
    } finally {
        await db.close();
    }
};

export const validateRideRequest = (customerId: string, origin: string, destination: string): string | null => {

    if (typeof customerId !== 'string') return 'O ID do usuário deve ser uma string.';
    if (typeof origin !== 'string') return 'O endereço de origem deve ser uma string.';
    if (typeof destination !== 'string') return 'O endereço de destino deve ser uma string.';

    if (!customerId) return 'O ID do usuário é obrigatório.';
    if (!origin || !destination) return 'Os endereços de origem e destino são obrigatórios.';

    if (origin === destination) return 'Os endereços de origem e destino não podem ser iguais.';

    return null;
};

export const validateRideData = (body: any): string | null => {
    if (!body.customer_id || typeof body.customer_id !== 'string') {
        return 'O campo customer_id é obrigatório e deve ser uma string.';
    }

    if (!body.origin || typeof body.origin !== 'string') {
        return 'O campo origin é obrigatório e deve ser uma string.';
    }

    if (!body.destination || typeof body.destination !== 'string') {
        return 'O campo destination é obrigatório e deve ser uma string.';
    }
    if (body.origin === body.destination) {
        return 'Os endereços de origem e destino não podem ser iguais.';
    }
    if (typeof body.distance !== 'number' || body.distance <= 0) {
        return 'O campo distance deve ser um número maior que zero.';
    }

    if (!body.duration || typeof body.duration !== 'string') {
        return 'O campo duration é obrigatório e deve ser uma string.';
    }

    if (!body.driver || typeof body.driver !== 'object') {
        return 'O campo driver deve ser um objeto.';
    }

    if (typeof body.driver.id !== 'number') {
        return 'O campo driver.id deve ser um número.';
    }

    if (typeof body.driver.name !== 'string') {
        return 'O campo driver.name deve ser uma string.';
    }

    if (typeof body.value !== 'number' || body.value <= 0) {
        return 'O campo value deve ser um número maior que zero.';
    }

    return null;
};


export const calculateDriverOptions = async (distance: number) => {
    const db = await connectDatabase();

    try {
        const drivers = await db.all('SELECT * FROM drivers');

        const options = drivers
            .filter((driver: any) => distance / 100 >= driver.min_km)
            .map((driver: any) => ({
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                    rating: driver.review_rating,
                    comment: driver.review_comment
                },
                value: Math.round((driver.rate_per_km * (distance / 1000)) * 100) / 100,
            }));

        return options;
    } catch (error) {
        console.error('Erro ao calcular as opções de motoristas:', error);
        return [];
    } finally {
        await db.close();
    }
};

export const validateDriver = async (
    driverId: number,
    driverName: string,
    distance: number
): Promise<{ code: string; message: string } | null> => {
    const db = await connectDatabase();

    try {
        const driver = await db.get(
            'SELECT * FROM drivers WHERE id = ? AND name = ?',
            [driverId, driverName]
        );

        if (!driver) {
            return {
                code: 'DRIVER_NOT_FOUND',
                message: 'Motorista não encontrado'
            };
        }

        if (distance < driver.min_km) {
            return {
                code: 'INVALID_DISTANCE',
                message: 'Quilometragem inválida para o motorista',
            };
        }

        return null;
    } catch (error) {
        console.error('Erro ao validar motorista:', error);
        throw error;
    } finally {
        await db.close();
    }
};


export const saveRide = async (rideData: {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number;
    duration: string;
    driver_id: number;
    driver_name: string;
    value: number;
}): Promise<void> => {
    const db = await connectDatabase();

    try {
        await db.run(
            `INSERT INTO rides (customer_id, origin, destination, distance, duration, driver_id, driver_name, value)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                rideData.customer_id,
                rideData.origin,
                rideData.destination,
                rideData.distance,
                rideData.duration,
                rideData.driver_id,
                rideData.driver_name,
                rideData.value,
            ]
        );
        console.log('Viagem salva com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar viagem:', error);
        throw new Error('Erro ao salvar viagem no banco de dados.');
    } finally {
        await db.close();
    }
};

export const getRidesByCustomerService = async (customer_id: string, driver_id: number | null): Promise<any[]> => {
    const db = await connectDatabase();

    try {
        const query = `
            SELECT r.id, r.created_at , r.origin, r.destination, r.distance, r.duration, r.value,
                   d.id AS driver_id, d.name AS driver_name
            FROM rides r
            INNER JOIN drivers d ON r.driver_id = d.id
            WHERE r.customer_id = ?
            ${driver_id ? 'AND r.driver_id = ?' : ''}
            ORDER BY r.created_at  DESC
        `;

        const params = driver_id ? [customer_id, driver_id] : [customer_id];
        const rides = await db.all(query, params);

        return rides.map((ride: any) => ({
            id: ride.id,
            date: ride.created_at,
            origin: ride.origin,
            destination: ride.destination,
            distance: ride.distance,
            duration: ride.duration,
            driver: {
                id: ride.driver_id,
                name: ride.driver_name,
            },
            value: ride.value,
        }));
    } catch (error) {
        console.error('Erro ao buscar viagens no banco de dados:', error);
        throw error;
    } finally {
        await db.close();
    }
};


export const validateDriverId = async (
    driverId: number,
): Promise<{ code: string; message: string } | null> => {
    const db = await connectDatabase();

    try {
        const driver = await db.get(
            'SELECT * FROM drivers WHERE id = ?',
            [driverId]
        );

        if (!driver) {
            return {
                code: 'INVALID_DRIVER',
                message: 'Motorista invalido'
            };
        }

        return null;
    } catch (error) {
        console.error('Erro ao validar motorista:', error);
        throw error;
    } finally {
        await db.close();
    }
};
import { Request, Response } from 'express';
import axios from 'axios';
import { validateRideRequest, calculateDriverOptions, validateDriver, saveRide, getRidesByCustomerService, validateDriverId, validateRideData } from '../services/rideService';
import { connectDatabase } from '../database';
import dotenv from 'dotenv';
dotenv.config();

export const estimateRide = async (req: Request, res: Response): Promise<void> => {
    const { customer_id, origin, destination } = req.body;

    const validationError = validateRideRequest(customer_id, origin, destination);
    if (validationError) {
        res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: validationError,
        });
        return;
    }

    try {
        const googleApiKey = process.env.GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
            origin
        )}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;
        const routeResponseData = await axios.get(url);

        const routeResponse = routeResponseData.data.routes[0];
        const distance = routeResponse.legs[0].distance.value;
        const duration = routeResponse.legs[0].duration.text;

        const options = await calculateDriverOptions(distance);

        res.status(200).json({
            origin: {
                latitude: routeResponse.legs[0].start_location.lat,
                longitude: routeResponse.legs[0].start_location.lng,
            },
            destination: {
                latitude: routeResponse.legs[0].end_location.lat,
                longitude: routeResponse.legs[0].end_location.lng,
            },
            distance: distance,
            duration,
            options,
            routeResponse
        });
    } catch (error: any) {
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: error.message || 'Erro interno do servidor',
        });
    }
};

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
    // Validar todos os dados da requisição
    const validationError = validateRideData(req.body);
    if (validationError) {
        res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: validationError,
        });
        return;
    }



    const { customer_id, origin, destination, distance, duration, driver, value } = req.body;

    try {
        const driverError = await validateDriver(driver.id, driver.name, distance);
        if (driverError) {
            const statusCode = driverError.code === 'DRIVER_NOT_FOUND' ? 404 : 406;
            res.status(statusCode).json({
                error_code: driverError.code,
                error_description: driverError.message,
            });
            return;
        }

        await saveRide({
            customer_id,
            origin,
            destination,
            distance,
            duration,
            driver_id: driver.id,
            driver_name: driver.name,
            value,
        });

        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro ao salvar a viagem no banco de dados.',
        });
    }
};


export const getRidesByCustomer = async (req: Request, res: Response): Promise<void> => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    try {
        if (driver_id) {
            const validationErrorDriverId = await validateDriverId(Number(driver_id));
            if (validationErrorDriverId) {
                res.status(400).json({
                    error_code: validationErrorDriverId.code,
                    error_description: validationErrorDriverId.message,
                });
                return;
            }
        }

        const rides = await getRidesByCustomerService(customer_id, driver_id ? Number(driver_id) : null);

        if (!rides || rides.length === 0) {
            res.status(404).json({
                error_code: 'NO_RIDES_FOUND',
                error_description: 'Nenhum registro encontrado',
            });
            return;
        }

        res.status(200).json({
            customer_id,
            rides,
        });
    } catch (error) {
        console.error('Erro ao buscar viagens:', error);
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro interno ao processar a solicitação.',
        });
    }
};


export const listDrivers = async (req: Request, res: Response): Promise<void> => {
    const db = await connectDatabase();

    try {
        const drivers = await db.all('SELECT * FROM drivers');
        res.status(200).json({ drivers });
    } catch (error: any) {
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro ao listar motoristas.',
        });
    } finally {
        await db.close();
    }
};

export const addDriver = async (req: Request, res: Response): Promise<void> => {
    const { name, description, vehicle, review_rating, review_comment, rate_per_km, min_km } = req.body;
    const db = await connectDatabase();

    try {
        await db.run(
            `INSERT INTO drivers (name, description, vehicle, review_rating, review_comment, rate_per_km, min_km)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, description, vehicle, review_rating, review_comment, rate_per_km, min_km]
        );

        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: 'Erro ao adicionar motorista.',
        });
    } finally {
        await db.close();
    }
};

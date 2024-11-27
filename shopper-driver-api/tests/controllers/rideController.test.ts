import app from '../../src/app';
import request from 'supertest';

describe('Ride Controller - estimateRide', () => {
    it('should return 400 if validation fails', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if customer_id is missing', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if customer_id is empty', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '',
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if customer_id is not a string', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: 123,
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if customer_id is null', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: null,
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if origin is missing', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if origin is empty', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: '',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if origin is not a string', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 123,
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if origin is null', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: null,
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });

    it('should return 400 if destination is missing', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if destination is empty', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: '',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if destination is not a string', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: 123,
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if destination is null', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: null,
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });
    it('should return 400 if origin equals destination', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua A, São Paulo - SP',
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');

    });

    it('should return 200 if ride estimate is successful', async () => {
        const res = await request(app)
            .post('/ride/estimate')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua B, São Paulo - SP',
            });

        expect(res.status).toBe(200);
        expect(res.body.distance).toBeDefined();
        expect(res.body.options).toBeDefined();
    }, 10000);

});

describe('Ride Controller - confirmRide', () => {
    it('should return 400 if validation fails (missing required fields)', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if customer_id is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if customer_id is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '',
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if customer_id is not a string', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: 123,
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if customer_id is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: null,
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if origin is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if origin is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: '',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if origin is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: null,
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if origin is not a string', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 123,
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if destination is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if destination is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua B, 456',
                destination: '',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if destination is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua B, 456',
                destination: null,
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if destination is not a string', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua B, 456',
                destination: 123,
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if origin equals destination', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua A, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 400 if distance is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if distance is not a number', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: '10',
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if distance is equal to zero', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 0,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if distance is less than zero', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: -10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if distance is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: '',
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if distance is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: null,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if duration is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if duration is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if duration is not a string', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: 25,
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if duration is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: null,
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if driver is missing', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if driver is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: '',
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if driver is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: null,
                value: 50.0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is missig', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                }
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is empty', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: ''
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is not number', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: '50.0'
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is null', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: null
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is equal zero', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 0
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });
    it('should return 400 if value is less than zero', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 456',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: -10
            });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DATA');
    });

    it('should return 404 if driver is not found', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '123',
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 4,
                    name: 'Toretto'
                },
                value: 50.0
            });

        expect(res.status).toBe(404);
        expect(res.body.error_code).toBe('DRIVER_NOT_FOUND');
    });


    it('should return 406 if driver is invalid for the ride', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, São Paulo - SP',
                destination: 'Rua B, São Paulo - SP',
                distance: 5,
                duration: '2 hours',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 300,
            });

        expect(res.status).toBe(406);
        expect(res.body.error_code).toBe('INVALID_DISTANCE');
    });

    it('should return 200 and save the ride successfully', async () => {
        const res = await request(app)
            .patch('/ride/confirm')
            .send({
                customer_id: '12345',
                origin: 'Rua A, 123',
                destination: 'Rua B, 456',
                distance: 10,
                duration: '25 mins',
                driver: {
                    id: 3,
                    name: 'James Bond'
                },
                value: 50.0
            });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
});

describe('Ride Controller - getRidesByCustomer', () => {

    it('should return 200 with rides filtered by customer_id and driver_id', async () => {
        const res = await request(app)
            .get('/ride/12345')
            .query({ driver_id: 2 });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('customer_id', '12345');
        expect(res.body).toHaveProperty('rides');
        expect(Array.isArray(res.body.rides)).toBe(true);
    });
    it('should return 200 with rides filtered by customer_id', async () => {
        const res = await request(app)
            .get('/ride/12345');


        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('customer_id', '12345');
        expect(res.body).toHaveProperty('rides');
        expect(Array.isArray(res.body.rides)).toBe(true);
    });

    it('should return 404 if no rides are found for the given customer_id and driver_id', async () => {
        const res = await request(app)
            .get('/ride/99999')
            .query({ driver_id: 2 });

        expect(res.status).toBe(404);
        expect(res.body.error_code).toBe('NO_RIDES_FOUND');
    });

    it('should return 404 if no rides are found for the given customer_id', async () => {
        const res = await request(app)
            .get('/ride/99999')
        expect(res.status).toBe(404);
        expect(res.body.error_code).toBe('NO_RIDES_FOUND');
    });
    it('should return 400 if the driver_id is invalid', async () => {
        const res = await request(app)
            .get('/ride/12345')
            .query({ driver_id: 99999 });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DRIVER');
    });
    it('should return 400 if the customer_id and driver_id is invalid', async () => {
        const res = await request(app)
            .get('/ride/99999')
            .query({ driver_id: 99999 });

        expect(res.status).toBe(400);
        expect(res.body.error_code).toBe('INVALID_DRIVER');
    });


});

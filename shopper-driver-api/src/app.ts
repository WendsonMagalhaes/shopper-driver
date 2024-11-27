import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { estimateRide, confirmRide, getRidesByCustomer } from './controllers/rideController';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.post('/ride/estimate', estimateRide);
app.patch('/ride/confirm', confirmRide);
app.get('/ride/:customer_id', getRidesByCustomer);



export default app;

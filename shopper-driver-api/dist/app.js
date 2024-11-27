"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const rideController_1 = require("./controllers/rideController");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post('/ride/estimate', rideController_1.estimateRide);
app.patch('/ride/confirm', rideController_1.confirmRide);
app.get('/ride/:customer_id', rideController_1.getRidesByCustomer);
exports.default = app;

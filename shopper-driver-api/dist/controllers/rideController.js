"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateRide = void 0;
const axios_1 = __importDefault(require("axios"));
const rideService_1 = require("../services/rideService");
const estimateRide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer_id, origin, destination } = req.body;
    // Validações
    const validationError = (0, rideService_1.validateRideRequest)(customer_id, origin, destination);
    if (validationError) {
        res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: validationError,
        });
        return;
    }
    try {
        // Buscar dados da rota na API do Google Maps
        const googleApiKey = process.env.GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&key=${googleApiKey}`;
        const routeResponse = yield axios_1.default.get(url);
        const routeData = routeResponse.data.routes[0];
        const distanceInKm = routeData.legs[0].distance.value / 1000;
        const duration = routeData.legs[0].duration.text;
        // Calcular opções de motoristas
        const options = (0, rideService_1.calculateDriverOptions)(distanceInKm);
        res.status(200).json({
            origin: {
                latitude: routeData.legs[0].start_location.lat,
                longitude: routeData.legs[0].start_location.lng,
            },
            destination: {
                latitude: routeData.legs[0].end_location.lat,
                longitude: routeData.legs[0].end_location.lng,
            },
            distance: distanceInKm,
            duration,
            options,
            routeResponse: routeResponse.data,
        });
    }
    catch (error) {
        res.status(500).json({
            error_code: 'INTERNAL_ERROR',
            error_description: error.message || 'Erro interno do servidor',
        });
    }
});
exports.estimateRide = estimateRide;

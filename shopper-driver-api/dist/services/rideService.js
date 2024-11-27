"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDriverOptions = exports.validateRideRequest = void 0;
const drivers = [
    {
        id: 1,
        name: 'Homer Simpson',
        description: 'Olá! Sou o Homer...',
        vehicle: 'Plymouth Valiant 1973 rosa e Enferrujado',
        review: { rating: 2, comment: 'Motorista simpático...' },
        ratePerKm: 2.5,
        minKm: 1,
    },
    {
        id: 2,
        name: 'Dominic Toretto',
        description: 'Ei, aqui é o Dom...',
        vehicle: 'Dodge Charger R/T 1970 Modificado',
        review: { rating: 4, comment: 'Que viagem incrível!...' },
        ratePerKm: 5.0,
        minKm: 5,
    },
    {
        id: 3,
        name: 'James Bond',
        description: 'Boa noite, sou James Bond...',
        vehicle: 'Aston Martin DB5 Clássico',
        review: { rating: 5, comment: 'Serviço impecável!...' },
        ratePerKm: 10.0,
        minKm: 10,
    },
];
const validateRideRequest = (customerId, origin, destination) => {
    if (!customerId)
        return 'O ID do usuário é obrigatório.';
    if (!origin || !destination)
        return 'Os endereços de origem e destino são obrigatórios.';
    if (origin === destination)
        return 'Os endereços de origem e destino não podem ser iguais.';
    return null;
};
exports.validateRideRequest = validateRideRequest;
const calculateDriverOptions = (distance) => {
    return drivers
        .filter(driver => distance >= driver.minKm)
        .map(driver => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        review: driver.review,
        value: driver.ratePerKm * distance,
    }))
        .sort((a, b) => a.value - b.value);
};
exports.calculateDriverOptions = calculateDriverOptions;

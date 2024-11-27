import React from 'react';
import './RideCard.css';

interface RideCardProps {
    ride: {
        date: string;
        driver: { name: string };
        origin: string;
        destination: string;
        distance: number;
        duration: string;
        value: number;
    };
}

const RideCard: React.FC<RideCardProps> = ({ ride }) => {

    const formattedDate = new Date(ride.date).toLocaleDateString('pt-BR');
    const formattedTime = new Date(ride.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let driverPhoto;
    try {
        driverPhoto = require(`../../assets/images/drivers/${ride.driver.name}.webp`);
    } catch {
        driverPhoto = require('../../assets/images/drivers/car_driver.webp');
    }
    function translateDuration(duration: string): string {
        if (!duration) return "";

        const translations = {
            day: "dia",
            days: "dias",
            hour: "hora",
            hours: "horas",
            minute: "minuto",
            minutes: "minutos",
        };

        return duration
            .replace(/day(s?)/g, (_, plural: string) => (plural ? "dias" : "dia"))
            .replace(/hour(s?)/g, (_, plural: string) => (plural ? "horas" : "hora"))
            .replace(/minute(s?)/g, (_, plural: string) => (plural ? "minutos" : "minuto"));
    }
    return (
        <div className="ride-card">
            <div className="ride-info">
                <div className="ride-header">
                    <p><strong>Sua viagem</strong></p>
                    <p>{formattedDate} - {formattedTime}</p>
                </div>
                <div className="driver-info">
                    <img src={driverPhoto} alt={ride.driver.name} className="driver-photo" />
                    <p><strong>{ride.driver.name}</strong></p>
                </div>
            </div>
            <div className="ride-details">
                <p> <strong><i className="far fa-flag icon-ride-card"></i></strong> {ride.origin}</p>
                <p><strong><i className="fas fa-map-marker icon-ride-card"></i></strong> {ride.destination}</p>
                <div className="ride-stats">
                    <p><strong><i className="fas fa-route icon-ride-card"></i></strong> {ride.distance} m</p>
                    <p><strong><i className="fas fa-clock icon-ride-card"></i></strong> {translateDuration(ride.duration)}</p>
                    <p><strong><i className="fas fa-money-bill icon-ride-card"></i></strong> R$ {ride.value.toFixed(2).replace('.', ',')}
                    </p>
                </div>
            </div>
        </div>
    );
};


export default RideCard;

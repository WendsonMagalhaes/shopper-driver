import React from 'react';
import './DriverCard.css';

interface DriverCardProps {
    driver: {
        id: number;
        name: string;
        review: { rating: number };
        description: string;
        vehicle: string;
        vehiclePhoto: string;
        value: number;
    };
    handleConfirmRide: (driverId: number, driverName: string, driverValue: number) => void;
}


const DriverCard: React.FC<DriverCardProps> = ({ driver, handleConfirmRide }) => {
    let driverPhoto;
    let carPhoto;

    try {
        driverPhoto = require(`../../assets/images/drivers/${driver.name}.webp`);
    } catch {
        driverPhoto = require('../../assets/images/drivers/car_driver.webp');
    }
    try {
        carPhoto = require(`../../assets/images/cars/${driver.vehicle.split(" ")[0]}.webp`);
    } catch {
        carPhoto = require('../../assets/images/cars/car_default.webp');
    }
    return (
        <div className="driver-card">
            <div className="driver-info">
                <img src={driverPhoto} alt={driver.name} className="driver-photo-driver-card" />
                <p className="driver-name">{driver.name}</p>
                <div className="driver-rating">
                    {[...Array(5)].map((_, index) => (
                        <span key={index} className={index < driver.review.rating ? 'filled-star' : 'empty-star'}>
                            ★
                        </span>
                    ))}
                </div>
                <p className="driver-description">{driver.description}</p>
            </div>
            <div className="car-info">
                <div className="car-details">
                    <div className="vehicle-image">
                        <img src={carPhoto} alt={driver.vehicle} className="vehicle-photo" />
                        <p className="vehicle-name">{driver.vehicle}</p>
                    </div>
                </div>

                <div className="ride-value-container">
                    <p className="ride-value">
                        {typeof driver.value === 'number' ? `R$ ${driver.value.toFixed(2).replace('.', ',')}` : 'Valor indisponível'}
                    </p>
                </div>
            </div>
            <div className="confirm-ride">
                <button className="button-driver-card" onClick={() => handleConfirmRide(driver.id, driver.name, driver.value)}>
                    Iniciar
                </button>
            </div>
        </div>
    );
};

export default DriverCard;

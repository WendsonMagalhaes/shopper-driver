import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import DriverCard from '../../componets/DriverCard/DriverCard';
import './RideOptions.css';
import ErrorModal from '../../componets/ErrorModal/ErrorModal';
import { AxiosError } from 'axios';

const RideOptions: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { options, origin, destination, distance, duration, routeResponse, customer_id, origin_address, destination_address } = location.state || {};
    const [staticMapUrl, setStaticMapUrl] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (routeResponse && routeResponse.legs && routeResponse.legs.length > 0) {
            const route = routeResponse.legs[0];
            const points = route.steps.map((step: any) => {
                return `${step.end_location.lat},${step.end_location.lng}`;
            });
            const startLatLng = `${origin.latitude},${origin.longitude}`;
            const endLatLng = `${destination.latitude},${destination.longitude}`;
            const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
            const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x310&path=color:blue|weight:5|${points.join('|')}&markers=color:green|label:A|${startLatLng}&markers=color:red|label:B|${endLatLng}&key=${apiKey}`;
            setStaticMapUrl(mapUrl);
        }
    }, [routeResponse, origin, destination]);

    const handleConfirmRide = async (driverId: number, driverName: string, driverValue: number) => {
        try {
            const requestData = {
                customer_id: customer_id,
                origin: origin_address,
                destination: destination_address,
                distance: distance,
                duration: duration,
                driver: { id: driverId, name: driverName },
                value: driverValue
            };

            await api.patch('/ride/confirm', requestData);
            navigate('/ride-history');
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error?.response?.data?.error_description) {
                    setErrorMessage(error.response.data.error_description);

                } else {
                    setErrorMessage('Ocorreu um erro ao confirmar a viagem. Tente novamente.');
                }
            } else {
                setErrorMessage('Ocorreu um erro desconhecido. Tente novamente.');
            }
        }
    };
    const closeModal = () => {
        setErrorMessage(null);
    };
    if (!options || !origin || !destination) return <p>Carregando...</p>;


    return (
        <div className="ride-options-container">
            <section className="top-section">
                <div className="route-info">
                    {routeResponse?.legs?.length > 0 && (
                        <div>
                            <h2>Informações da Rota</h2>
                            <div className="origin-destination">
                                <label className="input-like">
                                    <span className="input-label">Origem:</span>
                                    <i className="far fa-flag input-icon-options"></i>
                                    <div className="input-content">
                                        <p>{origin_address}</p>
                                    </div>
                                </label>
                                <label className="input-like">
                                    <span className="input-label">Destino:</span>
                                    <i className="fas fa-map-marker input-icon-options"></i>
                                    <div className="input-content">
                                        <p>{destination_address}</p>
                                    </div>
                                </label>
                            </div>
                            <div className="distance-duration">
                                <label className="input-like">
                                    <span className="input-label">Distância:</span>
                                    <i className="fas fa-route input-icon-options-02"></i>
                                    <div className="input-content">
                                        <p>{distance} m</p>
                                    </div>
                                </label>
                                <label className="input-like">
                                    <span className="input-label">Duração:</span>
                                    <i className="fas fa-clock input-icon-options-02"></i>
                                    <div className="input-content">
                                        <p>{(duration)}</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>
                <div className="map-container">
                    {staticMapUrl && (
                        <div>
                            <img src={staticMapUrl} alt="Mapa da rota" />
                        </div>
                    )}
                </div>
            </section>
            <section className="bottom-section">
                {options.map((driver: any) => (
                    <DriverCard
                        key={driver.id}
                        driver={driver}
                        handleConfirmRide={handleConfirmRide}
                    />
                ))}
            </section>
            {errorMessage && <ErrorModal message={errorMessage} onClose={closeModal} />}

        </div>
    );
};

export default RideOptions;

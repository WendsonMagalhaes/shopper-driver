import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './RideRequest.css';
import ErrorModal from '../../componets/ErrorModal/ErrorModal';
import { AxiosError } from 'axios';

const loadGoogleMapsScript = (apiKey: string) => {
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
        console.log("Google Maps API carregada com sucesso.");
    };
    document.body.appendChild(script);
};

const RideRequest: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customer_id: '',
        origin: '',
        origin_adress: '',
        destination: '',
        destination_adress: '',

    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const originInputRef = useRef<HTMLInputElement>(null);
    const destinationInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        if (apiKey) {
            loadGoogleMapsScript(apiKey);
        } else {
            console.error("Google API Key is not defined");
        }

        const interval = setInterval(() => {
            if (window.google && window.google.maps) {
                clearInterval(interval);

                const originAutocomplete = new window.google.maps.places.Autocomplete(originInputRef.current!, {
                    types: ['geocode'],
                    componentRestrictions: { country: 'br' },
                });

                originAutocomplete.addListener('place_changed', () => {
                    const place = originAutocomplete.getPlace();
                    setFormData((prev) => ({
                        ...prev,
                        origin: place.formatted_address || '',
                    }));
                });

                const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationInputRef.current!, {
                    types: ['geocode'],
                    componentRestrictions: { country: 'br' },
                });

                destinationAutocomplete.addListener('place_changed', () => {
                    const place = destinationAutocomplete.getPlace();
                    setFormData((prev) => ({
                        ...prev,
                        destination: place.formatted_address || '',
                    }));
                });
            }
        }, 100);

        return () => clearInterval(interval);

    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEstimate = async (e: React.FormEvent) => {
        e.preventDefault();



        setIsLoading(true);

        try {
            const response = await api.post('/ride/estimate', formData);
            const dataToSend = {
                ...response.data,
                customer_id: formData.customer_id,
                origin_address: formData.origin,
                destination_address: formData.destination,

            };

            navigate('/ride-options', { state: dataToSend });
        } catch (error) {

            if (error instanceof AxiosError) {
                if (error?.response?.data?.error_description) {
                    setErrorMessage(error.response.data.error_description);


                } else {
                    setErrorMessage('Ocorreu um erro ao estimar a viagem. Tente novamente.');
                }
            } else {
                setErrorMessage('Ocorreu um erro desconhecido. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };


    const closeModal = () => {
        setErrorMessage(null);
    };


    return (
        <div className="container">
            <h1>Solicite sua Viagem</h1>
            <form onSubmit={handleEstimate}>
                <div className="input-group">
                    <div className="input-icon">
                        <i className="far fa-user-circle"></i>
                    </div>

                    <input
                        type="text"
                        name="customer_id"
                        id="customer_id"
                        placeholder="ID do Usuário"
                        value={formData.customer_id}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="far fa-flag"></i>
                        </div>
                        <input
                            ref={originInputRef}
                            type="text"
                            name="origin"
                            id="origin"
                            placeholder="Endereço de Origem"
                            value={formData.origin}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="line"></div>
                    <div className="circle"></div>
                    <div className="square"></div>
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="fas fa-map-marker"></i>
                        </div>
                        <input
                            ref={destinationInputRef}
                            type="text"
                            name="destination"
                            id="destination"
                            placeholder="Endereço de Destino"
                            value={formData.destination}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="button-submit"
                >
                    {isLoading ? 'Carregando...' : 'Procurar'}
                </button>
            </form>
            {errorMessage && <ErrorModal message={errorMessage} onClose={closeModal} />}

        </div>
    );
};

export default RideRequest;

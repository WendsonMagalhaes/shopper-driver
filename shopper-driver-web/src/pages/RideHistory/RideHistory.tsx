import React, { useState } from 'react';
import api from '../../services/api';
import RideCard from '../../componets/RideCard/RideCard';
import './RideHistory.css';
import ErrorModal from '../../componets/ErrorModal/ErrorModal';
import { AxiosError } from 'axios';

const RideHistory: React.FC = () => {
    const [filters, setFilters] = useState({ custumerId: '', driverId: '' });
    const [rides, setRides] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleFilter = async () => {

        const { custumerId, driverId } = filters;
        if (!custumerId) {
            setErrorMessage('O ID do usuário é obrigatório.');
        } else {

            try {
                const response = await api.get(`/ride/${custumerId}`, {
                    params: driverId ? { driver_id: driverId } : {},
                });

                setRides(response.data.rides || []);
            } catch (error) {

                if (error instanceof AxiosError) {
                    if (error?.response?.data?.error_description) {
                        setErrorMessage(error.response.data.error_description);

                    } else {
                        setErrorMessage('Ocorreu um erro ao buscar histórico de viagens. Tente novamente.');
                    }
                } else {
                    setErrorMessage('Ocorreu um erro desconhecido. Tente novamente.');
                }
            }
        }
    };

    const closeModal = () => {
        setErrorMessage(null);
    };

    return (
        <div className="ride-history-container">
            <section className="filter-section">
                <h1>Histórico de Viagens</h1>
                <div className="filter-container">
                    <div className="input-group">
                        <div className="input-icon">
                            <i className="far fa-user-circle"></i>
                        </div>

                        <input
                            type="text"
                            name="custumerId"
                            id="custumer_id"
                            placeholder="ID do Usuário"
                            value={filters.custumerId}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="select-group">
                        <div className="select-icon">
                            <i className="fas fa-car"></i>
                        </div>
                        <select
                            className="driver-select"
                            name="driverId"
                            value={filters.driverId}
                            onChange={handleChange}
                        >
                            <option value="">Todos os Motoristas</option>
                            <option value="1">Homer Simpson</option>
                            <option value="2">Dominic Toretto</option>
                            <option value="3">James Bond</option>
                            <option value="4">Ayrton Senna</option>
                        </select>
                    </div>


                    <button onClick={handleFilter}>Filtrar</button>
                </div>
            </section>
            <div>
                {rides.length > 0 ? (
                    rides.map((ride: any) => (
                        <RideCard key={ride.id} ride={ride} />
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            {errorMessage && <ErrorModal message={errorMessage} onClose={closeModal} />}

        </div>
    );
};

export default RideHistory;

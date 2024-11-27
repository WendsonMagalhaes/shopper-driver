import React from 'react';
import './ErrorModal.css';

interface ErrorModalProps {
    message: string;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <button onClick={onClose} className="button-close">X</button>
                </div>
                <div className="modal-content">
                    <p>{message}</p>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;

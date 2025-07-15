import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return 'ri-check-circle-line';
            case 'error':
                return 'ri-error-warning-line';
            case 'warning':
                return 'ri-alert-line';
            default:
                return 'ri-information-line';
        }
    };

    return (
        <div className={`toast toast-${type} ${isVisible ? 'show' : 'hide'}`}>
            <div className="toast-content">
                <i className={getIcon()}></i>
                <span>{message}</span>
            </div>
            <button className="toast-close" onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
            }}>
                <i className="ri-close-line"></i>
            </button>
        </div>
    );
};

export default Toast;

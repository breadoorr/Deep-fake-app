import React from 'react';
import './Loading.css';

export const LoadingScreen = () => {
    return (
        <div className="loading-container">

            <div className="cute-icon">🐾</div>

            <div className="loading-animation"></div>

            <p className="loading-text">Loading... Please Wait!</p>
        </div>
    );
};

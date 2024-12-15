import React from 'react';
import './Loading.css';
import Champ from "../asseta/images/little-dance2.gif"; //https://nationriox.tumblr.com/post/737077579950047232

export const LoadingScreen = () => {
    return (
        <div className="loading-container">

            <div className="cute-icon">🐾</div>
                <img
                    src={Champ}
                    alt="Champion"
                    style={{
                        width: '200px',
                        marginBottom: '20px',
                        borderRadius: '10px',
                        display: 'block',
                        margin: '0 auto'
                    }}
                />
            <p className="loading-text">Loading... Please Wait!</p>
        </div>
    );
};

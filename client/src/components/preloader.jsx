import React, { Component } from 'react';
import './css/preloader.scss';

class Preloader extends Component {
    render() {
        return (
            <div className="bb">
                <div className="loading">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
        );
    }
}

export default Preloader;
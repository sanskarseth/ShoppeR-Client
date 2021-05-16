import React, { Component } from 'react';
import loader from '../images/g0RB.gif';

class Loader extends Component {
    render() {
        return (
            <div>
                <img src={loader} style={{display:'block',margin:'auto'}} alt="loader" />
            </div>
        );
    }
}

export default Loader;
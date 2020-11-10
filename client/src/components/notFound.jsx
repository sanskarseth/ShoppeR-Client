import React, { Component } from 'react';
import "./css/notFound.css";
import {Link} from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="continer-fluid mainbox">
        <div className="roww">
          <div className="col-xs-12 col-xl-12 col-xl-12 col-sm-12 not-area">
            <p className="num">
              4
              <i className="fa fa-question-circle rotate fa-spin" aria-hidden="true" />
              4
            </p>
                
            <p className="msg">
              Maybe this page moved? < br/>
              Got deleted? < br/>
              Is hiding out in quarantine? < br/>
              Never existed in
              the first place? <br />
              Let's go 
              <Link to="/"> home </Link>
              and try from there.
              <br />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;

import React, { Component } from 'react';
import "./css/footer.css";
import { DiReact, DiMongodb, DiGithubBadge } from "react-icons/di";
import { FaNode } from "react-icons/fa";
import { SiNetlify } from "react-icons/si";
import { GrHeroku } from "react-icons/gr";

class Footer extends Component {
    render() {
        return (
            <div className="container-fluid footer">
                <div className="row1">

                    
                    <div className="col-xs-6 col-xl-6 col-xl-6 col-sm-6 about">
                        <p className="par">
                            About: This is a demo shopping website for
                            college students for the purchase of official
                            t-shirts, hoodies, sports-jerseies, etc.
                            
                            The main idea for making this website is to 
                            implement a real world web-application.
                            <br />
                            <br />
                            
                            <span className="col-xs-6 col-xl-6 col-xl-6 col-sm-6 about">
                                <a className="gith" rel="noopener noreferrer" target="_blank" href="https://github.com/sanskarseth"><u>Source Code</u><span role="img" aria-label="book">📝</span></a>
                            </span>
                            
                            <span className="col-xs-6 col-xl-6 col-xl-6 col-sm-6 about">
                                <a className="gith" rel="noopener noreferrer" target="_blank" href="https://github.com/sanskarseth"><u>Report a Bug</u><span role="img" aria-label="bug">🐛</span></a> 
                            </span>
                            
                        </p>

                    </div>


                    <div className="footer-logo-collection col-xs-6 col-xl-6 col-xl-6 col-sm-6">
                        <DiReact className="footer-logo" style={{ color: "#61dafb" }} />
                        <FaNode className="footer-logo" style={{ color: "#026e00" }} />
                        <DiMongodb className="footer-logo" style={{ color: "#13aa52" }} />
                        <SiNetlify className="footer-logo" style={{ color: "#227aa9" }} />
                        <GrHeroku className="footer-logo" style={{ color: "#79589f" }} />
                        <DiGithubBadge className="footer-logo" style={{ color: "white" }} />
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 about">
                        <hr className="hrule" />
                        <div className="love">
                                Made with ❤ by <a className="gith" target="_blank" rel="noopener noreferrer" href="https://github.com/sanskarseth">Sanskar</a> ©️ 2020.
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
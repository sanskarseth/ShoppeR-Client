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

                <div className="row footer-logo-collection">
                    <DiReact className="footer-logo" style={{ color: "#61dafb" }} />
                    <FaNode className="footer-logo" style={{ color: "#026e00" }} />
                    <DiMongodb className="footer-logo" style={{ color: "#13aa52" }} />
                    <SiNetlify className="footer-logo" style={{ color: "#227aa9" }} />
                    <GrHeroku className="footer-logo" style={{ color: "#79589f" }} />
                    <DiGithubBadge className="footer-logo" style={{ color: "white" }} />
                </div>

                <div className="row fcontent">
                        
                    <span>
                        <a className="flink" rel="noopener noreferrer" target="_blank" href="https://github.com/sanskarseth/ShoppeR"><u>Source Code</u><span role="img" aria-label="book">📝</span></a>
                    </span>
                    
                    <span>
                        <a className="flink" rel="noopener noreferrer" target="_blank" href="https://github.com/sanskarseth/ShoppeR"><u>Know More</u><span role="img" aria-label="aboutme">📚</span></a> 
                    </span>

                    <span>
                        <a className="flink" rel="noopener noreferrer" target="_blank" href="https://github.com/sanskarseth/ShoppeR/issues/new"><u>Report a Bug</u><span role="img" aria-label="bug">🐛</span></a> 
                    </span>
                            
                </div>  


                <hr className="rule-bottom"/>

                <div className="row fcaption">
                    <span>
                       
                    Made with{" "}
                    <span style={{ color: "#FF0000" }}>
                        ❤{" "}
                    </span>
                    by{" "}
                    <a className="flink" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        href="https://github.com/sanskarseth"
                    >
                    Sanskar 
                    </a>{" "}
                    ©️ 2020.
                    </span>
                </div>

            </div>
        );
    }
}

export default Footer;
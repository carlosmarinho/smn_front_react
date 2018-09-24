import React, { Component } from 'react';

import RightColumn from '../right-column';

class FooterWidget extends Component {

    render(){
        return (
            <div className="col-sm-4 col-md-3">
                <h4>{this.props.title}</h4>
                <div className="footer-widget">
                    <ul >
                        <li>
                            <a href="listing-details.html">
                                <div className="div-footer-img"> 
                                    <img src="/images/services/s1.jpeg" alt="" /> 
                                </div>
                                <div className="div-footer-text">
                                    <h5>Property Getaways</h5> <span>City: illunois, United States</span> 
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="listing-details.html">
                                <div className="div-footer-img" > 
                                    <img src="/images/services/s1.jpeg" alt="" /> 
                                </div>
                                <div className="div-footer-text">
                                    <h5>Property Getaways</h5> <span>City: illunois, United States</span> 
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="listing-details.html">
                                <div className="div-footer-img"> 
                                    <img src="/images/services/s1.jpeg" alt="" /> 
                                </div>
                                <div className="div-footer-text">
                                    <h5>Property Getaways</h5> <span>City: illunois, United States</span> 
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="listing-details.html">
                                <div className="div-footer-img"> 
                                    <img src="/images/services/s1.jpeg" alt="" /> 
                                </div>
                                <div className="div-footer-text">
                                    <h5>Property Getaways</h5> <span>City: illunois, United States</span> 
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default FooterWidget;
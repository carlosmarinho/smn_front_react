import React, { Component } from 'react';
import RightColumn from '../right-column';
import HeaderListing from '../header-destaque-listing';

import ListingLeftColumn from '../listing-left-column';

class ListingGrid extends Component {
    render(){
        let leftColumn = true;
        return(
            <div>
                
                <HeaderListing />
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <div className="row">
                            <div className="dir-alp-tit">
                                <h1>Listing Grid View</h1>
                                <ol className="breadcrumb">
                                    <li><a href="#">Home</a> </li>
                                    <li><a href="#">Listing</a> </li>
                                    <li className="active">Grid View</li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="dir-alp-con">
                                {(leftColumn)?<ListingLeftColumn />:''}
                                <div className={(leftColumn)?'col-md-9 dir-alp-con-right list-grid-rig-pad':'col-md-12 dir-alp-con-right list-grid-rig-pad'}>
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            <div className="row span-none">
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/1.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Holiday Inn Express</h5>
                                                                <h6>0.0 km - 1.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/3.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$380</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                                                <h5>Staybridger Suites</h5>
                                                                <h6>2.0 km - 4.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/2.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>InterContinental</h5>
                                                                <h6>5.0 km - 8.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/4.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Starboard Red Wines</h5>
                                                                <h6>8.0 km - 10.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/5.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$380</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                                                <h5>Pet Shops</h5>
                                                                <h6>6.0 km - 8.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/6.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Philly Honeymoon Packages</h5>
                                                                <h6>12.0 km - 14.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/7.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Shake Fashions</h5>
                                                                <h6>15.0 km - 18.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/8.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Sparrow Chicken</h5>
                                                                <h6>18.0 km - 20.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/9.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Big Jack T-stall</h5>
                                                                <h6>20.0 km - 25.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/10.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Continental Shopiing Street</h5>
                                                                <h6>25.0 km - 30.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/11.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Flow Flower Shop</h5>
                                                                <h6>30.0 km - 35.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/12.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Maths Tuitions Centre</h5>
                                                                <h6>40.0 km - 45.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/13.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Indian Grill Chicken</h5>
                                                                <h6>45.0 km - 50.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/14.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Suprime Car ShowRoom</h5>
                                                                <h6>50.0 km - 55.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/15.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Joney Supermarket</h5>
                                                                <h6>55.0 km - 60.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/1.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Holiday Inn Express</h5>
                                                                <h6>0.0 km - 1.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/3.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$380</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                                                <h5>Staybridger Suites</h5>
                                                                <h6>2.0 km - 4.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/2.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>InterContinental</h5>
                                                                <h6>5.0 km - 8.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/4.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Starboard Red Wines</h5>
                                                                <h6>8.0 km - 10.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/5.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$380</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                                                <h5>Pet Shops</h5>
                                                                <h6>6.0 km - 8.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/6.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Philly Honeymoon Packages</h5>
                                                                <h6>12.0 km - 14.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/7.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Shake Fashions</h5>
                                                                <h6>15.0 km - 18.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/8.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Sparrow Chicken</h5>
                                                                <h6>18.0 km - 20.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/9.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Big Jack T-stall</h5>
                                                                <h6>20.0 km - 25.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/10.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Continental Shopiing Street</h5>
                                                                <h6>25.0 km - 30.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/11.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Flow Flower Shop</h5>
                                                                <h6>30.0 km - 35.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/12.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Maths Tuitions Centre</h5>
                                                                <h6>40.0 km - 45.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/13.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Indian Grill Chicken</h5>
                                                                <h6>45.0 km - 50.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/14.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Suprime Car ShowRoom</h5>
                                                                <h6>50.0 km - 55.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="col-md-4">
                                                    <a href="listing-details.html">
                                                        <div className="list-mig-like-com com-mar-bot-30">
                                                            <div className="list-mig-lc-img"> <img src="images/listing/15.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$420</span> </div>
                                                            <div className="list-mig-lc-con">
                                                                <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                                <h5>Joney Supermarket</h5>
                                                                <h6>55.0 km - 60.0km</h6>
                                                                <p>Illinois City,</p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="row">
                                                    <ul className="pagination list-pagenat">
                                                        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a> </li>
                                                        <li className="active"><a href="#!">1</a> </li>
                                                        <li className="waves-effect"><a href="#!">2</a> </li>
                                                        <li className="waves-effect"><a href="#!">3</a> </li>
                                                        <li className="waves-effect"><a href="#!">4</a> </li>
                                                        <li className="waves-effect"><a href="#!">5</a> </li>
                                                        <li className="waves-effect"><a href="#!">6</a> </li>
                                                        <li className="waves-effect"><a href="#!">7</a> </li>
                                                        <li className="waves-effect"><a href="#!">8</a> </li>
                                                        <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--MOBILE APP-->*/}
                <section className="web-app com-padd">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 web-app-img"> <img src="images/mobile.png" alt="" /> </div>
                            <div className="col-md-6 web-app-con">
                                <h2>Looking for the Best Service Provider? <span>Get the App!</span></h2>
                                <ul>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Find nearby listings</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Easy service enquiry</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Listing reviews and ratings</li>
                                    <li><i className="fa fa-check" aria-hidden="true"></i> Manage your listing, enquiry and reviews</li>
                                </ul> <span>We'll send you a link, open it on your phone to download the app</span>
                                <form>
                                    <ul>
                                        <li>
                                            <input type="text" placeholder="+01" /> </li>
                                        <li>
                                            <input type="number" placeholder="Enter mobile number" /> </li>
                                        <li>
                                            <input type="submit" value="Get App Link" /> </li>
                                    </ul>
                                </form>
                                <a href="#"><img src="images/android.png" alt="" /> </a>
                                <a href="#"><img src="images/apple.png" alt="" /> </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ListingGrid;
import React, { Component } from 'react';

class FeaturedListingThreeColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }


    render(){
        return(
            
            <section className={`com-padd ${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                <div className="container dir-hom-pre-tit">
                    <div className="com-title">
                        <h2>Guia da Cidade de Niterói</h2>
                        <p>Lojas, serviços ou empresas que se destacam em seu ramo na cidade de Niterói.</p>
                    </div>
                    <div className="row span-none">
                        <div className="col-md-4">
                            <a href="#!">
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
                            <a href="#!">
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
                            <a href="#!">
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
                            <a href="#!">
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
                            <a href="#!">
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
                            <a href="#!">
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
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedListingThreeColumns;
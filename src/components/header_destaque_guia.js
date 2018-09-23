import React, { Component } from 'react';

class HeaderDestaqueHome extends Component {
    render(){
        return(
            <div>
                <section>
                    <div className="v3-list-ql">
                        <div className="container">
                            <div className="row">
                                <div className="v3-list-ql-inn">
                                    <ul>
                                        <li className="active"><a href="#ld-abour"><i className="fa fa-user"></i> About</a>
                                        </li>
                                        <li><a href="#ld-ser"><i className="fa fa-cog"></i> Services</a>
                                        </li>
                                        <li><a href="#ld-gal"><i className="fa fa-photo"></i> Gallery</a>
                                        </li>
                                        <li><a href="#ld-roo"><i className="fa fa-ticket"></i> Room Booking</a>
                                        </li>
                                        <li><a href="#ld-vie"><i className="fa fa-street-view"></i> 360 View</a>
                                        </li>
                                        <li><a href="#ld-rew"><i className="fa fa-edit"></i> Write Review</a>
                                        </li>
                                        <li><a href="#ld-rer"><i className="fa fa-star-half-o"></i> User Review</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*<!--LISTING DETAILS-->*/}
                <section className="pg-list-1">
                    <div className="container">
                        <div className="row">
                            <div className="pg-list-1-left"> <a href="#"><h3>Taj Luxury Hotel & Resorts</h3></a>
                                <div className="list-rat-ch"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                <h4>Express Avenue Mall, Los Angeles</h4>
                                <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, Los Angeles, USA.</p>
                                <div className="list-number pag-p1-phone">
                                    <ul>
                                        <li><i className="fa fa-phone" aria-hidden="true"></i> +01 1245 2541</li>
                                        <li><i className="fa fa-envelope" aria-hidden="true"></i> localdir@webdir.com</li>
                                        <li><i className="fa fa-user" aria-hidden="true"></i> johny depp</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="pg-list-1-right">
                                <div className="list-enqu-btn pg-list-1-right-p1">
                                    <ul>
                                        <li><a href="#ld-rew"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                        <li><a href="#"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                        <li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                        <li><a href="#" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
        )
    }
}

export default HeaderDestaqueHome;
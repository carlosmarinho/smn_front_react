import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return(
            <div>
                <footer id="colophon" className="site-footer clearfix">
                    <div id="quaternary" className="sidebar-container " role="complementary">
                        <div className="sidebar-inner">
                            <div className="widget-area clearfix">
                                <div id="azh_widget-2" className="widget widget_azh_widget">
                                    <div data-section="section">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-4 col-md-3 foot-logo"> <img src="/images/foot-logo.png" alt="logo" />
                                                    <p className="hasimg">Worlds's No. 1 Local Business Directory Website.</p>
                                                    <p className="hasimg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </p>
                                                </div>
                                                <div className="col-sm-4 col-md-3">
                                                    <h4>Support & Help</h4>
                                                    <ul className="two-columns">
                                                        <li> <a href="advertise.html">Advertise us</a> </li>
                                                        <li> <a href="about-us.html">About Us</a> </li>
                                                        <li> <a href="customer-reviews.html">Review</a> </li>
                                                        <li> <a href="how-it-work.html">How it works </a> </li>
                                                        <li> <a href="add-listing.html">Add Business</a> </li>
                                                        <li> <a href="#!">Register</a> </li>
                                                        <li> <a href="#!">Login</a> </li>
                                                        <li> <a href="#!">Quick Enquiry</a> </li>
                                                        <li> <a href="#!">Ratings </a> </li>
                                                        <li> <a href="trendings.html">Top Trends</a> </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-4 col-md-3">
                                                    <h4>Popular Services</h4>
                                                    <ul className="two-columns">
                                                        <li> <a href="#!">Hotels</a> </li>
                                                        <li> <a href="#!">Hospitals</a> </li>
                                                        <li> <a href="#!">Transportation</a> </li>
                                                        <li> <a href="#!">Real Estates </a> </li>
                                                        <li> <a href="#!">Automobiles</a> </li>
                                                        <li> <a href="#!">Resorts</a> </li>
                                                        <li> <a href="#!">Education</a> </li>
                                                        <li> <a href="#!">Sports Events</a> </li>
                                                        <li> <a href="#!">Web Services </a> </li>
                                                        <li> <a href="#!">Skin Care</a> </li>
                                                    </ul>
                                                </div>
                                                <div className="col-sm-4 col-md-3">
                                                    <h4>Cities Covered</h4>
                                                    <ul className="two-columns">
                                                        <li> <a href="#!">Atlanta</a> </li>
                                                        <li> <a href="#!">Austin</a> </li>
                                                        <li> <a href="#!">Baltimore</a> </li>
                                                        <li> <a href="#!">Boston </a> </li>
                                                        <li> <a href="#!">Chicago</a> </li>
                                                        <li> <a href="#!">Indianapolis</a> </li>
                                                        <li> <a href="#!">Las Vegas</a> </li>
                                                        <li> <a href="#!">Los Angeles</a> </li>
                                                        <li> <a href="#!">Louisville </a> </li>
                                                        <li> <a href="#!">Houston</a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div data-section="section" className="foot-sec2">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h4>Payment Options</h4>
                                                    <p className="hasimg"> <img src="/images/payment.png" alt="payment" /> </p>
                                                </div>
                                                <div className="col-sm-4">
                                                    <h4>Address</h4>
                                                    <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A. Landmark : Next To Airport</p>
                                                    <p> <span className="strong">Phone: </span> <span className="highlighted">+01 1245 2541</span> </p>
                                                </div>
                                                <div className="col-sm-5 foot-social">
                                                    <h4>Follow with us</h4>
                                                    <p>Join the thousands of other There are many variations of passages of Lorem Ipsum available</p>
                                                    <ul>
                                                        <li><a href="#!"><i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                        <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                        <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                        <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                        <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                        <li><a href="#!"><i className="fa fa-whatsapp" aria-hidden="true"></i></a> </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<!-- .widget-area -->*/}
                        </div>
                        {/*<!-- .sidebar-inner -->*/}
                    </div>
                </footer>
                {/*<!--COPY RIGHTS-->*/}
                <section className="copy">
                    <div className="container">
                        <p>copyrights © 2017 RN53Themes.net. &nbsp;&nbsp;All rights reserved. </p>
                    </div>
                </section>

                <section>

                    {/*<!-- GET QUOTES POPUP -->*/}
                    <div className="modal fade dir-pop-com" id="list-quo" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header dir-pop-head">
                                    <button type="button" className="close" data-dismiss="modal">×</button>
                                    <h4 className="modal-title">Get a Quotes</h4>
                                    {/*<!--<i className="fa fa-pencil dir-pop-head-icon" aria-hidden="true"></i>-->*/}
                                </div>
                                <div className="modal-body dir-pop-body">
                                    <form method="post" className="form-horizontal">
                                        {/*<!--LISTING INFORMATION-->*/}
                                        <div className="form-group has-feedback ak-field">
                                            <label className="col-md-4 control-label">Full Name *</label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" name="fname" placeholder="" required /> </div>
                                        </div>
                                        {/*<!--LISTING INFORMATION-->*/}
                                        <div className="form-group has-feedback ak-field">
                                            <label className="col-md-4 control-label">Mobile</label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" name="mobile" placeholder="" /> </div>
                                        </div>
                                        {/*<!--LISTING INFORMATION-->*/}
                                        <div className="form-group has-feedback ak-field">
                                            <label className="col-md-4 control-label">Email</label>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control" name="email" placeholder="" /> </div>
                                        </div>
                                        {/*<!--LISTING INFORMATION-->*/}
                                        <div className="form-group has-feedback ak-field">
                                            <label className="col-md-4 control-label">Message</label>
                                            <div className="col-md-8 get-quo">
                                                <textarea className="form-control"></textarea>
                                            </div>
                                        </div>
                                        {/*<!--LISTING INFORMATION-->*/}
                                        <div className="form-group has-feedback ak-field">
                                            <div className="col-md-6 col-md-offset-4">
                                                <input type="submit" value="SUBMIT" className="pop-btn" /> </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<!-- GET QUOTES Popup END -->*/}
                </section>

            </div>
        )
    }
}

export default Footer;
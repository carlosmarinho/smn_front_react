import React, { Component } from 'react';
import HeaderHome from './header-destaque-home';
import FeaturedTwoColumns from './modules/featured-two-columns';

class Content extends Component {
    render(){
        return(
            <div>
                <HeaderHome />
                <FeaturedTwoColumns />
                {/*<!--FIND YOUR SERVICE-->*/}
                <section className="cat-v2-hom com-padd mar-bot-red-m30">
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Find your <span>Services</span></h2>
                                <p>Explore some of the best business from around the world from our partners and friends.</p>
                            </div>
                            <div className="cat-v2-hom-list">
                                <ul>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat1.png" alt="" /> Hospitals</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat2.png" alt="" /> Hotel & Resort</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat3.png" alt="" /> Events</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat4.png" alt="" /> Wedding Halls</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat5.png" alt="" /> Shops</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat6.png" alt="" /> Fitness & Gym</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat7.png" alt="" /> Sports</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat8.png" alt="" /> Education</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat9.png" alt="" /> Electricals</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat10.png" alt="" /> Automobiles</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat11.png" alt="" /> Real Estates</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat12.png" alt="" /> Import & Export</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat13.png" alt="" /> Interior Design</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat14.png" alt="" /> Software Solutions</a>
                                    </li>
                                    <li>
                                        <a href="#"><img src="images/icon/hcat15.png" alt="" /> Yoga Training</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--EXPLORE CITY LISTING-->*/}
                <section className="com-padd com-padd-redu-top">
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Explore your <span>City Listings</span></h2>
                                <p>Explore some of the best business from around the world from our partners and friends.</p>
                            </div>
                            <div className="col-md-6">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src="images/listing/home.jpg" alt="" /> </div>
                                        <div className="list-mig-lc-con">
                                            <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                            <h5>United States</h5>
                                            <p>21 Cities . 2045 Listings . 3648 Users</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src="images/listing/home2.jpg" alt="" /> </div>
                                        <div className="list-mig-lc-con list-mig-lc-con2">
                                            <h5>United Kingdom</h5>
                                            <p>18 Cities . 1454 Listings</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src="images/listing/home3.jpg" alt="" /> </div>
                                        <div className="list-mig-lc-con list-mig-lc-con2">
                                            <h5>Australia</h5>
                                            <p>14 Cities . 1895 Listings</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src="images/listing/home4.jpg" alt="" /> </div>
                                        <div className="list-mig-lc-con list-mig-lc-con2">
                                            <h5>Germany</h5>
                                            <p>12 Cities . 1260 Listings</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-3">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src="images/listing/home1.jpg" alt="" /> </div>
                                        <div className="list-mig-lc-con list-mig-lc-con2">
                                            <h5>India</h5>
                                            <p>24 Cities . 4152 Listings</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--ADD BUSINESS-->*/}
                <section className="com-padd home-dis">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2><span>30% Off</span> Promote Your Business with us <a href="price.html">Add My Business</a></h2> </div>
                        </div>
                    </div>
                </section>
                {/*<!--BEST THINGS-->*/}
                <section className="com-padd com-padd-redu-bot1">
                    <div className="container dir-hom-pre-tit">
                        <div className="row">
                            <div className="com-title">
                                <h2>Top Trendings for <span>your City</span></h2>
                                <p>Explore some of the best tips from around the world from our partners and friends.</p>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    {/*<!--POPULAR LISTINGS-->*/}
                                    <div className="home-list-pop">
                                        {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                        <div className="col-md-3"> <img src="images/services/tr1.jpg" alt="" /> </div>
                                        {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                        <div className="col-md-9 home-list-pop-desc"> <a href="automobile-listing-details.html"><h3>Import Motor America</h3></a>
                                            <h4>Express Avenue Mall, Santa Monica</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--POPULAR LISTINGS-->*/}
                                    <div className="home-list-pop">
                                        {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                        <div className="col-md-3"> <img src="images/services/tr2.jpg" alt="" /> </div>
                                        {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                        <div className="col-md-9 home-list-pop-desc"> <a href="property-listing-details.html"><h3>Luxury Property</h3></a>
                                            <h4>Express Avenue Mall, New York</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--POPULAR LISTINGS-->*/}
                                    <div className="home-list-pop">
                                        {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                        <div className="col-md-3"> <img src="images/services/tr3.jpg" alt="" /> </div>
                                        {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                        <div className="col-md-9 home-list-pop-desc"> <a href="shop-listing-details.html"><h3>Spicy Supermarket Shop</h3></a>
                                            <h4>Express Avenue Mall, Chicago</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-list-pop">
                                        <div className="col-md-3"> <img src="images/services/s4.jpeg" alt="" /> </div>
                                        <div className="col-md-9 home-list-pop-desc"> <a href="list-lead.html"><h3>Packers and Movers</h3></a>
                                            <h4>Express Avenue Mall, Toronto</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <div className="home-list-pop">
                                        <div className="col-md-3"> <img src="images/services/s5.jpeg" alt="" /> </div>
                                        <div className="col-md-9 home-list-pop-desc"> <a href="list-lead.html"><h3>Tour and Travels</h3></a>
                                            <h4>Express Avenue Mall, Los Angeles</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-list-pop">
                                        <div className="col-md-3"> <img src="images/services/s6.jpeg" alt="" /> </div>
                                        <div className="col-md-9 home-list-pop-desc"> <a href="list-lead.html"><h3>Andru Modular Kitchen</h3></a>
                                            <h4>Express Avenue Mall, San Diego</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-list-pop">
                                        <div className="col-md-3"> <img src="images/services/s7.jpeg" alt="" /> </div>
                                        <div className="col-md-9 home-list-pop-desc"> <a href="list-lead.html"><h3>Rute Skin Care & Treatment</h3></a>
                                            <h4>Express Avenue Mall, Toronto</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home-list-pop mar-bot-red-0">
                                        <div className="col-md-3"> <img src="images/services/s8.jpg" alt="" /> </div>
                                        <div className="col-md-9 home-list-pop-desc"> <a href="list-lead.html"><h3>Health and Fitness</h3></a>
                                            <h4>Express Avenue Mall, San Diego</h4>
                                            <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span className="home-list-pop-rat">4.2</span>
                                            <div className="hom-list-share">
                                                <ul>
                                                    <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                    <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                    <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                    <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--CREATE FREE ACCOUNT-->*/}
                <section className="com-padd sec-bg-white com-padd-redu-top">
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Create a free <span>Account</span></h2>
                                <p>Explore some of the best tips from around the world from our partners and friends.</p>
                            </div>
                            <div className="col-md-6">
                                <div className="hom-cre-acc-left">
                                    <h3>A few reasons you’ll love Online <span>Business Directory</span></h3>
                                    <p>5 Benefits of Listing Your Business to a Local Online Directory</p>
                                    <ul>
                                        <li> <img src="images/icon/7.png" alt="" />
                                            <div>
                                                <h5>Enhancing Your Business</h5>
                                                <p>Imagine you have made your presence online through a local online directory, but your competitors have..</p>
                                            </div>
                                        </li>
                                        <li> <img src="images/icon/5.png" alt="" />
                                            <div>
                                                <h5>Advertising Your Business</h5>
                                                <p>Advertising your business to area specific has many advantages. For local businessmen, it is an opportunity..</p>
                                            </div>
                                        </li>
                                        <li> <img src="images/icon/6.png" alt="" />
                                            <div>
                                                <h5>Develop Brand Image</h5>
                                                <p>Your local business too needs brand management and image making. As you know the local market..</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="hom-cre-acc-left hom-cre-acc-right">
                                    <form>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="acc-name" type="text" className="validate" />
                                                <label htmlFor="acc-name">Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="acc-mob" type="number" className="validate" />
                                                <label htmlFor="acc-mob">Mobile</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="acc-mail" type="email" className="validate" />
                                                <label htmlFor="acc-mail">Email</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input id="acc-pass" type="password" className="validate" />
                                                <label htmlFor="acc-pass">Password</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12 hom-cr-acc-check">
                                                <input type="checkbox" id="test5" />
                                                <label htmlFor="test5">By signing up, you agree to the Terms and Conditions and Privacy Policy. You also agree to receive product-related emails.</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12"> <a className="waves-effect waves-light btn-large full-btn" href="#!">Submit Now</a> </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--MOBILE APP-->*/}
                <section className="web-app com-padd com-padd-redu-top">
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

export default Content;
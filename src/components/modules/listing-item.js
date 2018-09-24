import React, { Component } from 'react';
import RightColumn from '../right-column';
import HeaderGuia from '../header-destaque-guia';

class ListingItem extends Component {
    render(){
        return(
            <div>
                
                <HeaderGuia />

                <section className="list-pg-bg">
                    <div className="container">
                        <div className="row">
                            <div className="com-padd">
                                <div className="list-pg-lt list-page-com-p">
                                    {/*<!--LISTING DETAILS: LEFT PART 1-->*/}
                                    <div className="pglist-p1 pglist-bg pglist-p-com" id="ld-abour">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>About</span> Taj Luxury</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <div className="share-btn">
                                                <ul>
                                                    <li><a href="#"><i className="fa fa-facebook fb1"></i> Share On Facebook</a> </li>
                                                    <li><a href="#"><i className="fa fa-twitter tw1"></i> Share On Twitter</a> </li>
                                                    <li><a href="#"><i className="fa fa-google-plus gp1"></i> Share On Google Plus</a> </li>
                                                </ul>
                                            </div>
                                            <p>Taj Luxury Hotels & Resorts presents award winning luxury hotels and resorts in India, Indonesia, Mauritius, Egypt and Saudi Arabia.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution </p>
                                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
                                        </div>
                                    </div>
                                    {/*<!--END LISTING DETAILS: LEFT PART 1-->*/}
                                    {/*<!--LISTING DETAILS: LEFT PART 2-->*/}
                                    <div className="pglist-p2 pglist-bg pglist-p-com" id="ld-ser">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>Services</span> Offered</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <p>Taj Luxury Hotels & Resorts provide 24-hour Business Centre, Clinic, Internet Access Centre, Babysitting, Butler Service in Villas and Seaview Suite, House Doctor on Call, Airport Butler Service, Lobby Lounge </p>
                                            <div className="row pg-list-ser">
                                                <ul>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser1.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>Restaurant and Bar</h4> </div>
                                                    </li>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser2.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>Room Booking</h4> </div>
                                                    </li>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser3.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>Corporate Events</h4> </div>
                                                    </li>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser4.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>Wedding Hall</h4> </div>
                                                    </li>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser5.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>Travel & Transport</h4> </div>
                                                    </li>
                                                    <li className="col-md-4">
                                                        <div className="pg-list-ser-p1"><img src="images/services/ser6.jpg" alt="" /> </div>
                                                        <div className="pg-list-ser-p2">
                                                            <h4>All Amenities</h4> </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--END LISTING DETAILS: LEFT PART 2-->*/}
                                    {/*<!--LISTING DETAILS: LEFT PART 3-->*/}
                                    <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-gal">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>Photo</span> Gallery</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <div id="myCarousel" className="carousel slide" data-ride="carousel">
                                                {/*<!-- Indicators -->*/}
                                                <ol className="carousel-indicators">
                                                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                                                    <li data-target="#myCarousel" data-slide-to="1"></li>
                                                    <li data-target="#myCarousel" data-slide-to="2"></li>
                                                    <li data-target="#myCarousel" data-slide-to="3"></li>
                                                </ol>
                                                {/*<!-- Wrapper for slides -->*/}
                                                <div className="carousel-inner">
                                                    <div className="item active"> <img src="images/slider/1.jpg" alt="Los Angeles" /> </div>
                                                    <div className="item"> <img src="images/slider/2.jpg" alt="Chicago" /> </div>
                                                    <div className="item"> <img src="images/slider/3.jpg" alt="New York" /> </div>
                                                    <div className="item"> <img src="images/slider/4.jpg" alt="New York" /> </div>
                                                </div>
                                                {/*<!-- Left and right controls -->*/}
                                                <a className="left carousel-control" href="#myCarousel" data-slide="prev"> <i className="fa fa-angle-left list-slider-nav" aria-hidden="true"></i> </a>
                                                <a className="right carousel-control" href="#myCarousel" data-slide="next"> <i className="fa fa-angle-right list-slider-nav list-slider-nav-rp" aria-hidden="true"></i> </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--END LISTING DETAILS: LEFT PART 3-->*/}
                                    {/*<!--LISTING DETAILS: LEFT PART 4-->*/}
                                    <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-roo">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>Room</span> Booking</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <div className="home-list-pop list-spac list-spac-1 list-room-mar-o">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3"> <img src="images/room/1.jpg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc list-room-deta"> <a href="#!"><h3>Ultra Deluxe Rooms</h3></a>
                                                    <div className="list-rat-ch list-room-rati"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </div>
                                                    <div className="list-room-type list-rom-ami">
                                                        <ul>
                                                            <li>
                                                                <p><b>Amenities:</b> </p>
                                                            </li>
                                                            <li><img src="images/icon/a7.png" alt="" /> Wi-Fi</li>
                                                            <li><img src="images/icon/a4.png" alt="" /> Air Conditioner </li>
                                                            <li><img src="images/icon/a3.png" alt="" /> Swimming Pool</li>
                                                            <li><img src="images/icon/a2.png" alt="" /> Bar</li>
                                                            <li><img src="images/icon/a5.png" alt="" /> Bathroom</li>
                                                            <li><img src="images/icon/a6.png" alt="" /> TV</li>
                                                            <li><img src="images/icon/a9.png" alt="" /> Spa</li>
                                                            <li><img src="images/icon/a10.png" alt="" /> Music</li>
                                                            <li><img src="images/icon/a11.png" alt="" /> Parking</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat list-rom-pric">$940</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Book Now</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="home-list-pop list-spac list-spac-1 list-room-mar-o">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3"> <img src="images/room/2.jpg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc list-room-deta"> <a href="#!"><h3>Premium Rooms(Executive)</h3></a>
                                                    <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                    <div className="list-room-type list-rom-ami">
                                                        <ul>
                                                            <li>
                                                                <p><b>Amenities:</b> </p>
                                                            </li>
                                                            <li><img src="images/icon/a7.png" alt="" /> Wi-Fi</li>
                                                            <li><img src="images/icon/a4.png" alt="" /> Air Conditioner </li>
                                                            <li><img src="images/icon/a3.png" alt="" /> Swimming Pool</li>
                                                            <li><img src="images/icon/a2.png" alt="" /> Bar</li>
                                                            <li><img src="images/icon/a5.png" alt="" /> Bathroom</li>
                                                            <li><img src="images/icon/a6.png" alt="" /> TV</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat list-rom-pric">$620</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Book Now</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="home-list-pop list-spac list-spac-1 list-room-mar-o">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3"> <img src="images/room/3.jpg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc list-room-deta"> <a href="#!"><h3>Normal Rooms(Executive)</h3></a>
                                                    <div className="list-rat-ch list-room-rati"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                                    <div className="list-room-type list-rom-ami">
                                                        <ul>
                                                            <li>
                                                                <p><b>Amenities:</b> </p>
                                                            </li>
                                                            <li><img src="images/icon/a7.png" alt="" /> Wi-Fi</li>
                                                            <li><img src="images/icon/a4.png" alt="" /> Air Conditioner </li>
                                                            <li><img src="images/icon/a3.png" alt="" /> Swimming Pool</li>
                                                            <li><img src="images/icon/a2.png" alt="" /> Bar</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat list-rom-pric">$420</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!"><i className="fa fa-usd" aria-hidden="true"></i> Book Now</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--END 360 DEGREE MAP: LEFT PART 8-->*/}
                                    <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-vie">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>360 </span> Degree View</h3> </div>
                                        <div className="list-pg-inn-sp list-360">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m0!4v1497026654798!6m8!1m7!1sIId_fF3cldIAAAQ7LuSTng!2m2!1d5.553927350344909!2d-0.2005543181775732!3f189.99!4f0!5f0.7820865974627469" allowfullscreen></iframe>
                                        </div>
                                    </div>
                                    {/*<!--END 360 DEGREE MAP: LEFT PART 8-->*/}
                                    {/*<!--LISTING DETAILS: LEFT PART 6-->*/}
                                    <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-rew">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>Write Your</span> Reviews</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <div className="list-pg-write-rev">
                                                <form className="col">
                                                    <p>Writing great reviews may help others discover the places that are just apt for them. Here are a few tips to write a good review:</p>
                                                    <div className="row">
                                                        <div className="col s12">
                                                            <fieldset className="rating">
                                                                <input type="radio" id="star5" name="rating" value="5" />
                                                                <label className="full" for="star5" title="Awesome - 5 stars"></label>
                                                                <input type="radio" id="star4half" name="rating" value="4 and a half" />
                                                                <label className="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                                                <input type="radio" id="star4" name="rating" value="4" />
                                                                <label className="full" for="star4" title="Pretty good - 4 stars"></label>
                                                                <input type="radio" id="star3half" name="rating" value="3 and a half" />
                                                                <label className="half" for="star3half" title="Meh - 3.5 stars"></label>
                                                                <input type="radio" id="star3" name="rating" value="3" />
                                                                <label className="full" for="star3" title="Meh - 3 stars"></label>
                                                                <input type="radio" id="star2half" name="rating" value="2 and a half" />
                                                                <label className="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                                                <input type="radio" id="star2" name="rating" value="2" />
                                                                <label className="full" for="star2" title="Kinda bad - 2 stars"></label>
                                                                <input type="radio" id="star1half" name="rating" value="1 and a half" />
                                                                <label className="half" for="star1half" title="Meh - 1.5 stars"></label>
                                                                <input type="radio" id="star1" name="rating" value="1" />
                                                                <label className="full" for="star1" title="Sucks big time - 1 star"></label>
                                                                <input type="radio" id="starhalf" name="rating" value="half" />
                                                                <label className="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input id="re_name" type="text" className="validate" />
                                                            <label for="re_name">Full Name</label>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input id="re_mob" type="number" className="validate" />
                                                            <label for="re_mob">Mobile</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s6">
                                                            <input id="re_mail" type="email" className="validate" />
                                                            <label for="re_mail">Email id</label>
                                                        </div>
                                                        <div className="input-field col s6">
                                                            <input id="re_city" type="text" className="validate" />
                                                            <label for="re_city">City</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <textarea id="re_msg" className="materialize-textarea"></textarea>
                                                            <label for="re_msg">Write review</label>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="input-field col s12"> <a className="waves-effect waves-light btn-large full-btn" href="#!">Submit Review</a> </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--END LISTING DETAILS: LEFT PART 6-->*/}
                                    {/*<!--LISTING DETAILS: LEFT PART 5-->*/}
                                    <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-rer">
                                        <div className="pglist-p-com-ti">
                                            <h3><span>User</span> Reviews</h3> </div>
                                        <div className="list-pg-inn-sp">
                                            <div className="lp-ur-all">
                                                <div className="lp-ur-all-left">
                                                    <div className="lp-ur-all-left-1">
                                                        <div className="lp-ur-all-left-11">Excellent</div>
                                                        <div className="lp-ur-all-left-12">
                                                            <div className="lp-ur-all-left-13"></div>
                                                        </div>
                                                    </div>
                                                    <div className="lp-ur-all-left-1">
                                                        <div className="lp-ur-all-left-11">Good</div>
                                                        <div className="lp-ur-all-left-12">
                                                            <div className="lp-ur-all-left-13 lp-ur-all-left-Good"></div>
                                                        </div>
                                                    </div>
                                                    <div className="lp-ur-all-left-1">
                                                        <div className="lp-ur-all-left-11">Satisfactory</div>
                                                        <div className="lp-ur-all-left-12">
                                                            <div className="lp-ur-all-left-13 lp-ur-all-left-satis"></div>
                                                        </div>
                                                    </div>
                                                    <div className="lp-ur-all-left-1">
                                                        <div className="lp-ur-all-left-11">Below Average</div>
                                                        <div className="lp-ur-all-left-12">
                                                            <div className="lp-ur-all-left-13 lp-ur-all-left-below"></div>
                                                        </div>
                                                    </div>
                                                    <div className="lp-ur-all-left-1">
                                                        <div className="lp-ur-all-left-11">Below Average</div>
                                                        <div className="lp-ur-all-left-12">
                                                            <div className="lp-ur-all-left-13 lp-ur-all-left-poor"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="lp-ur-all-right">
                                                    <h5>Overall Ratings</h5>
                                                    <p><span>4.5 <i className="fa fa-star" aria-hidden="true"></i></span> based on 242 reviews</p>
                                                </div>
                                            </div>
                                            <div className="lp-ur-all-rat">
                                                <h5>Reviews</h5>
                                                <ul>
                                                    <li>
                                                        <div className="lr-user-wr-img"> <img src="images/users/2.png" alt="" /> </div>
                                                        <div className="lr-user-wr-con">
                                                            <h6>Jacob Michael <span>4.5 <i className="fa fa-star" aria-hidden="true"></i></span></h6> <span className="lr-revi-date">19th January, 2017</span>
                                                            <p>Good service... nice and clean rooms... very good spread of buffet and friendly staffs. Located in heart of city and easy to reach any places in a short distance. </p>
                                                            <ul>
                                                                <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="lr-user-wr-img"> <img src="images/users/3.png" alt="" /> </div>
                                                        <div className="lr-user-wr-con">
                                                            <h6>Gabriel Elijah <span>5.0 <i className="fa fa-star" aria-hidden="true"></i></span></h6> <span className="lr-revi-date">21th July, 2016</span>
                                                            <p>The hotel is clean, convenient and good value for money. Staff are courteous and helpful. However, they need more training to be efficient.</p>
                                                            <ul>
                                                                <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="lr-user-wr-img"> <img src="images/users/4.png" alt="" /> </div>
                                                        <div className="lr-user-wr-con">
                                                            <h6>Luke Mason <span>4.2 <i className="fa fa-star" aria-hidden="true"></i></span></h6> <span className="lr-revi-date">21th March, 2018</span>
                                                            <p>Too much good experience with hospitality, cleanliness, facility and privacy and good value for money... To keep mind relaxing... Keep it up... </p>
                                                            <ul>
                                                                <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="lr-user-wr-img"> <img src="images/users/5.png" alt="" /> </div>
                                                        <div className="lr-user-wr-con">
                                                            <h6>Kevin Jack <span>3.6 <i className="fa fa-star" aria-hidden="true"></i></span></h6> <span className="lr-revi-date">21th Aug, 2018</span>
                                                            <p>I am deaf. Bar is closed and Restaurant is okay ... It should be more decoration as beautiful. I enjoyed swimming top floor and weather is good</p>
                                                            <ul>
                                                                <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="lr-user-wr-img"> <img src="images/users/6.png" alt="" /> </div>
                                                        <div className="lr-user-wr-con">
                                                            <h6>Nicholas Tyler <span>4.4 <i className="fa fa-star" aria-hidden="true"></i></span></h6> <span className="lr-revi-date">21th Aug, 2018</span>
                                                            <p>Overall, it was good experience. Rooms were spacious and they were kept very clean and tidy. Room service was good.</p>
                                                            <ul>
                                                                <li><a href="#!"><span>Like</span><i className="fa fa-thumbs-o-up" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Dis-Like</span><i className="fa fa-thumbs-o-down" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Report</span> <i className="fa fa-flag-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Comments</span> <i className="fa fa-commenting-o" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><span>Share Now</span>  <i className="fa fa-facebook" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-google-plus" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-twitter" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-linkedin" aria-hidden="true"></i></a> </li>
                                                                <li><a href="#!"><i className="fa fa-youtube" aria-hidden="true"></i></a> </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<!--END LISTING DETAILS: LEFT PART 5-->*/}
                                </div>
                                


                                {/*RIGH COLUMN*/}
                                <RightColumn />



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

export default ListingItem;
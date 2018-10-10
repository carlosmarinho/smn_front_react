import React, { Component } from 'react';
import RightColumn from '../right-column';
import HeaderGuia from '../header-destaque-guia';

class NewsItem extends Component {
    render(){
        return(
            <div>
                
                <HeaderGuia />

                <section class="p-about com-padd">
                    <div class="container">
                        <div class="row blog-single con-com-mar-bot-o">
                            <div class="col-md-4">
                                <div class="blog-img"> <img src="images/services/20.jpeg" alt="" /> </div>
                            </div>
                            <div class="col-md-8">
                                <div class="page-blog">
                                    <h3>Top Export Products</h3> <span>November 10, 2017</span>
                                    <div class="share-btn share-pad-bot">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-facebook fb1"></i> Share On Facebook</a> </li>
                                            <li><a href="#"><i class="fa fa-twitter tw1"></i> Share On Twitter</a> </li>
                                            <li><a href="#"><i class="fa fa-google-plus gp1"></i> Share On Google Plus</a> </li>
                                        </ul>
                                    </div>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                                    <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                                    <div class="pglist-p3 pglist-bg pglist-p-com">
                                        <div class="pglist-p-com-ti blog-comment">
                                            <h3><span>Write Your</span> Comments</h3> </div>
                                        <div class="list-pg-inn-sp">
                                            <div class="list-pg-write-rev">
                                                <form class="col">
                                                    <p>Writing great reviews may help others discover the places that are just apt for them. Here are a few tips to write a good review:</p>
                                                    <div class="row">
                                                        <div class="col s12">
                                                            <fieldset class="rating">
                                                                <input type="radio" id="star5" name="rating" value="5" />
                                                                <label class="full" for="star5" title="Awesome - 5 stars"></label>
                                                                <input type="radio" id="star4half" name="rating" value="4 and a half" />
                                                                <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                                                                <input type="radio" id="star4" name="rating" value="4" />
                                                                <label class="full" for="star4" title="Pretty good - 4 stars"></label>
                                                                <input type="radio" id="star3half" name="rating" value="3 and a half" />
                                                                <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                                                                <input type="radio" id="star3" name="rating" value="3" />
                                                                <label class="full" for="star3" title="Meh - 3 stars"></label>
                                                                <input type="radio" id="star2half" name="rating" value="2 and a half" />
                                                                <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                                                                <input type="radio" id="star2" name="rating" value="2" />
                                                                <label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                                                                <input type="radio" id="star1half" name="rating" value="1 and a half" />
                                                                <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                                                                <input type="radio" id="star1" name="rating" value="1" />
                                                                <label class="full" for="star1" title="Sucks big time - 1 star"></label>
                                                                <input type="radio" id="starhalf" name="rating" value="half" />
                                                                <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                                                            </fieldset>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s6">
                                                            <input id="re_name" type="text" class="validate" />
                                                            <label for="re_name">Full Name</label>
                                                        </div>
                                                        <div class="input-field col s6">
                                                            <input id="re_mob" type="number" class="validate" />
                                                            <label for="re_mob">Mobile</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s6">
                                                            <input id="re_mail" type="email" class="validate" />
                                                            <label for="re_mail">Email id</label>
                                                        </div>
                                                        <div class="input-field col s6">
                                                            <input id="re_city" type="text" class="validate" />
                                                            <label for="re_city">City</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s12">
                                                            <textarea id="re_msg" class="materialize-textarea"></textarea>
                                                            <label for="re_msg">Write review</label>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="input-field col s12"> <a class="waves-effect waves-light btn-large full-btn" href="#!">Submit Review</a> </div>
                                                    </div>
                                                </form>
                                            </div>
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

export default NewsItem;
import React, { Component } from 'react';
import HeaderBlog from '../header-destaque-blog';

import RightColumn from '../right-column';

class BlogList extends Component {

    render(){
        let columnRight = true;

        if(columnRight) {
            return(
                <div>{this.contentWithColumnRight()}</div>
            )
        }
        else {
            return(
                <div>
                    <HeaderBlog />
                    <section className="p-about com-padd">
                        <div className="container">
                            <div className="row blog-single">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/20.jpeg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>Top 10 best resorts in london, england</h3> <span>November 10, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                            <div className="row blog-single">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/7.jpg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>Building & Construction Service Providers</h3> <span>May 21, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                            <div className="row blog-single">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/9.jpg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>Top export products from Canada</h3> <span>April 18, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                            <div className="row blog-single">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/10.jpeg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>Grand opening operation research center</h3> <span>November 10, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                            <div className="row blog-single">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/15.jpg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>How to make healthy veg salad at home</h3> <span>February 10, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                            <div className="row blog-single con-com-mar-bot-o">
                                <div className="col-md-4">
                                    <div className="blog-img"> <img src="images/services/11.jpg" alt="" /> </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="page-blog">
                                        <h3>Fast construction techniques</h3> <span>March 08, 2017</span>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                </div>
                            </div>
                        
                        {/*<!--MOBILE APP--> */}
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
                    </section>
                    
                </div>
            )
        }
    }

    contentWithColumnRight(){
        return(
            <div>
                <HeaderBlog />
                <section className="p-about com-padd">
                    <div className="container">

                        <div className="row">
                            <div >
                                <div className="list-pg-lt list-page-com-p">

                                    <div className="row blog-single">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/20.jpeg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>Top 10 best resorts in london, england</h3> <span>November 10, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                    <div className="row blog-single">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/7.jpg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>Building & Construction Service Providers</h3> <span>May 21, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                    <div className="row blog-single">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/9.jpg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>Top export products from Canada</h3> <span>April 18, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                    <div className="row blog-single">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/10.jpeg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>Grand opening operation research center</h3> <span>November 10, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                    <div className="row blog-single">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/15.jpg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>How to make healthy veg salad at home</h3> <span>February 10, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                    <div className="row blog-single con-com-mar-bot-o">
                                        <div className="col-md-4">
                                            <div className="blog-img"> <img src="images/services/11.jpg" alt="" /> </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="page-blog">
                                                <h3>Fast construction techniques</h3> <span>March 08, 2017</span>
                                                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p> <a className="waves-effect waves-light btn-large full-btn" href="blog-content.html">Read More</a> </div>
                                        </div>
                                    </div>
                                
                                {/*<!--MOBILE APP--> */}
                                    <section className="web-app com-padd">
                                        <div >
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
                                    <RightColumn />
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }
}

export default BlogList;
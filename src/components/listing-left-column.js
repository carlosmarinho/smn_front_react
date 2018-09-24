import React, { Component } from 'react';


class ListingLeftColumn extends Component {
    render(){
        return(
            <div className="col-md-3 dir-alp-con-left">
                <div className="dir-alp-con-left-1">
                    <h3>Nearby Listings(07)</h3> </div>
                <div className="dir-hom-pre dir-alp-left-ner-notb">
                    <ul>
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s1.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Property Getaways</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>5.0</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s2.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Home Trends</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>4.0</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s3.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Security System</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>4.4</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s4.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Distance Educations</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>3.8</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s5.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Fresh Cake Shops</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>4.8</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s6.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Chicago Automobiles</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>5.0</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                        {/*<!--==========NEARBY LISTINGS============-->*/}
                        <li>
                            <a href="listing-details.html">
                                <div className="list-left-near lln1"> <img src="/images/services/s7.jpeg" alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>Bike Service Centers</h5> <span>City: illunois, United States</span> </div>
                                <div className="list-left-near lln3"> <span>5.0</span> </div>
                            </a>
                        </li>
                        {/*<!--==========END NEARBY LISTINGS============-->*/}
                    </ul>
                </div>
                {/*<!--==========Sub Category Filter============-->*/}
                <div className="dir-alp-l3 dir-alp-l-com">
                    <h4>Sub Category Filter</h4>
                    <div className="dir-alp-l-com1 dir-alp-p3">
                        <form action="#">
                            <ul>
                                <li>
                                    <input type="checkbox" id="scf1" />
                                    <label htmlFor="scf1">Hortels & Resorts</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="scf2" />
                                    <label htmlFor="scf2">Fitness Care</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="scf3" />
                                    <label htmlFor="scf3">Educations</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="scf4" />
                                    <label htmlFor="scf4">Property</label>
                                </li>
                                <li>
                                    <input type="checkbox" id="scf5" />
                                    <label htmlFor="scf5">Home Services</label>
                                </li>
                            </ul>
                        </form> <a href="#!" className="list-view-more-btn">view more</a> </div>
                </div>
                {/*<!--==========End Sub Category Filter============-->*/}
                {/*<!--==========Sub Category Filter============-->*/}
                <div className="dir-alp-l3 dir-alp-l-com">
                    <h4>Distance</h4>
                    <div className="dir-alp-l-com1 dir-alp-p3">
                        <form>
                            <ul>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis1" />
                                    <label htmlFor="ldis1">00 to 02km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis2" />
                                    <label htmlFor="ldis2">02 to 05km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis3" />
                                    <label htmlFor="ldis3">05 to 10km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis4" />
                                    <label htmlFor="ldis4">10 to 20km</label>
                                </li>
                                <li>
                                    <input className="with-gap" name="group1" type="radio" id="ldis5" />
                                    <label htmlFor="ldis5">20 to 30km</label>
                                </li>
                            </ul>
                        </form> <a href="#!" className="list-view-more-btn">view more</a> </div>
                </div>
                {/*<!--==========End Sub Category Filter============-->*/}
                {/*<!--==========Sub Category Filter============-->*/}
                <div className="dir-alp-l3 dir-alp-l-com">
                    <h4>Ratings</h4>
                    <div className="dir-alp-l-com1 dir-alp-p3">
                        <form>
                            <ul>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr1" />
                                    <label htmlFor="lr1"> <span className="list-rat-ch"> <span>5.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr2" />
                                    <label htmlFor="lr2"> <span className="list-rat-ch"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr3" />
                                    <label htmlFor="lr3"> <span className="list-rat-ch"> <span>3.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr4" />
                                    <label htmlFor="lr4"> <span className="list-rat-ch"> <span>2.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                                <li>
                                    <input type="checkbox" className="filled-in" id="lr5" />
                                    <label htmlFor="lr5"> <span className="list-rat-ch"> <span>1.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </span>
                                    </label>
                                </li>
                            </ul>
                        </form> <a href="javascript:void(0);" className="list-view-more-btn">view more</a> </div>
                </div>
                {/*<!--==========End Sub Category Filter============-->*/}
            </div>
            
        )
    }
}

export default ListingLeftColumn;
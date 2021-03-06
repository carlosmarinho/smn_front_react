import React, { Component } from 'react';
import RightColumn from '../right-column';
import HeaderListing from '../header-destaque-listing';

import ListingLeftColumn from '../listing-left-column';

class ListingList extends Component {
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
                                

                                <div className={(leftColumn)? 'col-md-9 dir-alp-con-right': 'col-md-12 dir-alp-con-right'}>
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s10.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Property Luxury Homes</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s1.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Effi Furniture Dealers</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s2.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>NIID Job Training</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s3.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Computer Repair & Services</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s4.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Packers and Movers</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s5.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Tour and Travels</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s6.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Andru Modular Kitchen</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s7.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Rute Skin Care & Treatment</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s6.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Health and Fitness</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s10.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Property Luxury Homes</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s1.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Effi Furniture Dealers</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s2.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>NIID Job Training</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s3.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Computer Repair & Services</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s4.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Packers and Movers</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s5.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Tour and Travels</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s6.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Andru Modular Kitchen</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s7.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Rute Skin Care & Treatment</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                            {/*<!--LISTINGS-->*/}
                                            <div className="home-list-pop list-spac">
                                                {/*<!--LISTINGS IMAGE-->*/}
                                                <div className="col-md-3 list-ser-img"> <img src="images/services/s6.jpeg" alt="" /> </div>
                                                {/*<!--LISTINGS: CONTENT-->*/}
                                                <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <a href="listing-details.html"><h3>Health and Fitness</h3></a>
                                                    <h4>Express Avenue Mall, Los Angeles</h4>
                                                    <p><b>Address:</b> 28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p>
                                                    <div className="list-number">
                                                        <ul>
                                                            <li><img src="images/icon/phone.png" alt="" /> +01 1245 2541, +62 6541 6528</li>
                                                            <li><img src="images/icon/mail.png" alt="" /> localdir@webdir.com</li>
                                                        </ul>
                                                    </div> <span className="home-list-pop-rat">4.2</span>
                                                    <div className="list-enqu-btn">
                                                        <ul>
                                                            <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Write Review</a> </li>
                                                            <li><a href="#!"><i className="fa fa-commenting-o" aria-hidden="true"></i> Send SMS</a> </li>
                                                            <li><a href="#!"><i className="fa fa-phone" aria-hidden="true"></i> Call Now</a> </li>
                                                            <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-usd" aria-hidden="true"></i> Get Quotes</a> </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                        </div>
                                        <div className="row">
                                            <ul className="pagination list-pagenat">
                                                <li className="disabled"><a href="#!!"><i className="material-icons">chevron_left</i></a> </li>
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
                                </div>




                            </div>
                        </div>
                    </div>
                </section>
                {/*{/*<!--MOBILE APP-->*/}*/}
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

export default ListingList;
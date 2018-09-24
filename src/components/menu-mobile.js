import React, { Component } from 'react';


class MenuMobile extends Component {
    render(){
        return(
            <div>
                <div className="v3-mob-top-menu">
                    <div className="container">
                        <div className="row">
                            <div className="v3-mob-menu">
                                <div className="v3-mob-m-1">
                                    <a href="index-1.html"><img src="/images/logo-soumaisniteroi.png" alt="" /> </a>
                                </div>
                                <div className="v3-mob-m-2">
                                    <div className="v3-top-ri">
                                        <ul>
                                            <li><a href="login.html" className="v3-menu-sign"><i className="fa fa-sign-in"></i> Sign In</a> </li>
                                            <li><a href="price.html" className="v3-add-bus"><i className="fa fa-plus" aria-hidden="true"></i> Add Listing</a> </li>
                                            <li><a href="#" className="ts-menu-5" id="v3-mob-menu-btn"><i className="fa fa-bars" aria-hidden="true"></i>Menu</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mob-right-nav" data-wow-duration="0.5s">
                    <div className="mob-right-nav-close"><i className="fa fa-times" aria-hidden="true"></i> </div>
                    <h5>Business</h5>
                    <ul className="mob-menu-icon">
                        <li><a href="price.html">Add Business</a> </li>
                        <li><a href="#!" data-toggle="modal" data-target="#register">Register</a> </li>
                        <li><a href="#!" data-toggle="modal" data-target="#sign-in">Sign In</a> </li>
                    </ul>
                    <h5>All Categories</h5>
                    <ul>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Help Services</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Appliances Repair & Services</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Furniture Dealers</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Packers and Movers</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Pest Control </a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Solar Product Dealers</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Interior Designers</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Carpenters</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Plumbing Contractors</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Modular Kitchen</a> </li>
                        <li><a href="list.html"><i className="fa fa-angle-right" aria-hidden="true"></i> Internet Service Providers</a> </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default MenuMobile;
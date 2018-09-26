import React, { Component } from 'react';

class FeaturedTwoColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    render(){
        return(
            <section class={`com-padd com-padd-redu-bot ${this.getCustomClass()} ${this.props.background}`}>
                <div class="container dir-hom-pre-tit">
                    <div class="row">
                        <div class="com-title">
                            <h2>Top Trendings for <span>your City</span></h2>
                            <p>Explore some of the best tips from around the world from our partners and friends.</p>
                        </div>
                        <div class="col-md-6">
                            <div>
                                {/*<!--POPULAR LISTINGS-->*/}
                                <div class="home-list-pop">
                                    {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                    <div class="col-md-3"> <img src="images/services/tr1.jpg" alt="" /> </div>
                                    {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                    <div class="col-md-9 home-list-pop-desc"> <a href="automobile-listing-details.html"><h3>Import Motor America</h3></a>
                                        <h4>Express Avenue Mall, Santa Monica</h4>
                                        <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span class="home-list-pop-rat">4.2</span>
                                        <div class="hom-list-share">
                                            <ul>
                                                <li><a href="#!"><i class="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                <li><a href="#!"><i class="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                <li><a href="#!"><i class="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                <li><a href="#!"><i class="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/*<!--POPULAR LISTINGS-->*/}
                                <div class="home-list-pop">
                                    {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                    <div class="col-md-3"> <img src="images/services/tr2.jpg" alt="" /> </div>
                                    {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                    <div class="col-md-9 home-list-pop-desc"> <a href="property-listing-details.html"><h3>Luxury Property</h3></a>
                                        <h4>Express Avenue Mall, New York</h4>
                                        <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span class="home-list-pop-rat">4.2</span>
                                        <div class="hom-list-share">
                                            <ul>
                                                <li><a href="#!"><i class="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                <li><a href="#!"><i class="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                <li><a href="#!"><i class="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                <li><a href="#!"><i class="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div>
                                {/*<!--POPULAR LISTINGS-->*/}
                                <div class="home-list-pop">
                                    {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                    <div class="col-md-3"> <img src="images/services/tr1.jpg" alt="" /> </div>
                                    {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                    <div class="col-md-9 home-list-pop-desc"> <a href="automobile-listing-details.html"><h3>Import Motor America</h3></a>
                                        <h4>Express Avenue Mall, Santa Monica</h4>
                                        <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span class="home-list-pop-rat">4.2</span>
                                        <div class="hom-list-share">
                                            <ul>
                                                <li><a href="#!"><i class="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                <li><a href="#!"><i class="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                <li><a href="#!"><i class="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                <li><a href="#!"><i class="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/*<!--POPULAR LISTINGS-->*/}
                                <div class="home-list-pop">
                                    {/*<!--POPULAR LISTINGS IMAGE-->*/}
                                    <div class="col-md-3"> <img src="images/services/tr2.jpg" alt="" /> </div>
                                    {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                                    <div class="col-md-9 home-list-pop-desc"> <a href="property-listing-details.html"><h3>Luxury Property</h3></a>
                                        <h4>Express Avenue Mall, New York</h4>
                                        <p>28800 Orchard Lake Road, Suite 180 Farmington Hills, U.S.A.</p> <span class="home-list-pop-rat">4.2</span>
                                        <div class="hom-list-share">
                                            <ul>
                                                <li><a href="#!"><i class="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                                <li><a href="#!"><i class="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                                <li><a href="#!"><i class="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                                <li><a href="#!"><i class="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedTwoColumns;
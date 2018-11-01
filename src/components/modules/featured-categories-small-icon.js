import React, { Component } from 'react';

class FeaturedCategoriesSmallIcon extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    render(){
        return(
            
            <section className={`cat-v2-hom com-padd mar-bot-red-m30 ${this.getCustomClass()} ${this.getBackgroundColor()} `}>
                <div className="container">
                    <div className="row">
                        <div className="com-title">
                            <h2>Find your <span>Services</span></h2>
                            <p>Explore some of the best business from around the world from our partners and friends.</p>
                        </div>
                        <div className="cat-v2-hom-list">
                            <ul>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat1.png" alt="" /> Hospitals</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat2.png" alt="" /> Hotel & Resort</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat3.png" alt="" /> Events</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat4.png" alt="" /> Wedding Halls</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat5.png" alt="" /> Shops</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat6.png" alt="" /> Fitness & Gym</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat7.png" alt="" /> Sports</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat8.png" alt="" /> Education</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat9.png" alt="" /> Electricals</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat10.png" alt="" /> Automobiles</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat11.png" alt="" /> Real Estates</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat12.png" alt="" /> Import & Export</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat13.png" alt="" /> Interior Design</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat14.png" alt="" /> Software Solutions</a>
                                </li>
                                <li>
                                    <a href="#@todo"><img src="images/icon/hcat15.png" alt="" /> Yoga Training</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedCategoriesSmallIcon;
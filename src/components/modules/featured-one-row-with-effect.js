import React, { Component } from 'react';

class FeaturedOneRowWithEffect extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    render(){
        return(
            <section className={`${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                <div className="land-full land-packages">
                    <div className="container">
                        <div className="com-title">
                            <h2>Popular <span>Services</span></h2>
                            <p>Explore some of the best business from around the world from our partners and friends.</p>
                        </div>
                    <div className="land-pack">
                        <ul>
                            <li>							
                                <div className="land-pack-grid">
                                <div className="land-pack-grid-img">
                                    <img src="images/services/20.jpeg" alt="" />
                                </div>
                                <div className="land-pack-grid-text">
                                <h4>Hotel Bookings</h4>
                                <a href="service-booking.html" className="land-pack-grid-btn">Book Now</a></div>
                                </div>
                            </li>
                            <li>							
                                <div className="land-pack-grid">
                                <div className="land-pack-grid-img">
                                    <img src="images/services/p1.jpg" alt="" />
                                </div>
                                <div className="land-pack-grid-text">
                                <h4>Real Estate</h4>
                                <a href="service-booking.html" className="land-pack-grid-btn land-pack-grid-btn-blu">Book Now</a></div>
                                </div>
                            </li>
                            <li>							
                                <div className="land-pack-grid">
                                <div className="land-pack-grid-img">
                                    <img src="images/services/10.jpeg" alt="" />
                                </div>
                                <div className="land-pack-grid-text">
                                <h4>Health Check-up</h4>
                                <a href="service-booking.html" className="land-pack-grid-btn land-pack-grid-btn-yel">Book Now</a></div>
                                </div>
                            </li>
                            <li>							
                                <div className="land-pack-grid">
                                <div className="land-pack-grid-img">
                                    <img src="images/services/ser5.jpg" alt="" />
                                </div>
                                <div className="land-pack-grid-text">
                                <h4>Cab Booking</h4>
                                <a href="service-booking.html" className="land-pack-grid-btn land-pack-grid-btn-red">Book Now</a></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    </div>
                </div>		
            </section>
        )
    }

}

export default FeaturedOneRowWithEffect;
import React, { Component } from 'react';



class PreFooter extends Component {

   

    render(){
    
        return(
            <section className="web-app com-padd">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 web-app-img"> <img src="/images/mobile.png" alt="" /> </div>
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
        )
        
    }
}



export default PreFooter;

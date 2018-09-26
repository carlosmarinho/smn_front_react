import React, { Component } from 'react';

class FeaturedFourColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    render(){
        return(
            
            <section className={`com-padd com-padd-redu-bot1 pad-bot-red-40 ${this.getCustomClass()} ${this.props.background}`}>
                <div className="container">
                    <div className="row">
                        <div className="com-title">
                            <h2>Find your <span>Services</span></h2>
                            <p>Explore some of the best business from around the world from our partners and friends.</p>
                        </div>
                        <div className="dir-hli">
                            <ul>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/15.jpg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Hotels & Resorts <span className="dir-ho-cat">Show All (940)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list-grid.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/13.jpg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Hospitals <span className="dir-ho-cat">Show All (174)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/9.jpg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Transportation <span className="dir-ho-cat">Show All (624)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list-grid.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/12.jpeg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Property <span className="dir-ho-cat">Show All (960)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/2.jpeg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Automobilers <span className="dir-ho-cat">Show All (745)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list-grid.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/6.jpeg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Electricals <span className="dir-ho-cat">Show All (865)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/16.jpeg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Education <span className="dir-ho-cat">Show All (935)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                                {/*<!--=====LISTINGS======-->*/}
                                <li className="col-md-3 col-sm-6">
                                    <a href="list-grid.html">
                                        <div className="dir-hli-5">
                                            <div className="dir-hli-1">
                                                <div className="dir-hli-3"><img src="images/hci1.png" alt="" /> </div>
                                                <div className="dir-hli-4"> </div> <img src="images/services/8.jpeg" alt="" /> </div>
                                            <div className="dir-hli-2">
                                                <h4>Sports <span className="dir-ho-cat">Show All (361)</span></h4> </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedFourColumns;
import React, { Component } from 'react';

class FeaturedOneRowAboveOtherLayer extends Component {

    getCustomclassName(){
        return (this.props.customclassName)? this.props.customclassName : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    render(){
        return(
            <section className={`proj mar-bot-red-m30 ${this.getCustomclassName()} ${this.getBackgroundColor()}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-sm-6">
                            <div className="hom-pro"> <img src="images/icon/1.png" alt="" />
                                <h4>24 Million Business</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="hom-pro"> <img src="images/icon/2.png" alt="" />
                                <h4>1,200 Services Offered</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="hom-pro"> <img src="images/icon/3.png" alt="" />
                                <h4>05 Million Visitors</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div className="col-md-3 col-sm-6">
                            <div className="hom-pro"> <img src="images/icon/7.png" alt="" />
                                <h4>24 Million Business</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedOneRowAboveOtherLayer;
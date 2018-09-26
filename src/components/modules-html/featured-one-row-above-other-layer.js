import React, { Component } from 'react';

class FeaturedOneRowAboveOtherLayer extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    render(){
        return(
            <section class={`proj mar-bot-red-m30 ${this.getCustomClass()} ${this.props.background}`}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-3 col-sm-6">
                            <div class="hom-pro"> <img src="images/icon/1.png" alt="" />
                                <h4>24 Million Business</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="hom-pro"> <img src="images/icon/2.png" alt="" />
                                <h4>1,200 Services Offered</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="hom-pro"> <img src="images/icon/3.png" alt="" />
                                <h4>05 Million Visitors</h4>
                                <p>Choose from a collection of handpicked luxury villas & apartments</p> <a href="#!">Explore Now</a> </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class="hom-pro"> <img src="images/icon/7.png" alt="" />
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
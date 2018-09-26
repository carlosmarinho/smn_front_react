import React, { Component } from 'react';

class FeaturedOneRowOneColumn extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    render(){
        return(
            <section className={`com-padd-min ${this.getCustomClass()} ${(this.props.background)? this.props.background: 'home-dis'}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <img src={this.props.img} style={{width: '100%'}} alt="" />  
                            </div>
                            <div className="col-md-7">
                                <h2>{this.props.title}</h2> 
                                <p>{this.props.text}</p>
                                <p><a href={this.props.link} class="btn">{this.props.textLink}</a></p>
                            </div>
                        </div>
                    </div>
            </section>
        )
    }

}

export default FeaturedOneRowOneColumn;
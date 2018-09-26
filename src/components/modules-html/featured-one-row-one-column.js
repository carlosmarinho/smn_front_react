import React, { Component } from 'react';

class FeaturedOneRowOneColumn extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getText(){
        if(this.props.featureText){
            return (
                <div>
                <span>{this.props.featureText} </span> 
                {this.props.text} <a href="${this.props.link}">{this.props.textLink}</a>
                </div>
            );
        }
        else {
            return this.props.text;
        }
    }

    render(){
        return(
            <section className={`com-padd ${this.getCustomClass()} ${(this.props.background)? this.props.background: 'home-dis'}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2>{this.getText()}</h2> 
                            </div>
                        </div>
                    </div>
            </section>
        )
    }

}

export default FeaturedOneRowOneColumn;
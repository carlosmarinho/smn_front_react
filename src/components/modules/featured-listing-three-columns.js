import React, { Component } from 'react';

class FeaturedListingThreeColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    generateListing(){
        if(this.props.object){
            console.log("no generate listing: ", this.props.object)
            return this.props.object.map(guia => {
                return(
                    <div className="col-md-4">
                        <a href="#!">
                            <div className="list-mig-like-com com-mar-bot-30">
                                <div className="list-mig-lc-img"> <img src="images/listing/1.jpg" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                <div className="list-mig-lc-con">
                                    <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                    <h5>{guia.titulo}</h5>
                                    <h6>0.0 km - 1.0km</h6>
                                    <p>{guia.bairros[0].nome}</p>
                                </div>
                            </div>
                        </a>
                    </div>
                )
            })
        }
        console.log("props aqui: ", this.props.object)
    }

    render(){
        return(
            
            <section className={`com-padd ${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                <div className="container dir-hom-pre-tit">
                    <div className="com-title">
                        <h2>Guia da Cidade de Niterói</h2>
                        <p>Lojas, serviços ou empresas que se destacam em seu ramo na cidade de Niterói.</p>
                    </div>
                    <div className="row span-none">
                        {this.generateListing()}
                        
                        
                    </div>
                </div>
            </section>
        )
    }

}

export default FeaturedListingThreeColumns;
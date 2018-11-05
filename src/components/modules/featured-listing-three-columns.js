import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeaturedListingThreeColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    getTelefone(guia){
        if(guia.telefone){
            return (
                <i className="fa fa-phone" aria-hidden="true"> {guia.telefone}</i> 
            )
        }
    }

    getEmail(guia){
        if(guia.email){
            return (
                <i className="fa fa-envelope mar-left-10" aria-hidden="true"> {guia.email}</i> 
            )
        }
    }

    getContact(guia){
        let telefone = this.getTelefone(guia) 
        let email = this.getEmail(guia)
        return (
            <p>
                {telefone}
                {email}
            </p>
        )
    }

    getImageSrc(guia){
        if(guia.s3_imagem_destacada){
            return guia.old_imagem_destacada;
        }
        if(guia.old_imagem_destacada) {
            return guia.old_imagem_destacada;
        }
        else if(guia.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateListing(){
        if(this.props.object){
            console.log("no generate listing: ", this.props.object)
            return this.props.object.map((guia, ind) => {
                return(
                    <div className="col-md-4" key={ind}>
                        <Link to={`/guia/${guia.slug}`}>
                            <div className="list-mig-like-com com-mar-bot-30">
                                <div className="list-mig-lc-img"> <img src={this.getImageSrc(guia)} style={{width:355, height: 250}} alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                                <div className="list-mig-lc-con">
                                    <div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>
                                    <h5>{guia.titulo}</h5>
                                    <h6>{(guia.bairros && guia.bairros.length > 0)?guia.bairros[0].nome:''}</h6>
                                    {this.getContact(guia)}
                                    
                                </div>
                            </div>
                        </Link>
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
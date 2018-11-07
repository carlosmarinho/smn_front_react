import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WidgetFeatured extends Component {

    getImageSrc(object){
        if(object.s3_imagem_destacada){
            return object.old_imagem_destacada;
        }
        if(object.old_imagem_destacada) {
            return object.old_imagem_destacada;
        }
        else if(object.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
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

    generateWidget(objects) {
        if(objects && objects.length>0){
            return objects.map((object,i) => {
                if(i<=4) {
                    return (
                        <Link to={`/guia/${object.slug}`} key={i}>
                            <div className="list-mig-like-com">
                                <div className="list-mig-lc-img"> <img src={this.getImageSrc(object)} alt="" style={{height:200}} /> {/*carlos ver o q vai colocar aqui<span className="home-list-pop-rat list-mi-pr">$720</span>*/} </div>
                                <div className="list-mig-lc-con">
                                    {/*<div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>*/}
                                    <h5>{object.titulo}</h5>
                                    <p>{object.cidade[0].nome} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</p>
                                    {this.getContact(object)}
                                </div>
                            </div>
                        </Link>
                    )
                }
                else
                    return null;
            })
        }
        
    }

    render(){
       

        return (
            <div className="list-mig-like">
                <div className="pglist-p-com-ti pglist-p-com-ti-right">
                    <h3>{this.props.title}</h3> 
                </div>
                {this.generateWidget(this.props.objects)}
                
            </div>
        );
    }
}

export default WidgetFeatured;
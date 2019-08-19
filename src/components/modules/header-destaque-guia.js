import React, { Component } from 'react';
import GoogleAds from './modules/google-ads';

class HeaderDestaqueGuia extends Component {

    getImageSrc(guia){
        if(guia) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = guia
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                return old_imagem_destacada;
            }
            else if(imagem_destacada){
                if(imagem_destacada.url){
                    return imagem_destacada.url;
                }
    
                //implementar codigo
                return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
            }
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
    }


    getBackground(guia) {
        return {
            backgroundImage: `url(${this.getImageSrc(guia)})`,
            backgroundSize: 'cover'
        }
    }

    getAvaliacao(guia){
        if(guia && guia.avaliacao)
            return (
                <div className="list-rat-ch"> <span>5.0</span> 
                    <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> 
                </div>
            )
        else 
            return (
                <div className="list-rat-ch"> <span>Nenhuma Avaliação</span> 
                    <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> 
                </div>
            );
    }

    getTelefone(guia){
        if(guia && guia.telefone){
            return (
                <li><i className="fa fa-phone" aria-hidden="true"></i> {guia.telefone}</li>
            )
        }
    }

    getEmail(guia){
        if(guia && guia.email){
            return (
                <li><i className="fa fa-envelope" aria-hidden="true"></i> {guia.email}</li>
            )
        }
    }

    getContact(guia){
        if(guia && guia.contato){
            return (
                <li><i className="fa fa-user" aria-hidden="true"></i> {guia.contato}</li>
            )
        }
    }

    render(){
        let guia = this.props.guia;
        return(
            <div>
                <section>
                    <div className="v3-list-ql">
                        <div className="container">
                            <div className="row">
                                <div className="v3-list-ql-inn">
                                    <ul>
                                        <li className="active"><a href="#ld-abour"><i className="fa fa-user"></i> Sobre</a>
                                        </li>
                                        {(guia && guia.descricao_servicos)?<li><a href="#ld-ser"><i className="fa fa-cog"></i> Serviços</a>
                                        </li>:''}
                                        <li><a href="#ld-gal"><i className="fa fa-photo"></i> Galeria de Fotos</a>
                                        </li>
                                        {/*<li><a href="#ld-roo"><i className="fa fa-ticket"></i> Room Booking</a>
                                        </li>*/}
                                        <li><a href="#ld-vie"><i className="fa fa-street-view"></i> Google Street View</a>
                                        </li>
                                        <li><a href="#ld-rew"><i className="fa fa-edit"></i> Deixe seus comentários</a>
                                        </li>
                                        <li><a href="#ld-rer"><i className="fa fa-star-half-o"></i> Comentários</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/*<!--LISTING DETAILS-->*/}
                <section className="pg-list-1" style={this.getBackground(guia)}>
                    <div className="container">
                        <div className="row">
                            <div className="pg-list-1-left"> <a href="#"><h3>{(guia)?guia.titulo:''}</h3></a>
                                {this.getAvaliacao(guia)}

                                <h4>{(guia && guia.cidade && guia.cidade.length>0)?guia.cidade[0].nome:''} {(guia && guia.bairros && guia.bairros.length>0)?'- ' + guia.bairros[0].nome:''}</h4>
                                <p><b>Endereço:</b> {(guia)?guia.endereco:''}</p>
                                <div className="list-number pag-p1-phone">
                                    <ul>
                                        {this.getTelefone(guia)}
                                        {this.getEmail(guia)}
                                        {this.getContact(guia)}
                                    </ul>
                                </div>
                            </div>
                            <div className="pg-list-1-right">
                                <div className="list-enqu-btn pg-list-1-right-p1">
                                    <ul>
                                        <li><a href="#ld-rew"><i className="fa fa-star-o" aria-hidden="true"></i> Deixe seu Comentário</a> </li>
                                        <li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i> Ligue Agora</a> </li>
                                        <li><a href="#" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Pergunte</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <GoogleAds />
            </div>
            
        )
    }
}

export default HeaderDestaqueGuia;
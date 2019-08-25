import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom';
import GoogleAds from './modules/google-ads';

class HeaderDestaqueEvento extends Component {

    getImageSrc(evento){
        if(evento) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = evento
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');
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



    getBackground(evento) {
        return {
            backgroundImage: `url(${this.getImageSrc(evento)})`,
            backgroundSize: 'cover'
        }
    }

    getAvaliacao(evento){
        if(evento && evento.avaliacao)
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

    getTelefone(evento){
        if(evento && evento.telefone){
            return (
                <li><i className="fa fa-phone" aria-hidden="true"></i> {evento.telefone}</li>
            )
        }
    }

    getEmail(evento){
        if(evento && evento.email){
            return (
                <li><i className="fa fa-envelope" aria-hidden="true"></i> {evento.email}</li>
            )
        }
    }

    getContact(evento){
        if(evento && evento.contato){
            return (
                <li><i className="fa fa-user" aria-hidden="true"></i> {evento.contato}</li>
            )
        }
    }

    getLocal(evento){
        if(evento && evento.endereco)
            return <p><b>Local:</b> {evento.endereco}</p>
        else if(evento && evento.local)
            return <p><b>Local:</b> {evento.local.nome}</p>
    }

    getDate(evento){
        if(evento ){
            if(evento.fim){
                return (
                    <div>
                        <span><strong>Data Inicial do Evento:</strong> {this.dateNumberPtBr(new Date(evento.inicio))}</span><br />
                        <span><strong>Data Final do Evento:</strong> {this.dateNumberPtBr(new Date(evento.fim))}</span><br />
                    </div>
                )
            }
            else{
                return (
                    <div>
                        <span><strong>Data do Evento:</strong> {this.dateNumberPtBr(new Date(evento.inicio))}</span><br />
                    </div>
    
                )
            }
        }
        
    }

    dateNumberPtBr(date){
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }


    render(){
        let title = "Soumaisniterói";
        let metadescription = '';
        if(this.props.evento){
            title = this.props.evento.titulo + " | " + title;
            if(this.props.evento.metadescription)   
                metadescription = this.props.evento.metadescription;
            else if(this.props.evento.descricao){
                const truncate = _.truncate
                metadescription = truncate(this.props.evento.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 155 });
            }
        }

        let evento = this.props.evento;
        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content={metadescription} />
                    <title>{title}</title>
                    <link rel="canonical" href={`http://soumaisniteroi.com.br/eventos/${(evento)?evento.slug:''}`}  />
                </Helmet>
                <section>
                    <div className="v3-list-ql">
                        <div className="container">
                            <div className="row">
                                <div className="v3-list-ql-inn">
                                    <ul>
                                        <li className="active"><a href="#ld-abour"><i className="fa fa-user"></i> Dados do Evento</a>
                                        </li>
                                        {(evento && evento.descricao_servicos)?<li><a href="#ld-ser"><i className="fa fa-cog"></i> Serviços</a>
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
                <section className="pg-list-1" style={this.getBackground(evento)}>
                    <div className="container">
                        <div className="row">
                            <div className="pg-list-1-left"> <Link to={'/'}><h3>{(evento)?evento.titulo:''}</h3></Link>
                                {this.getAvaliacao(evento)}
                                <h4>{(evento && evento.cidade)?evento.cidade.nome :'Niterói'} {(evento && evento.bairros && evento.bairros.length>0)?'- ' + evento.bairros[0].nome:''}</h4>
                                {this.getLocal(evento)}
                                <div className="list-number pag-p1-phone">
                                    <ul>
                                        {this.getDate(evento)}
                                        {this.getContact(evento)}
                                        {this.getTelefone(evento)}
                                        {this.getEmail(evento)}
                                    </ul>
                                </div>
                            </div>
                            <div className="pg-list-1-right">
                                <div className="list-enqu-btn pg-list-1-right-p1">
                                    <ul>
                                        <li><a href="#ld-rew"><i className="fa fa-star-o" aria-hidden="true"></i> Deixe seu Comentário</a> </li>
                                        {/*carlos tentar incluir ir para o site<li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i> Ligue Agora</a> </li>*/}
                                        <li><a href="#a" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Pergunte</a> </li>
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

export default HeaderDestaqueEvento;
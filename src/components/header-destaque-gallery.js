import _ from 'lodash';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

class HeaderDestaqueGallery extends Component {

    getImageSrc(gallery){
        
        if(gallery && gallery.s3_imagem_destacada){
            return gallery.old_imagem_destacada;
        }
        else if(gallery && gallery.old_imagem_destacada) {
            return gallery.old_imagem_destacada;
        }
        else if(gallery && gallery.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    getBackground(gallery) {
        return {
            backgroundImage: `url(${this.getImageSrc(gallery)})`,
            backgroundSize: 'cover'
        }
    }
   

    dateNumberPtBr(date){
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }


    render(){
        let title = "Cidade de Niterói";
        let metadescription = '';
        let descricao = 'Vejam as melhores fotos da cidade de Niterói! Envie-nos também a sua foto irada para contato@soumaisniteroi.com.br ou marque nos no Instagram @soumaisniteroi.oficial';
        if(this.props.title){
            title = this.props.title + " - " + title;
        }

        let gallery = this.props.gallery;
        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <meta name="description" content={metadescription} />
                    <title>{title}</title>
                    <link rel="canonical" href={`http://soumaisniteroi.com.br/gallerys/${(gallery)?gallery.slug:''}`}  />
                </Helmet>
                {/*<!--LISTING DETAILS-->*/}
                <section className="pg-list-1" style={this.getBackground(gallery)}>
                    <div className="container">
                        <div className="row">
                            <div className="pg-list-1-left"> 
                                <h3>{this.props.title}</h3>
                                <h4>{descricao}</h4>
                            </div>
                            <div className="pg-list-1-right">
                                <div className="list-enqu-btn pg-list-1-right-p1">
                                    <ul>
                                        <li><a href="#ld-rew"><i className="fa fa-star-o" aria-hidden="true"></i> Deixe seu Comentário</a> </li>
                                        {/*carlos tentar incluir ir para o site<li><a href="#"><i className="fa fa-phone" aria-hidden="true"></i> Ligue Agora</a> </li>*/}
                                        <li><a href="#" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Envie sua foto</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            
        )
    }
}

export default HeaderDestaqueGallery;
import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FeaturedNews extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    getImageSrc(noticia){
        if(noticia) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = noticia
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                return old_imagem_destacada.replace('http://soumaisniteroi', 'http://engenhoca.soumaisniteroi');
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


    generateNews(array) {
        const truncate = _.truncate

        return array.map( (noticia, ind) => {
            return (
                <div className="col-md-3" key={ind}>
                    <Link to={`/noticias/${noticia.slug}`}>
                        <div className="list-mig-like-com">
                            <div className="list-mig-lc-img list-mig-lc-img-small"> <img src={this.getImageSrc(noticia)} alt="" /> </div>
                            <div className="list-mig-lc-con list-mig-lc-con2">
                                <h5>{truncate(noticia.titulo, { length: 50, separator: /,?\.* +/ })}</h5>
                                <p>{truncate(noticia.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 75, separator: /,?\.* +/ })}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })
    }

    render(){
        const truncate = _.truncate

        if(this.props.object){
            let noticias = this.props.object;
            if (noticias.length === 0)
                return null;

            let noticia_destaque = noticias[0];
            noticias = noticias.filter((el,i) => {
                if(i !== 0)
                    return el
            })
            
            return(
                <section className={`com-padd com-padd-redu-top ${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Últimas notícias da <span>Cidade de Niterói</span></h2>
                                {/*<p>Explore some of the best business from around the world from our partners and friends.</p>*/}
                            </div>
                            <div className="col-md-6">
                                <a href={`/noticias/${noticia_destaque.slug}`}>
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img list-mig-lc-img-big"> <img src={this.getImageSrc(noticia_destaque)} alt="" /> </div>
                                        <div className="list-mig-lc-con">
                                            {/*<div className="list-rat-ch list-room-rati"> <span>4.0</span> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> </div>*/}
                                            <h5>{truncate(noticia_destaque.titulo, { length: 80, separator: /,?\.* +/ })}</h5>
                                            <p>{truncate(noticia_destaque.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 130, separator: /,?\.* +/ })}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            {this.generateNews(noticias)}
                            
                        </div>
                    </div>
                </section>
            )
        }
        else{
            return (
                <section className={`com-padd com-padd-redu-top ${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Últimas notícias da <span>Cidade de Niterói</span></h2>
                                {/*<p>Explore some of the best business from around the world from our partners and friends.</p>*/}
                            </div>
                            <div className="col-md-6">
                                Carregando!
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

}

export default FeaturedNews;
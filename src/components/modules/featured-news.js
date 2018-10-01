import _ from 'lodash';
import React, { Component } from 'react';

class FeaturedTwoColumns extends Component {

    getCustomClass(){
        return (this.props.customClass)? this.props.customClass : '';
    }

    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    getImageSrc(noticia){
        if(noticia.s3_imagem_destacada){
            return noticia.old_imagem_destacada;
        }
        if(noticia.old_imagem_destacada) {
            return noticia.old_imagem_destacada;
        }
        else if(noticia.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateNews(array) {
        const truncate = _.truncate

        return array.map( noticia => {
            return (
                <div className="col-md-3">
                    <a href="list-lead.html">
                        <div className="list-mig-like-com">
                            <div className="list-mig-lc-img"> <img src={this.getImageSrc(noticia)} alt="" /> </div>
                            <div className="list-mig-lc-con list-mig-lc-con2">
                                <h5>{truncate(noticia.titulo, { length: 50, separator: /,?\.* +/ })}</h5>
                                <p>{truncate(noticia.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 65, separator: /,?\.* +/ })}</p>
                            </div>
                        </div>
                    </a>
                </div>
            )
        })
    }

    render(){
        const truncate = _.truncate

        if(this.props.object){
            let noticias = this.props.object;
            if (noticias.length == 0)
                return null;

            let noticia_destaque = noticias[0];
            noticias = noticias.filter((el,i) => {
                if(i !== 0)
                    return el
            })
            console.log("noticias no features: ". noticias)
            return(
                <section className={`com-padd com-padd-redu-top ${this.getCustomClass()} ${this.getBackgroundColor()}`}>
                    <div className="container">
                        <div className="row">
                            <div className="com-title">
                                <h2>Últimas notícias da <span>Cidade de Niterói</span></h2>
                                {/*<p>Explore some of the best business from around the world from our partners and friends.</p>*/}
                            </div>
                            <div className="col-md-6">
                                <a href="list-lead.html">
                                    <div className="list-mig-like-com">
                                        <div className="list-mig-lc-img"> <img src={this.getImageSrc(noticia_destaque)} alt="" /> </div>
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
    }

}

export default FeaturedTwoColumns;
import _ from 'lodash'
import React, { Component } from 'react';

class FeaturedTwoColumns extends Component {

    getCustomclassName(){
        return (this.props.customclassName)? this.props.customclassName : '';
    }

    
    getBackgroundColor(){
        return (this.props.backgroundColor)? this.props.backgroundColor : '';
    }

    getImageSrc(evento){
        if(evento.s3_imagem_destacada){
            return evento.old_imagem_destacada;
        }
        if(evento.old_imagem_destacada) {
            return evento.old_imagem_destacada;
        }
        else if(evento.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateEvent(array) {
        const truncate = _.truncate
        return array.map( evento => {
            if(evento == undefined){
                console.log("evento undefined...........")
                return null;
            }
            else{
                return(
                    <div>
                        <div className="home-list-pop">
                            {/*<!--POPULAR LISTINGS IMAGE-->*/}
                            <div className="col-md-3"> <img src={this.getImageSrc(evento)} alt="" /> </div>
                            {/*<!--POPULAR LISTINGS: CONTENT-->*/}
                            <div className="col-md-9 home-list-pop-desc"> <a href="automobile-listing-details.html"><h3>{truncate(evento.titulo, { length: 50, separator: /,?\.* +/ })}</h3></a>
                                <h4>Bairro: {evento.bairros[0].nome}</h4>
                                <p>{truncate(evento.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 100, separator: /,?\.* +/ })}</p> {/*<span className="home-list-pop-rat">4.2</span>*/}
                                <div className="hom-list-share">
                                    <ul>
                                        <li><a href="#!"><i className="fa fa-bar-chart" aria-hidden="true"></i> 52</a> </li>
                                        <li><a href="#!"><i className="fa fa-heart-o" aria-hidden="true"></i> 32</a> </li>
                                        <li><a href="#!"><i className="fa fa-eye" aria-hidden="true"></i> 420</a> </li>
                                        <li><a href="#!"><i className="fa fa-share-alt" aria-hidden="true"></i> 570</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    render(){
        let ar_object = [];
        
        if(this.props.object){
            ar_object = this.props.object.data;

            return(
                <section className={`com-padd com-padd-redu-bot ${this.getCustomclassName()} ${this.getBackgroundColor()}`}>
                    <div className="container dir-hom-pre-tit">
                        <div className="row">
                            <div className="com-title">
                                <h2>Eventos da <span>Cidade de Niterói</span></h2>
                                {/*<p>Explore some of the best tips from around the world from our partners and friends.</p>*/}
                            </div>
                            <div className="col-md-6">
                                {this.generateEvent([ar_object[3], ar_object[2]])}
                            </div>

                            <div className="col-md-6">
                                {this.generateEvent([ar_object[1], ar_object[0]])}
                            </div>
                            
                        </div>
                    </div>
                </section>
            )
        }
        else{
            return (
                <section className={`com-padd com-padd-redu-bot ${this.getCustomclassName()} ${this.getBackgroundColor()}`}>
                    <div className="container dir-hom-pre-tit">
                        <div className="row">
                            <div className="com-title">
                                <h2>Eventos da <span>Cidade de Niterói</span></h2>
                            </div>
                        </div>
                    </div>
                </section>
            )
        }
    }

}

export default FeaturedTwoColumns;
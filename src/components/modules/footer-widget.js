import _ from 'lodash'
import React, { Component } from 'react';

import RightColumn from '../right-column';

class FooterWidget extends Component {

    getImageSrc(object){
        if(object.s3_imagem_destacada){
            return object.old_imagem_destacada;
        }
        if(object.old_imagem_destacada) {
            return object.old_imagem_destacada;
        }
        else if(object.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateWidget(objects) {
        const truncate = _.truncate

        return objects.map((object,i) => {
            if(i <= 3)
                return( 
                    <li>
                        <a href="listing-details.html">
                            <div className="div-footer-img"> 
                                <img src={this.getImageSrc(object)} alt="" /> 
                            </div>
                            <div className="div-footer-text">
                                <h5>{truncate(object.titulo, { length: 25, separator: /,?\.* +/ })}</h5> 
                                <span>{truncate(object.descricao.replace(/<\/?[^>]+(>|$)/g, ""), { length: 40, separator: /,?\.* +/ })}</span> 
                            </div>
                        </a>
                    </li>
                )
        })
        
    }

    render(){
        if(!this.props.object || this.props.object.length == 0)
            return null;

        return (
            <div className="col-sm-4 col-md-3">
                <h4>{this.props.title}</h4>
                <div className="footer-widget">
                    <ul >
                        {this.generateWidget(this.props.object)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default FooterWidget;
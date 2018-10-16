import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RightWidgetLink extends Component {

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
        let maxPerWidget = 5;
        if(this.props.maxItem)
            maxPerWidget = this.props.maxItem;

        const truncate = _.truncate
        if(objects.length>0){
            return objects.map((object,i) => {
                if(i < maxPerWidget)
                    return (
                        <li>
                            <a href={'guia-comercial/' + object.slug}>
                                <div className="list-pg-guar-img"> <img src={this.getImageSrc(object)} alt="" style={{width:32}} /> </div>
                                <h4>{truncate(object.titulo, { length: 50, separator: /,?\.* +/ })}</h4>
                                <p>{(object.cidade && object.cidade.length>0)?object.cidade[0].nome:''} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</p>
                            </a>
                        </li>
                    )
            })
        }
        
    }

    render(){
        let objects = []
        console.log("objects no right widget: ", this.props)
        if(this.props.objects && this.props.objects.length > 0)
        {
            objects = this.props.objects;
        }

        return (
            <div className="pglist-p3 pglist-bg pglist-p-com">
                <div className="pglist-p-com-ti pglist-p-com-ti-right">
                    <h3>{this.props.title}</h3> 
                </div>
                <div className="list-pg-inn-sp">
                    <div className="list-pg-guar">
                        <ul>
                            
                            {this.generateWidget(objects)}
                        </ul> 
                        <Link className="waves-effect waves-light btn-large full-btn list-pg-btn" to="/guia" >Ver Mais</Link> </div>
                </div>
            </div>
        );
    }
}

export default RightWidgetLink;
import _ from 'lodash'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RightWidgetLink extends Component {

    getImageSrc(object){
        if(object) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = object
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                if(old_imagem_destacada.includes('.amazonaws'))
                    return old_imagem_destacada;

                return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');;
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

    
    generateWidget(objects) {
        let maxPerWidget = 5;
        if(this.props.maxItem)
            maxPerWidget = this.props.maxItem;

        const truncate = _.truncate
        if(objects.length>0){
            return objects.map((object,i) => {
                if(i < maxPerWidget){ 
                    return (
                        <li key={i}>
                            <Link to={`/${this.props.type}/${object.slug}`}>
                                <div className="list-pg-guar-img"> <img src={this.getImageSrc(object)} alt="" style={{width:32}} /> </div>
                                <h4>{truncate(object.titulo, { length: 50, separator: /,?\.* +/ })}</h4>
                                <p>{(object.cidade && object.cidade.length>0)?object.cidade[0].nome:''} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</p>
                            </Link>
                        </li>
                    )
                }
                else
                    return null;
            })
        }
        
    }

    render(){
        let objects = []
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
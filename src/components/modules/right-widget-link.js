import _ from 'lodash'
import React, { Component } from 'react';


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
        const truncate = _.truncate
        console.log("object no right widget generateWidgetttttttttt: ", objects);
        if(objects.length>0){
            return objects.map(object => {
                return (
                    <li>
                        <a href={'guia-comercial/' + object.slug}>
                            <div className="list-pg-guar-img"> <img src={this.getImageSrc(object)} alt="" /> </div>
                            <h4>{object.titulo}</h4>
                            <p>{object.cidade[0].nome} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</p>
                        </a>
                    </li>
                )
            })
        }
        
    }

    render(){
        let objects = []
        if(this.props.objects && this.props.objects.length > 0)
        {
            console.log("object no right widget: ", this.props.objects);
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
                        <a className="waves-effect waves-light btn-large full-btn list-pg-btn" href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo">Ver Mais</a> </div>
                </div>
            </div>
        );
    }
}

export default RightWidgetLink;
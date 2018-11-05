import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class LeftWidgetLink extends Component {

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
        if(objects.length>0){
            return objects.map((object,i) => {
                if(i<10){
                    return (
                        <li>
                            <Link to={'/guia/' + object.slug}>
                                <div className="list-left-near lln1"> <img src={this.getImageSrc(object)} alt="" /> </div>
                                <div className="list-left-near lln2">
                                    <h5>{object.titulo}</h5> 
                                    <span>{object.cidade[0].nome} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</span> </div>
                                <div className="list-left-near lln3"> <span>5.0</span> </div>
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
            <div>
                <div className="dir-alp-con-left-1">
                    <h3>{this.props.title}</h3> </div>
                <div className="dir-hom-pre dir-alp-left-ner-notb">
                    <ul>
                        {this.generateWidget(objects)}
                    </ul>
                </div>
            </div>
        );
    }
}

export default LeftWidgetLink;
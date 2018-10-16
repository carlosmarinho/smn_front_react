import _ from 'lodash'
import React, { Component } from 'react';


class WidgetFilterCheckbox extends Component {

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
        if(objects.length>0){
            return objects.map(object => {
                return (
                    <li>
                        <input type="checkbox" id="scf1" />
                        <label htmlFor="scf1">{object.nome}</label>
                    </li>
                )
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
            <div className="dir-alp-l3 dir-alp-l-com">
                <h4>{this.props.title}</h4>
                <div className="dir-hom-pre dir-alp-left-ner-notb">
                    <form action="#">
                        <ul>
                            {this.generateWidget(objects)}
                        </ul>
                    </form> 
                </div>
            </div>
        );
    }
}

export default WidgetFilterCheckbox;
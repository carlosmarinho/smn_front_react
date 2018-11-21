import React, { Component } from 'react';


class WidgetFilterCheckboxCollapsable extends Component {

    getImageSrc(object){
        if(object.s3_imagem_destacada){
            return object.old_imagem_destacada;
        }
        if(object.old_imagem_destacada) {
            return object.old_imagem_destacada;
        }
        else if(object.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateWidget(objects) {
        if(objects.length>0){
            return objects.map((object, ind) => {
                return (
                    <li key={ind}>
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
            <li>
                <div className={`collapsible-header dir-alp-con-left-1 ${this.props.classActive}`}>
                    <h4>{this.props.title}</h4> 
                </div>
                <div className="collapsible-body dir-hom-pre dir-alp-l3 dir-alp-left-1">
                    <form action="#">
                        <ul>
                           {this.generateWidget(objects)}
                        </ul>
                    </form> 
                </div>
            
            </li>
        );
    }
}

export default WidgetFilterCheckboxCollapsable;
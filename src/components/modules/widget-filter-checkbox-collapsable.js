import React, { Component } from 'react';
import {Collapsible, CollapsibleItem} from 'react-materialize';


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
            <Collapsible defaultActiveKey={(this.props.classActive)?0:1}>
                <CollapsibleItem header={this.props.title}  >{/*icon='filter_drama'*/} 
                    <div className="dir-alp-l3 dir-alp-l-com1 dir-alp-p3 dir-alp-con-left-1">
                        <form action="#">
                            <ul>
                                {this.generateWidget(objects)}
                            </ul>
                        </form>                 
                    </div>
                </CollapsibleItem>
            </Collapsible>
            
        );
    }
}

export default WidgetFilterCheckboxCollapsable;
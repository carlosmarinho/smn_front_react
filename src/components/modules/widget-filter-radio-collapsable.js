import React, { Component } from 'react';
import {Collapsible, CollapsibleItem} from 'react-materialize';
//@todo verify if this widget is still working with this line commented 
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class WidgetFilterRadioCollapsable extends Component {

    getImageSrc(object){
        if(object) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = object
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                return old_imagem_destacada.replace('http://soumaisniteroi', 'http://engenhoca.soumaisniteroi');
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
        if(objects.length>0){
            return objects.map((object, ind) => {
                return (
                    <li key={ind}>
                        <input className="with-gap" name="group1" type="radio" id="ldis1" />
                        <label htmlFor="ldis1">{object.nome}</label>
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
            <Collapsible defaultActiveKey={(this.props.classActive)?0:''}>
                <CollapsibleItem header={this.props.title}  >{/*icon='filter_drama' ${this.props.classActive} */} 
                    <div className="dir-alp-l3 dir-alp-l-com1 dir-alp-p3">
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

export default WidgetFilterRadioCollapsable;
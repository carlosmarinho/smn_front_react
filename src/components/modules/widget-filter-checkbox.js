import React, { Component } from 'react';


class WidgetFilterCheckbox extends Component {

    getImageSrc(object){
        if(object) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = object
            
            if(s3_imagem_destacada){
                return s3_imagem_destacada;
            }
            if(old_imagem_destacada) {
                if(old_imagem_destacada.includes('.amazonaws'))
                    return old_imagem_destacada;

                return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');
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
                        <input type="checkbox" id={`filter-check-${object.id}`} />
                        <label htmlFor={`filter-check-${object.id}`}>{object.nome}</label>
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
            <div className={`dir-alp-l3 dir-alp-l-com ${this.props.customClass}`} >
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
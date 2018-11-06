import React, { Component } from 'react';


class WidgetFilterRadio extends Component {

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
            <div className="dir-alp-l3 dir-alp-l-com">
                <h4>Filtro por Bairros</h4>
                <div className="dir-alp-l-com1 dir-alp-p3">
                    <form>
                        <ul>
                            {this.generateWidget(objects)}
                        </ul>
                    </form> <a href="#!" className="list-view-more-btn">ver mais</a> 
                </div>
            </div>
        );
    }
}

export default WidgetFilterRadio;
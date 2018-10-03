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
        console.log("object no left widget generateWidgetttttttttt: ", objects);
        if(objects.length>0){
            return objects.map(object => {
                return (
                    <li>
                        <a href="listing-details.html">
                            <div className="list-left-near lln1"> <img src={this.getImageSrc(object)} alt="" /> </div>
                            <div className="list-left-near lln2">
                                <h5>{object.titulo}</h5> 
                                <span>{object.cidade[0].nome} {(object.bairros.length>0)?', ' + object.bairros[0].nome: ''}</span> </div>
                            <div className="list-left-near lln3"> <span>5.0</span> </div>
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
            console.log("object no left widget: ", this.props.objects);
            objects = this.props.objects;
        }

        return (
            <div className="dir-alp-l3 dir-alp-l-com">
                <h4>Sub Category Filter</h4>
                <div className="dir-alp-l-com1 dir-alp-p3">
                    <form action="#">
                        <ul>
                            <li>
                                <input type="checkbox" id="scf1" />
                                <label htmlFor="scf1">Hortels & Resorts</label>
                            </li>
                            <li>
                                <input type="checkbox" id="scf2" />
                                <label htmlFor="scf2">Fitness Care</label>
                            </li>
                            <li>
                                <input type="checkbox" id="scf3" />
                                <label htmlFor="scf3">Educations</label>
                            </li>
                            <li>
                                <input type="checkbox" id="scf4" />
                                <label htmlFor="scf4">Property</label>
                            </li>
                            <li>
                                <input type="checkbox" id="scf5" />
                                <label htmlFor="scf5">Home Services</label>
                            </li>
                        </ul>
                    </form> <a href="#!" className="list-view-more-btn">view more</a> </div>
            </div>
        );
    }
}

export default WidgetFilterCheckbox;
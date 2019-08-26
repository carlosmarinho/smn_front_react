import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Collapsible, CollapsibleItem} from 'react-materialize';

import { fetchGuiasByCategoryId } from '../../actions/guia';


class WidgetFilterCheckboxCollapsable extends Component {

    state = {
        checked: [],
    }

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

    filterObject(e){
        this.props.fetchGuiasByCategoryId(e.target.value)
        //this.setState({checked: [...this.state.checked, e.target.value]})
        //console.log("aqui no filter object: ", this.state.checked);
    }

    generateWidget(objects) {
        if(objects.length>0){
            return objects.map((object, ind) => {
                return (
                    <li key={ind}>
                        <input type="checkbox" value={object.id} id={`filter-check-collap-${object.id}`} onChange={e => this.filterObject(e)} />
                        <label htmlFor={`filter-check-collap-${object.id}`} >{object.nome}</label>
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

const mapStateToProps = (state) => {
    return{
        guias: state.guias
    }
}

export default connect(mapStateToProps, { fetchGuiasByCategoryId })(WidgetFilterCheckboxCollapsable);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Collapsible, CollapsibleItem} from 'react-materialize';

import { fetchGuias, fetchGuiasByCategoryId } from '../../actions/guia';
import { fetchEventos, fetchEventosByCategoryId } from '../../actions/evento';
import { stat } from 'fs';


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

    filterGuia(id){
        if(! this.state.checked.includes(id)) {
            if(this.state.checked.length >= 1)
                this.props.fetchGuiasByCategoryId(id, this.props.guias.list);
            else
                this.props.fetchGuiasByCategoryId(id);
            this.setState({checked: [...this.state.checked, id]});
        }
        else{
            if(this.state.checked.length > 1){   
                this.props.fetchGuiasByCategoryId(0, this.props.guias.list.filter(guia => {
                    const cat = guia.categorias.find( categoria => categoria._id === id );
                    if(!cat)
                        return  guia;
                }
                ))
            }
            else{
                this.props.fetchGuias('5ba26f813a018f42215a36a0');
            }

            this.setState({
                checked: this.state.checked.filter(item => item != id)
            })
            
        }
        //this.setState({checked: [...this.state.checked, e.target.value]})
    }

    filterEvento(id){
        if(! this.state.checked.includes(id)) {
            if(this.state.checked.length >= 1)
                this.props.fetchEventosByCategoryId(id, this.props.eventos.list);
            else
                this.props.fetchEventosByCategoryId(id);
            this.setState({checked: [...this.state.checked, id]});
        }
        else{
            if(this.state.checked.length > 1){   
                this.props.fetchEventosByCategoryId(0, this.props.eventos.list.filter(evento => {
                    const cat = evento.categorias.find( categoria => categoria._id === id );
                    if(!cat)
                        return  evento;
                }
                ))
            }
            else{
                this.props.fetchEventos('5ba26f813a018f42215a36a0');
            }

            this.setState({
                checked: this.state.checked.filter(item => item != id)
            })
            
        }
        //this.setState({checked: [...this.state.checked, e.target.value]})
    }

    filterObject(e){
        switch(this.props.type){
            case 'guia':
                this.filterGuia(e.target.value)
            case 'evento':
                this.filterEvento(e.target.value)
        }
    }

    generateWidget(objects) {
        if(objects.length>0){
            return objects.map((object, ind) => {
                return (
                    <li key={ind}>
                        <input 
                            type="checkbox" 
                            value={object.id} 
                            id={`filter-check-collap-${object.id}`} 
                            onChange={e => this.filterObject(e)} 
                        />
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
        guias: state.guias,
        eventos: state.eventos
    }
}

export default connect(
    mapStateToProps, 
    { 
        fetchGuias, 
        fetchGuiasByCategoryId,
        fetchEventos, 
        fetchEventosByCategoryId  
    }
)(WidgetFilterCheckboxCollapsable);
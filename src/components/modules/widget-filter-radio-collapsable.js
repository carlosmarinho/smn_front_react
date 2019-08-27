import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Collapsible, CollapsibleItem} from 'react-materialize';

import { fetchGuias, fetchGuiasByCategoryId, fetchGuiasByBairroId } from '../../actions/guia';
import { fetchEventos, fetchEventosByCategoryId, fetchEventosByBairroId } from '../../actions/evento';
//@todo verify if this widget is still working with this line commented 
//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



class WidgetFilterRadioCollapsable extends Component {

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
                        <input 
                            className="with-gap" 
                            name="filter-group" 
                            type="radio" 
                            value={object.id} 
                            id={`filter-radio-colla-${object.id}`}
                            onChange={e => this.filterObject(e)}  
                        />
                        <label htmlFor={`filter-radio-colla-${object.id}`}>{object.nome}</label>
                    </li>
                )
            })
        }
        
    }

    filterGuia(id, filterType){
        if(! this.state.checked.includes(id)) {
            this.setState({checked: [...this.state.checked, id]});
            if(filterType == 'categoria')
                this.props.fetchGuiasByCategoryId(id);
            else if(filterType=='bairro')
                this.props.fetchGuiasByBairroId(id);
        }
    
        else{
            this.setState({
                checked: this.state.checked.filter(item => item != id)
            })
            //@todo buscar array de guias e não uma só
            this.props.fetchGuias('5ba26f813a018f42215a36a0');
        }
        //this.setState({checked: [...this.state.checked, e.target.value]})
    }

    filterEvento(id, filterType){
        if(! this.state.checked.includes(id)) {
            this.setState({checked: [...this.state.checked, id]});
            if(filterType == 'categoria')
                this.props.fetchEventosByCategoryId(id);
            else if(filterType=='bairro') 
                this.props.fetchEventosByBairroId(id);
        }else{
            this.setState({
                checked: this.state.checked.filter(item => item != id)
            })
            //@todo buscar array de guias e não uma só
            
            this.props.fetchEventos('5ba26f813a018f42215a36a0');
        }
        //this.setState({checked: [...this.state.checked, e.target.value]})
    }

    filterObject(e){
        console.log("filterobject no radio: ", e);
        switch(this.props.type){
            case 'guia':
                this.filterGuia(e.target.value, this.props.filterType)
            case 'evento':
                this.filterEvento(e.target.value, this.props.filterType)
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
        fetchGuiasByBairroId,
        fetchEventos, 
        fetchEventosByCategoryId,
        fetchEventosByBairroId
    }
)(WidgetFilterRadioCollapsable);
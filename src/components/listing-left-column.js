import React, { Component } from 'react';
import LeftWidgetLink from './modules/left-widget-link';
import WidgetFilterCheckbox from './modules/widget-filter-checkbox';
import WidgetFilterRadio from './modules/widget-filter-radio';
import WidgetFilterStars from './modules/widget-filter-stars';


class ListingLeftColumn extends Component {
    render(){
        console.log("categorias no listing left: ", this.props.bairros)

        return(
            <div className="col-md-3 dir-alp-con-left">
                <LeftWidgetLink title="Guias Recentes" objects={this.props.objects} />

                <WidgetFilterCheckbox title="Filtro de Categoria" objects={this.props.categories} />                

                <WidgetFilterRadio title="Filtro de Bairros" objects={this.props.bairros} />

                <WidgetFilterStars title="Filtro por opinião" />        

            </div>
            
        )
    }
}

export default ListingLeftColumn;
import React, { Component } from 'react';
import LeftWidgetLink from './modules/left-widget-link';
import WidgetFilterCheckbox from './modules/widget-filter-checkbox';
import WidgetFilterRadio from './modules/widget-filter-radio';
import WidgetFilterStars from './modules/widget-filter-stars';


class ListingLeftColumn extends Component {
    render(){
        return(
            <div className="col-md-3 dir-alp-con-left">
                <LeftWidgetLink customClass="hidden-xs hidden-sm" title="Guias Recentes" objects={this.props.objects} />

                <WidgetFilterCheckbox customClass="hidden-xs hidden-sm" title="Filtro de Categoria" objects={this.props.categories} />                

                <WidgetFilterRadio customClass="hidden-xs hidden-sm" title="Filtro de Bairros" objects={this.props.bairros} />

                <WidgetFilterStars customClass="hidden-xs hidden-sm" title="Filtro por avaliação" />        

            </div>
            
        )
    }
}

export default ListingLeftColumn;
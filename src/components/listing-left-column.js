import React, { Component } from 'react';
import LeftWidgetLink from './modules/left-widget-link';
/* import WidgetFilterCheckbox from './modules/widget-filter-checkbox';
import WidgetFilterRadio from './modules/widget-filter-radio';
import WidgetFilterStars from './modules/widget-filter-stars';
import LeftWidgetLinkCollapsable from './modules/left-widget-link-collapsable'; */
import WidgetFilterCheckboxCollapsable from './modules/widget-filter-checkbox-collapsable';
import WidgetFilterRadioCollapsable from './modules/widget-filter-radio-collapsable';
import WidgetFilterStarsCollapsable from './modules/widget-filter-stars-collapsable';
import windowSize from 'react-window-size';


class ListingLeftColumn extends Component {

    showFiltroBairro(activeColapse){
        if(! this.props.subdomain)
            return
                <WidgetFilterRadioCollapsable title="Filtro de Bairros" filterType="bairro" type={this.props.type} objects={this.props.bairros} classActive={activeColapse} />
    }

    render(){
        let activeColapse = false
        if(this.props.windowWidth > 992)
            activeColapse = true;

        return(
            <div className="col-md-3 dir-alp-con-left">

                <LeftWidgetLink customClass="hide-992" title="Guias Recentes" objects={this.props.objects} />
                
                <WidgetFilterCheckboxCollapsable title="Filtro de Categoria" filterType="categoria" type={this.props.type} objects={this.props.categories} classActive={activeColapse} />                
                {this.showFiltroBairro(activeColapse)}
                {/*@todo implementar esse filtro <WidgetFilterStarsCollapsable title="Filtro por avaliação" classActive={activeColapse} />*/}

            </div>
            
        )
    }
}

export default windowSize(ListingLeftColumn);
import React, { Component } from 'react';
import LeftWidgetLink from './modules/left-widget-link';
import WidgetFilterCheckbox from './modules/widget-filter-checkbox';
import WidgetFilterRadio from './modules/widget-filter-radio';
import WidgetFilterStars from './modules/widget-filter-stars';
import LeftWidgetLinkCollapsable from './modules/left-widget-link-collapsable';
import WidgetFilterCheckboxCollapsable from './modules/widget-filter-checkbox-collapsable';
import WidgetFilterRadioCollapsable from './modules/widget-filter-radio-collapsable';
import WidgetFilterStarsCollapsable from './modules/widget-filter-stars-collapsable';
import windowSize from 'react-window-size';


class ListingLeftColumn extends Component {

    

    render(){
        let activeColapse = ''
        if(this.props.windowWidth > 992)
            activeColapse = 'active';

        return(
            <div className="col-md-3 dir-alp-con-left">


                <LeftWidgetLink customClass="hide-992" title="Guias Recentes" objects={this.props.objects} />

                <ul className="collapsible" data-collapsible="accordion">
                    <WidgetFilterCheckboxCollapsable title="Filtro de Categoria" objects={this.props.categories} classActive={activeColapse} />                
                </ul>
                <ul className="collapsible" data-collapsible="accordion">    
                    <WidgetFilterRadioCollapsable title="Filtro de Bairros" objects={this.props.bairros} classActive={activeColapse} />
                </ul>
                <ul className="collapsible" data-collapsible="accordion">
                    <WidgetFilterStarsCollapsable title="Filtro por avaliação" classActive={activeColapse} />        
                </ul>



            </div>
            
        )
    }
}

export default windowSize(ListingLeftColumn);
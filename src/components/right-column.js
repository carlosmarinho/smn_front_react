import React, { Component } from 'react';
import RightWidgetLink from './modules/right-widget-link';
import WidgetFeatured from './modules/widget-featured';



class RightColumn extends Component {

    getWidgetForGuia(){
        if(this.props.guiaType ){
            return <WidgetFeatured title="Guias em Destaques" objects={this.props.guias.featured}/>
        }
        else{
            return <RightWidgetLink title="Guias em Destaques" objects={this.props.guias.featured} />
        }
    }

    render(){
        return(

            <div className="list-pg-rt">
                {this.getWidgetForGuia()}

                <RightWidgetLink title="Eventos Recentes" objects={this.props.eventos} type="eventos"/>

                <RightWidgetLink title="Guias Recentes" objects={this.props.guias.recentes} type="guia"/>
               
            </div>
        )
    }
}

export default RightColumn;
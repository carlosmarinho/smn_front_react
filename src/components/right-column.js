import React, { Component } from 'react';
import RightWidgetLink from './modules/right-widget-link';
import WidgetFeatured from './modules/widget-featured';



class RightColumn extends Component {
    render(){
        console.log("no right column: ", this.props.guias)
        return(

            <div className="list-pg-rt">
                <WidgetFeatured title="Guias em Destaques" objects={this.props.guias.featured}/>

                <RightWidgetLink title="Eventos Recentes" objects={this.props.eventos}/>

                <RightWidgetLink title="Guias Recentes" objects={this.props.guias.recentes} />
               
            </div>
        )
    }
}

export default RightColumn;
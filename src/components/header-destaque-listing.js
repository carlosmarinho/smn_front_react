import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class HeaderDestaqueListing extends Component {
    render(){
        let title = "Cidade de Niterói";
        if(this.props.title)
            title = this.props.title + " - " + title;
        return(
            <div>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/guia-comercial" />
                </Helmet>
            </div>
            
        )
    }
}

export default HeaderDestaqueListing;
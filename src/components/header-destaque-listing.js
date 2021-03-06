import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class HeaderDestaqueListing extends Component {
    render(){
        let title = "Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " | " + title;
        return(
            <div>
               <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/guia/" />
                </Helmet>
            </div>
            
        )
    }
}

export default HeaderDestaqueListing;
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import GoogleAds from './modules/google-ads';

class HeaderDestaqueBlog extends Component {
    render(){
        let title = "Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " | " + title;

        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/noticias/" />
                </Helmet>
                <section className="inn-page-bg">
                    <div className="container">
                        <div className="row">
                            <div className="inn-pag-ban">
                                <h2>{this.props.title}</h2>
                                <h5>{this.props.subtitle}</h5> 
                            </div>
                        </div>
                    </div>
                </section>
                <GoogleAds />
            </div>
        )
    }
}

export default HeaderDestaqueBlog;
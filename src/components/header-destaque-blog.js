import _ from 'lodash';
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import GoogleAds from './modules/google-ads';
import MetaTags from 'react-meta-tags';

class HeaderDestaqueBlog extends Component {


    render(){
        let truncate = _.truncate;
        let title = "Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " | " + title;
        

        let description = '';
        if(this.props.description)
            description = truncate(this.props.description.replace(/<\/?[^>]+(>|$)/g, ""), { length: 100, separator: /,?\.* +/ })
        
        console.log("description: .... ", this.props.description)

        let image = '';
        if(this.props.image)
            image = this.props.image

        return(
            <div>
                <MetaTags>
                    <title>Page 1</title>
                    <meta property="og:image" content={image} />
                    <meta property="og:url" content={this.props.url} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                </MetaTags>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>

                    
                    
                    <link rel="canonical" href={this.props.url} />
                    
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
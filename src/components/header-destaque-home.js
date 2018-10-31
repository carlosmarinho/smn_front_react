import React, { Component } from 'react';
import Helmet from 'react-helmet';

class HeaderDestaqueHome extends Component {
    render(){
        let title = "Site da cidade de Niterói - Soumaisniterói";
        if(this.props.title)
            title = this.props.title + " | " + title;
        return(
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{title}</title>
                    <link rel="canonical" href="http://soumaisniteroi.com.br/" />
                </Helmet>
                <section id="background1" className="dir1-home-head" style={{height:550}}>
                    <div className="container dir-ho-t-sp">
                        <div className="row">
                            <div className="dir-hr1">
                                <div className="dir-ho-t-tit dir-ho-t-tit-2">
                                    <h1>O melhor da cidade de Niterói!</h1> 
                                </div>
                                    <form className="tourz-search-form">
                                        <div className="input-field">
                                            <input type="text" id="select-city" className="autocomplete" />
                                            <label htmlFor="select-city">Digite a cidade</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="text" id="select-search" className="autocomplete" />
                                            <label htmlFor="select-search" className="search-hotel-type">Busca</label>
                                        </div>
                                        <div className="input-field">
                                            <input type="submit" value="search" className="waves-effect waves-light tourz-sear-btn" /> 
                                        </div>
                                    </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default HeaderDestaqueHome;
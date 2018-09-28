import React, { Component } from 'react';

class HeaderDestaqueHome extends Component {
    render(){
        return(
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
        )
    }
}

export default HeaderDestaqueHome;
import React, { Component } from 'react';

class HeaderDestaque extends Component {
    render(){
        return(
            <div className="container dir-ho-t-sp">
                <div className="row">
                    <div className="dir-hr1">
                        <div className="dir-ho-t-tit dir-ho-t-tit-2">
                            <h1>Connect with the right Service Experts</h1> 
                            <p>Find B2B & B2C businesses contact addresses, phone numbers,<br /> user ratings and reviews.</p>
                        </div>
                            <form className="tourz-search-form">
                                <div className="input-field">
                                    <input type="text" id="select-city" className="autocomplete" />
                                    <label htmlFor="select-city">Enter city</label>
                                </div>
                                <div className="input-field">
                                    <input type="text" id="select-search" className="autocomplete" />
                                    <label htmlFor="select-search" className="search-hotel-type">Search your services like hotel, resorts, events and more</label>
                                </div>
                                <div className="input-field">
                                    <input type="submit" value="search" className="waves-effect waves-light tourz-sear-btn" /> 
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderDestaque;
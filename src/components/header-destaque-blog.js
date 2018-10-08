import React, { Component } from 'react';

class HeaderDestaqueBlog extends Component {
    render(){

        return(
            <section className="inn-page-bg">
                <div className="container">
                    <div className="row">
                        <div className="inn-pag-ban">
                            <h2>{this.props.title}</h2>
                            <h5>{this.props.subtitle}</h5> </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default HeaderDestaqueBlog;
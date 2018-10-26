import React, { Component } from 'react';
import Menu from './menu';
import MenuMobile from './menu-mobile';


class Header extends Component {

    constructor() {
        super();
        this.getHeader = this.getHeader.bind(this);
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    getHeader(){
        console.log("header: ", this.props)
        return(this.props.routes);
        //return <HeaderDestaqueBlog />
    }

    render(){

        return(
            <div>
                {/*<!--PRE LOADING--> */}
                <div id="preloader">
                    <div id="status">&nbsp;</div>
                </div>
                <section>
                    <Menu />
                </section>
                <section>
                    <MenuMobile /> 
                </section>
            </div>
        )
    }
}

export default Header;
import React, { Component } from 'react';
import Menu from './menu';
import MenuMobile from './menu_mobile';
import HeaderDestaqueHome from './header_destaque_home';
import HeaderDestaqueBlog from './header_destaque_blog';

class Header extends Component {

    constructor() {
        super();
        this.getHeader = this.getHeader.bind(this);
    }

    getHeader(){
        console.log("header: ", this.props)
        return(this.props.routes);
        //return <HeaderDestaqueBlog />
    }

    render(){
        console.log("header render: ", this.props.routes)

        return(
            <div>
                {/*<!--PRE LOADING--> */}
                {/*<div id="preloader">
                    <div id="status">&nbsp;</div>
                </div>*/}
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
import React, { Component } from 'react';
import Menu from './menu';
import MenuMobile from './menu_mobile';
import HeaderDestaque from './header_destaque';

class Header extends Component {
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
                <section id="background1" className="dir1-home-head">
                    <HeaderDestaque />
                </section>

            </div>
        )
    }
}

export default Header;
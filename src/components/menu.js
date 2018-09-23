import React, { Component } from 'react';


class Menu extends Component {
    render(){
        return(
            <div className="v3-top-menu">
                <div className="container">
                    <div className="row">
                        <div className="v3-menu">
                            <div className="v3-m-1">
                                <a href="index-1.html"><img src="images/logo-soumaisniteroi.png" alt="" /> </a>
                            </div>
                            <div className="v3-m-2">
                                <ul>
                                    <li><a className='dropdown-button' href='/' data-activates='drop-menu-home'>Home</a>
                                    </li>
                                    <li><a className='dropdown-button ed-sub-menu' href='/a-cidade' data-activates='drop-menu-cidade'>A Cidade</a>
                                    </li>
                                    <li><a className='dropdown-button ed-sub-menu' href='/guias' data-activates='drop-mega-dash'>Guias</a>
                                    </li>
                                    <li><a className='dropdown-button ed-sub-menu' href='/eventos' data-activates='drop-mega-dash'>Eventos</a>
                                    </li>
                                    <li><a className='dropdown-button ed-sub-menu' href='/noticias' data-activates='drop-menu-page'>Notícias</a>
                                    </li>
                                    <li><a className='dropdown-button ed-sub-menu' href='/contato' data-activates='drop-menu-admin'>Contato</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="v3-m-3">
                                <div className="v3-top-ri">
                                    <ul>
                                        <li><a href="login.html" className="v3-menu-sign"><i className="fa fa-sign-in"></i> Sign In</a> </li>
                                        <li><a href="db-listing-add.html" className="v3-add-bus"><i className="fa fa-plus" aria-hidden="true"></i> Add Listing</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="all-drop-down-menu">
                            <ul id='drop-menu-cidade' className='dropdown-content'>
                                <li><a href="index-1.html">Bairros</a></li>
                                <li className="divider"></li>
                                <li><a href="index-2.html">Fotos da Cidade</a></li>
                                <li className="divider"></li>
                                <li><a href="index-3.html">História da Cidade</a></li>
                            </ul>
                            <ul id='email-temp' className='dropdown-content'>
                                <li><a href="email-template-register.html" target="_blank">Register</a> </li>
                                <li><a href="email-template-invoice.html" target="_blank">Invoice</a> </li>
                                <li><a href="email-listing-submited.html" target="_blank">Listing Submit</a> </li>
                                <li><a href="email-subscribe.html" target="_blank">Subscripe</a> </li>
                                <li><a href="email-template-email-verification.html" target="_blank">Email Verification</a> </li>
                                <li><a href="email-template-forgot-pass.html" target="_blank">Forgot Password</a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
                
        )
    }
}

export default Menu;
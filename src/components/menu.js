import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Menu extends Component {
    render(){
        return(
            <div className="v3-top-menu">
                <div className="container">
                    <div className="row">
                        <div className="v3-menu">
                            <div className="v3-m-1">
                                {/*<Link  data-activates='drop-menu-home' to="/"><img src="/images/logo-soumaisniteroi.png" alt="" /></Link>*/}
                                <a href="/"><img src="http://soumaisniteroi.com.br/wp-content/uploads/2015/08/logo-soumaisniteroi-transp-.png" alt="" /></a>
                            </div>
                            <div className="v3-m-2">
                                <ul>
                                    <li>
                                        <Link  data-activates='drop-menu-home' to="/">Home</Link>
                                    </li>
                                    <li>
                                        {/*<a className='dropdown-button ed-sub-menu' href='/a-cidade' data-activates='drop-menu-cidade'>A Cidade</a>*/}
                                        <Link className='dropdown-button ed-sub-menu' data-activates='drop-menu-cidade' to="/a-cidade">Cidade</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-button ed-sub-menu' data-activates='drop-menu-guia' to="/guia-comercial">Guia</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-button' to="/eventos">Eventos</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-button ed-sub-menu' data-activates='drop-menu-noticias' to="/noticias">Noticias</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-button' to="/contato">Contato</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="v3-m-3">
                                <div className="v3-top-ri">
                                    <ul>
                                        <li>
                                            <Link className='v3-add-bus' to="/login"><i className="fa fa-sign-in"></i> Login</Link>  
                                        </li>
                                        <li>
                                            <Link className='v3-add-bus' to="/cadastro"><i className="fa fa-plus" aria-hidden="true"></i> Cadastro</Link> 
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="all-drop-down-menu">
                            <ul id='drop-menu-cidade' className='dropdown-content'>
                                <li><Link to="bairros-de-niteroi">Bairros</Link></li>
                                <li className="divider"></li>
                                <li><Link to="fotos-da-cidade-de-niteroi">Fotos da Cidade</Link></li>
                                <li className="divider"></li>
                                <li><Link to="historia-da-cidade-de-niteroi">História da Cidade</Link></li>
                                <li className="divider"></li>
                                <li><Link to="populacao-da-cidade-de-niteroi">População da Cidade</Link></li>
                            </ul>
                            <ul id='drop-menu-guia' className='dropdown-content'>
                                <li><Link className='dropdown-button' to="/guia-comercial/type/comercial">Guia Comercial</Link></li>
                                <li><Link className='dropdown-button' to="/guia-comercial/type/servicos">Guia Servicos</Link></li>
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
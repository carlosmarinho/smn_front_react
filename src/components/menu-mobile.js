import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuMobile extends Component {
    render(){
        return(
            <div>
                <div className="v3-mob-top-menu">
                    <div className="container">
                        <div className="row">
                            <div className="v3-mob-menu">
                                <div className="v3-mob-m-1">
                                    <Link to={'/'}><img src="/images/logo-soumaisniteroi.png" alt="" /> </Link>
                                </div>
                                <div className="v3-mob-m-2">
                                    <div className="v3-top-ri">
                                        <ul>
                                            <li><a href="login.html" className="v3-menu-sign"><i className="fa fa-sign-in"></i> Login</a> </li>
                                            <li><a href="price.html" className="v3-add-bus"><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar Guia</a> </li>
                                            <li><a href="#menu@todo" className="ts-menu-5" id="v3-mob-menu-btn"><i className="fa fa-bars" aria-hidden="true"></i>Menu</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mob-right-nav" data-wow-duration="0.5s">
                    <div className="mob-right-nav-close"><i className="fa fa-times" aria-hidden="true"></i> </div>
                    <h5>Cidade</h5>
                    <ul className="mob-menu-icon">
                        <li><Link to="/cidade/bairros-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>Bairros</Link></li>
                        <li><Link to="/cidade/fotos-cidade-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>Fotos da Cidade</Link></li>
                        <li><Link to="/cidade/historia-da-cidade-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>História da Cidade</Link></li>
                        <li><Link to="/cidade/populacao-da-cidade-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>População da Cidade</Link></li>
                    </ul>
                    <h5>Guia</h5>
                    <ul className="mob-menu-icon">
                        <li><Link className='dropdown-button' to="/guia/comercial"><i className="fa fa-angle-right" aria-hidden="true"></i>Guia Comercial</Link></li>
                        <li><Link className='dropdown-button' to="/guia/servicos"><i className="fa fa-angle-right" aria-hidden="true"></i>Guia Servicos</Link></li>
                    </ul>
                    <h5><Link to="/eventos">Eventos</Link></h5>
                    <h5><Link to="/noticias">Notícias</Link></h5>
                    <h5><Link to="/contato">Contato</Link></h5>
                </div>
            </div>
        )
    }
}

export default MenuMobile;
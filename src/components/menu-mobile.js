import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MenuMobile extends Component {

    constructor(){
        super();

        this.state = {
            visibility: true,
            userLogged: null
        }

        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        if(user){
            this.setState({userLogged: JSON.parse(user).user})
        }
        
    }

    /*@todo retirar os efeitos jquery*/
    closeMenu(e){
        this.setState({visibility: false})
    }

    openMenu(e){
        this.setState({visibility: true})
    }

    showDashboard(){
        if(this.state.userLogged){
            return(
                <div>
                    <h5><Link className="menu-close" to="/dashboard">Dashboard</Link></h5>
                    <ul className="mob-menu-icon">
                        <li><Link className="menu-close" to="/dashboard/guias"><i className="fa fa-angle-right" aria-hidden="true"></i>Meus Guias</Link></li>
                        <li><Link className="menu-close" to="/dashboard/eventos"><i className="fa fa-angle-right" aria-hidden="true"></i>Meus Eventos</Link></li>
                        <li><Link className="menu-close" to="/dashboard/noticias"><i className="fa fa-angle-right" aria-hidden="true"></i>Minhas Notícias</Link></li>
                        <li><Link className="menu-close" to="/dashboard/comentarios"><i className="fa fa-angle-right" aria-hidden="true"></i>Meus comentários</Link></li>
                        <li><Link className="menu-close" to="/dashboard/profile"><i className="fa fa-angle-right" aria-hidden="true"></i>Meus Dados</Link></li>
                        <li><Link className="menu-close" to="/" onClick={(e) => this.loggout(e)}><i className="fa fa-angle-right" aria-hidden="true"></i>Sair</Link></li>
                    </ul>
                </div>
            )
        }
        else{
            return(
                <div>
                    <h5><Link className="menu-close" to="/login">Login</Link></h5>
                    <h5><Link className="menu-close" to="/login">Cadastro</Link></h5>
                </div>
            )
        }

    }

    showBairrosMenu(){
        const {subdomain} = this.props;
        if(! subdomain) {
            return(
                <ul className="mob-menu-icon">
                    <li><Link className="menu-close" to="/cidade/bairros-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>Bairros</Link></li>
                    <li><Link className="menu-close" to="/cidade/fotos-cidade-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>Fotos da Cidade</Link></li>
                    <li><Link className="menu-close" to="/cidade/historia-da-cidade-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>História da Cidade</Link></li>
                    <li><Link className="menu-close" to="/cidade/populacao-da-cidade-de-niteroi"><i className="fa fa-angle-right" aria-hidden="true"></i>População da Cidade</Link></li>
                </ul>
            )
        }
        else {
            return(
                <ul className="mob-menu-icon">
                    <li><Link className="menu-close" to={`/bairro/fotos-cidade-${subdomain}`}><i className="fa fa-angle-right" aria-hidden="true"></i>Fotos do Bairro</Link></li>
                    <li><Link className="menu-close" to={`/bairro/historia-do-bairro-${subdomain}`}><i className="fa fa-angle-right" aria-hidden="true"></i>História do Bairro</Link></li>
                    <li><Link className="menu-close" to={`/bairro/populacao-do-bairro-${subdomain}`}><i className="fa fa-angle-right" aria-hidden="true"></i>População do Bairro</Link></li>
                </ul>
            )
        }
    }

    menu(){
        let {subdomain} = this.props
        if(this.state.visibility)
        {
            return(
                <div className="mob-right-nav" id="mobile-menu" data-wow-duration="0.5s">

                    <div className="mob-right-nav-close"><i className="fa fa-times" aria-hidden="true"></i> </div>
                    {this.showDashboard()}
                    <h5><Link className="menu-close" to={subdomain?'/bairro':'/cidade'}>{subdomain?'Bairro':'Cidade'}</Link></h5>
                        {this.showBairrosMenu()}    
                    <h5><Link  className="menu-close" to="/guia" /*@todo takeaway jquery onClick={this.closeMenu}*/>Guia</Link></h5>
                    <ul className="mob-menu-icon">
                        <li><Link className='dropdown-button menu-close' to="/guia/comercial"><i className="fa fa-angle-right" aria-hidden="true"></i>Guia Comercial</Link></li>
                        <li><Link className='dropdown-button menu-close' to="/guia/servicos"><i className="fa fa-angle-right" aria-hidden="true"></i>Guia Servicos</Link></li>
                    </ul>
                    <h5><Link className="menu-close" to="/eventos">Eventos</Link></h5>
                    <h5><Link className="menu-close" to="/noticias">Notícias</Link></h5>
                    <h5><Link className="menu-close" to="/contato">Contato</Link></h5>
                </div>
            )
        }
        
    }


    showMenuLogado(){
        if(this.state.userLogged){
            return(
                <div>
                    <li><Link className="v3-menu-sign" to="/dashboard"><i className="fa fa-sign-in"></i> Dashboard</Link> </li>
                    <li><Link className="v3-add-bus" to="/dashboard/guias/novo"><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar Guia</Link> </li>
                </div>
            )
        }
        else{
            return(
                <div>

                    <li><Link className="v3-menu-sign" to="/login"><i className="fa fa-sign-in"></i> Login</Link> </li>
                    <li><Link className="v3-add-bus" to="/cadastro"><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar-me</Link> </li>
                </div>
            )
        }
    }

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
                                            <li><Link className="v3-menu-sign" to={this.state.userLogged?'/dashboard':'login'}><i className="fa fa-sign-in"></i> {this.state.userLogged?'Minha Conta':'Login'}</Link> </li>
                                            <li><Link className="v3-add-bus" to={this.state.userLogged?'/dashboard/guias/novo':'/cadastro'}><i className="fa fa-plus" aria-hidden="true"></i> {this.state.userLogged?'Cadastrar Guia':'Cadastrar'}</Link> </li>
                                            <li><a href="#menu" className="ts-menu-5" id="v3-mob-menu-btn" /*onClick={@todo take away jquery this.openMenu}*/><i className="fa fa-bars" aria-hidden="true"></i>Menu</a> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.menu()}        
            </div>
        )
    }
}

export default MenuMobile;
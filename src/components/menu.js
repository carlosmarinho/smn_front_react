import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';

class Menu extends Component {

    constructor() {
        super();
        this.state = {
            userLogged: null
        }
    }

    componentDidMount() {
        let user = localStorage.getItem('user');
        //console.log("usuario no menuuuuu: ", this.propsuser);
        if(user){
            this.setState({userLogged: JSON.parse(user).user})
        }
        
    }

    loggout(e){
        //e.preventDefault();
        console.log("\n\n removendo o storage no loggout \n\n")
        this.setState({userLogged: null});
        localStorage.removeItem('user');
        //return "/"
    }

    userBar(){
        if(!this.state.userLogged){
            return this.notLoggedUserBar();   
        }
        else{
            return this.loggedUserBar();
        }
    }

    notLoggedUserBar(){
        return(
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
        );
    }

    loggedUserBar(){
        return(

            /*<!--== MY ACCCOUNT ==-->*/
            <div className="v3-m-4">
                    {/*<!-- Dropdown Trigger -->*/}
                    <Link to="/dashboard" className='dropdown-button top-user-pro-v3' href='#' data-activates='top-menu'><img src="/images/users/user-default-32x32.png" alt="" />Minha Conta <i className="fa fa-angle-down" aria-hidden="true"></i> </Link>
            </div>
            
        )
    }

    render(){
        
        if(this.state.userLogged == null && this.props.user && this.props.user.user){
            this.setState({userLogged: this.props.user}) 
        }

        let logoSrc = 'http://images.soumaisniteroi.com.br/wp-content/uploads/2015/08/logo-soumaisniteroi-transp-.png'
        if(process.env.REACT_APP_DEV)
            logoSrc='';


        return(
            <div className="v3-top-menu">
                <div className="container">
                    <div className="row">
                        <div className="v3-menu">
                            <div className="v3-m-1">
                                {/*<Link  data-activates='drop-menu-home' to="/"><img src="/images/logo-soumaisniteroi.png" alt="" /></Link>*/}
                                <a href="/"><img src={logoSrc} alt="" /></a>
                            </div>
                            <div className="v3-m-2">
                                <ul>
                                    <li>
                                        <Link  data-activates='drop-menu-home' to="/">Home</Link>
                                    </li>
                                    <li>
                                        {/*<a className='dropdown-button ed-sub-menu' href='/a-cidade' data-activates='drop-menu-cidade'>A Cidade</a>*/}
                                        <Link className='dropdown-button ed-sub-menu' data-activates='drop-menu-cidade' to="/cidade">Cidade</Link>
                                    </li>
                                    <li>
                                        <Link className='dropdown-button ed-sub-menu' data-activates='drop-menu-guia' to="/guia">Guia</Link>
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
                            {this.userBar()}
                        </div>
                        <div className="all-drop-down-menu">
                            <ul id='drop-menu-cidade' className='dropdown-content'>
                                <li><Link to="/cidade/bairros-de-niteroi">Bairros</Link></li>
                                <li className="divider"></li>
                                <li><Link to="/cidade/fotos-cidade-niteroi">Fotos da Cidade</Link></li>
                                <li className="divider"></li>
                                <li><Link to="/cidade/historia-da-cidade-de-niteroi">História da Cidade</Link></li>
                                <li className="divider"></li>
                                <li><Link to="/cidade/populacao-da-cidade-de-niteroi">População da Cidade</Link></li>
                            </ul>
                            <ul id='drop-menu-guia' className='dropdown-content'>
                                <li><Link className='dropdown-button' to="/guia/comercial">Guia Comercial</Link></li>
                                <li><Link className='dropdown-button' to="/guia/servicos">Guia Servicos</Link></li>
                            </ul>
                            <ul id='drop-menu-noticias' className='dropdown-content'>
                                <li><Link className='dropdown-button' to="/noticias/categoria/cidade-de-niteroi">Notícias da Cidade de Niterói</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/estado-do-rio-de-janeiro">Notícias do Estado do Rio de Janeiro</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/esportes">Notícias de Esportes</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/cultura">Cultura</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/economia">Notícias sobre Econômia</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/educacao">Notícias sobre Educação</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/entretenimento">Notícias de Entretenimento</Link></li>
                                <li><Link className='dropdown-button' to="/noticias/categoria/gastronomia">Notícias de Gastrônomia</Link></li>
                            </ul>
                            <ul id='email-temp' className='dropdown-content'>
                                <li><a href="email-template-register.html" target="_blank">Register</a> </li>
                                <li><a href="email-template-invoice.html" target="_blank">Invoice</a> </li>
                                <li><a href="email-listing-submited.html" target="_blank">Listing Submit</a> </li>
                                <li><a href="email-subscribe.html" target="_blank">Subscripe</a> </li>
                                <li><a href="email-template-email-verification.html" target="_blank">Email Verification</a> </li>
                                <li><a href="email-template-forgot-pass.html" target="_blank">Forgot Password</a> </li>
                            </ul>
                            {/*<!-- Dropdown Structure -->*/}
                            <ul id='top-menu' className='dropdown-content top-menu-sty'>
                                {/*<li><a href="admin-setting.html" className="waves-effect"><i className="fa fa-cogs"></i>Admin Setting</a> </li>
                                <li><a href="admin-analytics.html"><i className="fa fa-bar-chart"></i> Analytics</a> </li>
                                <li><a href="admin-ads.html"><i className="fa fa-buysellads" aria-hidden="true"></i>Ads</a> </li>
                                <li><a href="admin-payment.html"><i className="fa fa-usd" aria-hidden="true"></i> Payments</a> </li>
                                <li><a href="admin-notifications.html"><i className="fa fa-bell-o"></i>Notifications</a> </li>
                                <li><a href="#" className="waves-effect"><i className="fa fa-undo" aria-hidden="true"></i> Backup Data</a> </li>*/}
                                <li><Link to="/dashboard" className="waves-effect"><i className="fa fa-tachometer" aria-hidden="true"></i> Dashboard</Link> </li>
                                <li><Link to="/dashboard/profile" className="waves-effect"><i className="fa fa-user" aria-hidden="true"></i> Meus Dados</Link> </li>
                                <li><Link to="/dashboard/guias" className="waves-effect"><i className="fa fa-list-ul" aria-hidden="true"></i> Meus Guias</Link> </li>
                                <li><Link to="/dashboard/eventos" className="waves-effect"><i className="fa fa-calendar" aria-hidden="true"></i> Meus Eventos</Link> </li>
                                <li><Link to="/dashboard/noticias" className="waves-effect"><i className="fa fa-rss" aria-hidden="true"></i> Minhas Notícias</Link> </li>
                                <li><Link to="/dashboard/comentarios" className="waves-effect"><i className="fa fa-comment" aria-hidden="true"></i> Meus Comentários</Link> </li>
                                <li className="divider"></li>
                                <li><Link to="/" onClick={(e) => this.loggout(e)} className="ho-dr-con-last waves-effect"><i className="fa fa-sign-in" aria-hidden="true"></i> Logout</Link> </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
                
        )
    }
}


function mapStateToProps(state){
    return(
        {
            user: state.users
        }
    )
    
}

export default connect(mapStateToProps, {})(Menu);
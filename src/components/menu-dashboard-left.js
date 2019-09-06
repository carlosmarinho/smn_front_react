import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';


class MenuDashboardLeft extends Component{

    

    getImageSrc(){
        const { user } = this.props;

        if(user && user.imagem_perfil){
            return user.imagem_perfil.url;
		}
		
        return "/images/users/user-default-160x160.png";
    }

    showMenuComentario(){
        const { user } = this.props;

        if(user && user.role && user.role.name === 'Administrator') {
            return(
                <div>
                    <li>
                        <Link to="/dashboard/comentarioguia" className={(this.props.location.pathname == '/dashboard/comentarioguia') ? 'tz-lma' : ''} ><img src="images/icon/dbl14.png" alt="" />Comentários Guia</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/comentarioevento" className={(this.props.location.pathname == '/dashboard/comentarioevento') ? 'tz-lma' : ''} ><img src="images/icon/dbl14.png" alt="" />Comentários Evento</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/comentarionoticia" className={(this.props.location.pathname == '/dashboard/comentarionoticia') ? 'tz-lma' : ''} ><img src="images/icon/dbl14.png" alt="" />Comentários Notícia</Link>
                    </li>
                </div>
            )
        }
    }

    render(){
        console.log(this.props.location.pathname);

        return(
            <div className="tz-l">
            <div className="tz-l-1">
                <ul>
                    {/* @todo mudar para imagem quadrada */}
                    <li><img src={this.getImageSrc()} alt="" /> </li>
                    {/* @todo do calculation of profile
                    <li><span>80%</span> profile compl</li>
                    <li><span>18</span> Notifications</li>
                    */}
                </ul>
            </div>
            <div className="tz-l-2">
            <ul>
                <li>
                    <Link to="/dashboard" className={(this.props.location.pathname == '/dashboard') ? 'tz-lma' : ''}><i className="fa fa-tachometer"></i> Minha Dashboard</Link>
                </li>
                <li>
                    <Link to="/dashboard/guias" className={(this.props.location.pathname == '/dashboard/guias') ? 'tz-lma' : ''}><i className="map marker alternate icon"></i> Meus Guias</Link>
                </li>
                <li>
                    <Link to="/dashboard/guias/novo" className={(this.props.location.pathname == '/dashboard/guias/novo') ? 'tz-lma' : ''}><i className="plus icon"></i><i className="map marker alternate icon"></i> Adicionar Guia</Link>
                </li>
                <li>
                    <Link to="/dashboard/eventos" className={(this.props.location.pathname == '/dashboard/evento') ? 'tz-lma' : ''}><i className="calendar alternate outline icon"></i> Eventos</Link>
                </li>
                <li>
                    <Link to="/dashboard/eventos/novo" className={(this.props.location.pathname == '/dashboard/eventos/novo') ? 'tz-lma' : ''} ><i className="plus icon"></i><i className="calendar alternate outline icon"></i> Adicionar Evento</Link>
                </li>
                <li>
                    <Link to="/dashboard/noticias" className={(this.props.location.pathname == '/dashboard/noticias') ? 'tz-lma' : ''} ><i className="newspaper outline icon"></i> Noticias</Link>
                </li>
                <li>
                    <Link to="/dashboard/noticias/novo" className={(this.props.location.pathname == '/dashboard/noticias/novo') ? 'tz-lma' : ''}><i className="plus icon"></i><i className="newspaper outline icon"></i> Adicionar Notícias</Link>
                </li>
                {/*@todo fazer minhas revies e meus comentários 
                <li>
                    <Link to="/dashboard" ><img src="images/icon/dbl14.png" alt="" /> Minhas Reviews</Link>
                </li>*/}
                {this.showMenuComentario()}
                
                
                <li>
                    <Link to="/dashboard/profile" className={(this.props.location.pathname == '/dashboard/profile') ? 'tz-lma' : ''} ><i className="address card outline icon"></i> Meus Dados</Link>
                </li>
                {/*@todo pagamentos e settings 
                <li>
                    <a href="db-post-ads.html"><img src="images/icon/dbl11.png" alt="" /> Ad Summary</a>
                </li>
                <li>
                    <a href="db-payment.html"><img src="images/icon/dbl9.png" alt="" /> Check Out</a>
                </li>
                <li>
                    <a href="db-invoice-all.html"><img src="images/icon/db21.png" alt="" /> Invoice</a>
                </li>						
                <li>
                    <a href="db-claim.html"><img src="images/icon/dbl7.png" alt="" /> Claim & Refund</a>
                </li>
                <li>
                    <a href="db-setting.html"><img src="images/icon/dbl210.png" alt="" /> Setting</a>
                </li>*/}
                <li>
                    <Link to="/" onClick={(e) => this.loggout(e)}><i className="sign-out icon"></i> Logout</Link>
                </li>
            </ul>
            </div>
            </div>
        );
    }

}

export default withRouter(MenuDashboardLeft)
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class MenuDashboardLeft extends Component{

    render(){
        return(
            <div className="tz-l">
            <div className="tz-l-1">
                <ul>
                    {/* @todo mudar para imagem quadrada */}
                    <li><img src="/images/users/user-default-160x160.png" alt="" /> </li>
                    {/* @todo do calculation of profile
                    <li><span>80%</span> profile compl</li>
                    <li><span>18</span> Notifications</li>
                    */}
                </ul>
            </div>
            <div className="tz-l-2">
            <ul>
                <li>
                    <Link to="/dashboard" className="tz-lma"><img src="/images/icon/dbl1.png" alt="" /> Minha Dashboard</Link>
                </li>
                <li>
                    <Link to="/dashboard/guias" ><img src="/images/icon/dbl2.png" alt="" /> Meus Guias</Link>
                </li>
                <li>
                    <Link to="/dashboard/guias/novo" ><img src="/images/icon/dbl3.png" alt="" /> Adicionar Guia</Link>
                </li>
                <li>
                    <Link to="/dashboard/eventos" ><img src="/images/icon/dbl14.png" alt="" /> Eventos</Link>
                </li>
                <li>
                    <Link to="/dashboard/eventos/novo" ><img src="/images/icon/dbl3.png" alt="" /> Adicionar Evento</Link>
                </li>
                <li>
                    <Link to="/dashboard/noticias" ><img src="/images/icon/dbl14.png" alt="" /> Noticias</Link>
                </li>
                <li>
                    <Link to="/dashboard/noticias/novo" ><img src="/images/icon/dbl3.png" alt="" /> Adicionar Notícias</Link>
                </li>
                {/*@todo fazer minhas revies e meus comentários 
                <li>
                    <Link to="/dashboard" ><img src="images/icon/dbl14.png" alt="" /> Minhas Reviews</Link>
                </li>
                <li>
                    <Link to="/dashboard" ><img src="images/icon/dbl14.png" alt="" /> Meus Comentários</Link>
                </li>
                */}
                <li>
                    <Link to="/dashboard" ><img src="images/icon/dbl6.png" alt="" /> Meus Dados</Link>
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
                    <Link to="/" onClick={(e) => this.loggout(e)}><img src="images/icon/dbl12.png" alt="" /> Logout</Link>
                </li>
            </ul>
            </div>
            </div>
        );
    }

}

export default MenuDashboardLeft
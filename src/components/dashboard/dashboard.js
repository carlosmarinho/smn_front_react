import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {fetchGuiasByUser, fetchGuiasByAdm} from '../../actions/guia';
import {fetchEventosByUser, fetchEventosByAdm} from '../../actions/evento';
import {fetchNoticiasByUser, fetchNoticiasByAdm} from '../../actions/noticia';


class Dashboard extends Component{

    constructor(){
        super();

        this.state = {userLogged:null}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        console.log("user aqui no dashboard: ", user);

        if(user !== null){
            this.setState({userLogged:true})
            if(user.user.role.name == 'Administrator'){
                this.props.fetchGuiasByAdm(7);
                this.props.fetchEventosByAdm(7);
                this.props.fetchNoticiasByAdm(7);
            }
            else{
                this.props.fetchGuiasByUser(user.user._id, 5);
                this.props.fetchEventosByUser(user.user._id, 5);
                this.props.fetchNoticiasByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    showGuias(){
        if(this.props.guias && this.props.guias.fromUser){
            return this.props.guias.fromUser.map( guia => {
                
                return(
                    <tr key={guia.id}>
                        <td className="td-imagem"><img src={this.getImageSrc(guia)} alt="" /></td>
                        <td>{guia.titulo}</td>
                        <td>{this.datePtBr(new Date(guia.createdAt))}</td>
                        <td><span className="db-list-rat">{guia.tipo}</span>
                        </td>
                        <td><span className={(guia.status === false)?'db-list-ststus-na':'db-list-ststus'}>{(guia.status === false)?'Inativo':'Ativo'}</span>
                        </td>
                        <td className="table-information">
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/guia/' + guia.slug}  ><i className="fa fa-eye" title="view"></i></Link>
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-trash" title="delete"></i></Link>
                        </td>
                    </tr>
                )
                
            })
        }
    }
    
    showEventos(){
        if(this.props.eventos && this.props.eventos.fromUser){
            return this.props.eventos.fromUser.map( evento => {

                return(
                    <tr key={evento.id}>
                        <td className="td-imagem"><img src={this.getImageSrc(evento)} alt="" /></td>
                        <td>{evento.titulo}</td>
                        <td>{(evento.array_bairros[0])?evento.array_bairros[0].nome:''}</td>
                        <td ><span className="db-list-rat">{this.datePtBr(new Date(evento.inicio))}</span></td>
                        <td><span className="db-list-red">{this.datePtBr(new Date(evento.fim))}</span></td>
                        <td><span className={(evento.status === false)?'db-list-ststus-na':'db-list-ststus'}>
                        {(evento.status === false)?'Inativo':'Ativo'}</span>
                        </td>
                        <td className="table-information">
                            <Link to={'/dashboard/eventos/edit/' + evento._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/eventos/' + evento.slug}  ><i className="fa fa-eye" title="view"></i></Link>
                            <Link to={'/dashboard/eventos/delete/' + evento._id}  ><i className="fa fa-trash" title="delete"></i></Link>
                        </td>
                    </tr>
                )
                
            })
        }
    }

    getImageSrc(item){
        if(item.s3_imagem_destacada){
            return item.old_imagem_destacada;
        }
        if(item.old_imagem_destacada) {
            return item.old_imagem_destacada;
        }
        else if(item.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    showNoticias(){
        let truncate = _.truncate;
        console.log("noticias:::: ", this.props.noticias);
        if(this.props.noticias && this.props.noticias.fromUser){
            return this.props.noticias.fromUser.map( noticia => {
                
                return(
                    <li className="view-msg">
                        <h5><img src={this.getImageSrc(noticia)} alt="" />{noticia.titulo} <span className="tz-msg-un-read">{(noticia.status === false)?'Inativo':'Ativo'}</span></h5>
                        <p>{truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/noticias/edit/' + noticia._id}  ><i className="fa fa-pencil" title="edit"></i></Link> 
                            <Link to={'/noticias/' + noticia.slug}  ><i className="fa fa-eye" title="view"></i></Link>
                            <Link to={'/dashboard/noticias/delete/' + noticia._id}  ><i className="fa fa-trash" title="delete"></i></Link>
                        </div>
                    </li>
                )
                
            })
        }
    }

    render(){
        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
        }

        let totalGuias = 0;
        let totalEventos = 0;
        let totalNoticias = 0;
        
        
        
        if(this.props.guias && this.props.guias.fromUser)
            totalGuias = this.props.guias.fromUser.length;
        
        if(this.props.eventos && this.props.eventos.fromUser){
            totalEventos = this.props.eventos.fromUser.length;
        }

        if(this.props.noticias && this.props.noticias.fromUser)
            totalNoticias = this.props.noticias.fromUser.length;


        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Minha Dashboard</h4>
                            <div className="tz-2-main-com">
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Guias</span>
                                        <p>Total de guias cadastrados</p>
                                        <h2>{totalGuias}</h2> </div>
                                </div>
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Eventos</span>
                                        <p>Total de eventos cadastrados</p>
                                        <h2>{totalEventos}</h2> </div>
                                </div>
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/icon/d1.png" alt="" /><span>Notícias</span>
                                        <p>Total de notícias cadastradas</p>
                                        <h2>{totalNoticias}</h2> </div>
                                </div>
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Guias Comerciais/Serviços</h2>
                                    <p>Listagem de seus guias comercias/serviços</p>
                                </div>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nome</th>
                                            <th>Data</th>
                                            <th>tipo</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showGuias()}
                                    </tbody>
                                </table>                            
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Eventos</h2>
                                    <p>Listagem de seus eventos</p>
                                </div>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nome</th>
                                            <th>Bairro</th>
                                            <th>Início</th>
                                            <th>Fim</th>
                                            <th>Status</th>
                                            <th style={{minWidth:'85px'}}>Ações</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showEventos()}
                                    </tbody>
                                </table>
                            </div>
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Notícias</h2>
                                    <p>Listagem de suas Notícias</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        {this.showNoticias()}
                                    </ul>
                                </div>
                            </div>
                             {/*@todo implement reviews
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Reviews</h2>
                                    <p>All the Lorem Ipsum generators on the All the Lorem Ipsum generators on the</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        <li className="view-msg">
                                            <h5><img src="images/users/1.png" alt="" />Jessica <span className="tz-revi-star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                                            <p>Cras viverra ligula ut sem tincidunt, et volutpat dui facilisis. Nulla congue arcu vitae lectus cursus finibus. Pellentesque consequat ante eu elit tincidunt pharetra.</p>
                                            <div className="hid-msg"><a href="#!"><i className="fa fa-check" title="approve this review"></i></a><a href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash" title="delete"></i></a><a href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                                                <form className="col s12 hide-box">
                                                    <div className="">
                                                        <div className="input-field col s12">
                                                            <textarea className="materialize-textarea"></textarea>
                                                            <label>Write your replay</label>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <input type="submit" value="Submit" className="waves-effect waves-light btn-large" /> </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                        <li className="view-msg">
                                            <h5><img src="images/users/1.png" alt="" />	Christopher <span className="tz-revi-star"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-half-o"></i></span></h5>
                                            <p>Duis nulla ligula, interdum porta nulla sed, efficitur tempus lacus. Quisque facilisis, sapien tempor mollis sollicitudin, urna ligula vulputate nulla, rhoncus faucibus justo mauris eget elit.Pellentesque eget pellentesque dolor.</p>
                                            <div className="hid-msg"><a href="#!"><i className="fa fa-check" title="approve this review"></i></a><a href="#!"><i className="fa fa-edit" title="edit"></i></a><a href="#!"><i className="fa fa-trash" title="delete"></i></a><a href="#!"><i className="fa fa-reply edit-replay" title="replay"></i></a>
                                                <form className="col s12 hide-box">
                                                    <div className="">
                                                        <div className="input-field col s12">
                                                            <textarea className="materialize-textarea"></textarea>
                                                            <label>Write your replay</label>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <input type="submit" value="Submit" className="waves-effect waves-light btn-large" /> </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                    { /*!--RIGHT SECTION--> */}
                    { /*@todo implement notification 
                    <div className="tz-3">
                        <h4>Notifications(18)</h4>
                        <ul>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr1.jpg" alt="" />
                                    <h5>Joseph, write a review</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr2.jpg" alt="" />
                                    <h5>14 New Messages</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr3.jpg" alt="" />
                                    <h5>Ads expairy soon</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr4.jpg" alt="" />
                                    <h5>Post free ads - today only</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr5.jpg" alt="" />
                                    <h5>listing limit increase</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr6.jpg" alt="" />
                                    <h5>mobile app launch</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr7.jpg" alt="" />
                                    <h5>Setting Updated</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                            <li>
                                <a href="#!"> <img src="images/icon/dbr8.jpg" alt="" />
                                    <h5>Increase listing viewers</h5>
                                    <p>All the Lorem Ipsum generators on the</p>
                                </a>
                            </li>
                        </ul>
                    </div>
                */} 
                </div>
            </section>
        )
    }
}


function mapStateToProps(state){
    return(
        {
            user: state.users,
            guias: state.guias,
            eventos: state.eventos,
            noticias: state.noticias
        }
    )
    
}

export default connect(mapStateToProps, {fetchGuiasByUser, fetchGuiasByAdm, fetchEventosByUser, fetchEventosByAdm, fetchNoticiasByUser, fetchNoticiasByAdm})(Dashboard);

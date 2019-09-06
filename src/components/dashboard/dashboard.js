import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';


import {fetchMe} from '../../actions/user';
import {fetchGuiasByUser, fetchGuiasByAdm, deleteGuia, approveReproveGuia} from '../../actions/guia';
import {fetchEventosByUser, fetchEventosByAdm, deleteEvento, approveReproveEvento} from '../../actions/evento';
import {fetchNoticiasByUser, fetchNoticiasByAdm, deleteNoticia, approveReproveNoticia} from '../../actions/noticia';


class Dashboard extends Component{

    constructor(){
        super();

        this.state = {userLogged:null}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));

        if(user !== null){
            this.setState({ userLogged: user.user })
            this.props.fetchMe();
            if(user.user.role.name == 'Administrator'){
                this.props.fetchGuiasByAdm(7);
                this.props.fetchEventosByAdm(7);
                this.props.fetchNoticiasByAdm(7);
            }
            else{
                this.props.fetchGuiasByUser(user.user._id, 7);
                this.props.fetchEventosByUser(user.user._id, 7);
                this.props.fetchNoticiasByUser(user.user._id, 7);
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

    deleteGuia(id) {
        this.props.deleteGuia(id);
    }

    deleteEvento(id) {
        this.props.deleteEvento(id);
    }

    deleteNoticia(id) {
        this.props.deleteNoticia(id);
    }

    showGuias(){
        if(this.props.guias && this.props.guias.fromUser){
            return this.props.guias.fromUser.map( guia => {
                
                return(
                    <tr key={guia.id} style={ guia.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <td className="td-imagem"><img src={this.getImageSrc(guia)} alt="" /></td>
                        <td>{guia.titulo}</td>
                        <td>{this.datePtBr(new Date(guia.createdAt))}</td>
                        <td><span className="db-list-rat">{guia.tipo}</span>
                        </td>
                        <td>{this.itemApproved(guia)}</td>
                        <td className="table-information">
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/dashboard/guias/view/' + guia.slug} target="_blank" ><i className="fa fa-eye" title="view"></i></Link>
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteGuia(guia._id)}
                                body={`Tem certeza que deseja excluir o Guia '${guia.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Guia">
                                <i className="fa fa-trash" title="delete"></i>
                            </Confirm></a>
                            {this.showApproveGuia(guia)}
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
                    <tr key={evento.id}  key={evento.id} style={ evento.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <td className="td-imagem"><img src={this.getImageSrc(evento)} alt="" /></td>
                        <td>{evento.titulo}</td>
                        <td>{(evento.array_bairros[0])?evento.array_bairros[0].nome:''}</td>
                        <td ><span className="db-list-rat">{this.datePtBr(new Date(evento.inicio))}</span></td>
                        <td><span className="db-list-grey">{this.datePtBr(new Date(evento.fim))}</span></td>
                        <td>{this.itemApproved(evento)}</td>
                        <td className="table-information">
                            <Link to={'/dashboard/eventos/edit/' + evento._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/dashboard/eventos/view/' + evento.slug} target="_blank" ><i className="fa fa-eye" title="view"></i></Link>
                            <a href="javascript: void(0)">
                                <Confirm
                                    onConfirm={() => this.deleteEvento(evento._id)}
                                    body={`Tem certeza que deseja excluir o Evento '${evento.titulo}'?`}
                                    confirmText="Confirmar exclusão"
                                    title="Exclusão de Evento">
                                    <i className="fa fa-trash" title="delete"></i>
                                </Confirm>
                            </a>  
                            {this.showApproveEvento(evento)}
                        </td>
                    </tr>
                )
                
            })
        }
    }

    getImageSrc(item){
        const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = item
        
        if(s3_imagem_destacada){
            return s3_imagem_destacada;
        }
        if(old_imagem_destacada) {
            if(old_imagem_destacada.includes('.amazonaws'))
                return old_imagem_destacada;

            return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');
        }
        else if(imagem_destacada){
            if(imagem_destacada.url){
                return imagem_destacada.url;
            }

            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    showApproveGuia(guia){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){

            if(guia.approved){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveGuia(guia._id, false)}
                            body={`Tem certeza que deseja reprovar o guia '${guia.titulo}'?`}
                            confirmText="Confirmar Reprovação"
                            title="Aprovação do Guia">
                            <i className="fa fa-thumbs-down" title="Reprovar"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveGuia(guia._id, true)}
                            body={`Tem certeza que deseja aprovar o guia '${guia.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação do Guia">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    approveReproveGuia(id, approve) {
        this.props.approveReproveGuia(id, approve);
    }

    showApproveEvento(evento){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){

            if(evento.approved){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveEvento(evento._id, false)}
                            body={`Tem certeza que deseja reprovar o evento '${evento.titulo}'?`}
                            confirmText="Confirmar Reprovação"
                            title="Aprovação do Evento">
                            <i className="fa fa-thumbs-down" title="Reprovar"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveEvento(evento._id, true)}
                            body={`Tem certeza que deseja aprovar o evento '${evento.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação do Evento">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    approveReproveEvento(id, approve) {
        this.props.approveReproveEvento(id, approve);
    }

    showApproveNoticia(noticia){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){
            if(noticia.approved){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveNoticia(noticia._id, false)}
                            body={`Tem certeza que deseja reprovar a notícia '${noticia.titulo}'?`}
                            confirmText="Confirmar Reprovação"
                            title="Aprovação de Notícia">
                            <i className="fa fa-thumbs-down" title="Reprovar"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveNoticia(noticia._id, true)}
                            body={`Tem certeza que deseja aprovar a notícia '${noticia.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação de Notícia">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    approveReproveNoticia(id, approve) {
        this.props.approveReproveNoticia(id, approve);
    }

    itemApproved(item){

        switch(item.approved){
            case true:
                return <span className="db-list-ststus">Aprovado</span>
            case false:
                return <span className="db-list-ststus-na">Reprovado</span>
            default:
                return <span className="db-list-ststus-wa">Aguardando Aprovação</span>
        }
    }

    noticiaApproved(noticia){
        switch(noticia.approved){
            case true:
                return <span className="tz-msg-un-read">Aprovado</span>
            case false:
                return <span className="tz-msg-reproved">Reprovado</span>
            default:
                return <span className="tz-msg-waiting">Aguardando Aprovação</span>
        }
    }

    showNoticias(){
        let truncate = _.truncate;
        if(this.props.noticias && this.props.noticias.fromUser){
            return this.props.noticias.fromUser.map( noticia => {
                
                return(
                    <li key={noticia._id} className="view-msg" style={ noticia.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <h5><img src={this.getImageSrc(noticia)} alt="" />{noticia.titulo} {this.noticiaApproved(noticia)}</h5>
                        <p>{truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/noticias/edit/' + noticia._id}  ><i className="fa fa-pencil" title="edit"></i></Link> 
                            <Link to={'/dashboard/noticias/view/' + noticia.slug } target="_blank"  ><i className="fa fa-eye" title="view"></i></Link>
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteNoticia(noticia._id)}
                                body={`Tem certeza que deseja excluir a notícia '${noticia.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Notícia">
                                <i className="fa fa-trash" title="delete"></i>
                            </Confirm></a>
                            {this.showApproveNoticia(noticia)}
                        </div>
                    </li>
                )
                
            })
        }
    }

    render(){
        console.log("this.props.user", this.props.user);
        if(this.props.user && this.props.user.token && this.props.user.token == 'invalid')
            this.setState({userLogged: false});

        if(this.state.userLogged === false){
            localStorage.removeItem('user');

            return <Redirect to={'/login'} />
        }

        let totalGuias = 0;
        let totalEventos = 0;
        let totalNoticias = 0;
        
        
        
        if(this.props.guias && this.props.guias.fromUser){
            if(this.props.guias.count)
                totalGuias = this.props.guias.count;
            else
                totalGuias = this.props.guias.fromUser.length;

        }
        
        if(this.props.eventos && this.props.eventos.fromUser){
            if(this.props.eventos.count)
                totalEventos = this.props.eventos.count;
            else
                totalEventos = this.props.eventos.fromUser.length;
        }

        if(this.props.noticias && this.props.noticias.fromUser){
            if(this.props.noticias.count)
                totalNoticias = this.props.noticias.count;
            else
                totalNoticias = this.props.noticias.fromUser.length;
        }

        console.log("no dashhhhhhhhhhhhhhhhhhhhhhh: ", this.props.user);
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user} />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Minha Dashboard</h4>
                            <div className="tz-2-main-com">
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/map-marker.png" style={{width:'90px'}} alt="" /><span>Guias</span>
                                        <p>Total de guias cadastrados</p>
                                        <h2>{totalGuias}</h2> </div>
                                </div>
                                <div className="tz-2-main-1">
                                    <div className="tz-2-main-2"> <img src="images/event.png" style={{width:'90px'}} alt="" /><span>Eventos</span>
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
    console.log("stattte no props: ", state)
    return(
        {
            user: state.users,
            guias: state.guias,
            eventos: state.eventos,
            noticias: state.noticias
        }
    )
    
}

export default connect(mapStateToProps, 
    {
        fetchMe, 
        deleteGuia, 
        deleteEvento, 
        deleteNoticia, 
        fetchGuiasByUser, 
        fetchGuiasByAdm,
        approveReproveGuia, 
        fetchEventosByUser, 
        fetchEventosByAdm,
        approveReproveEvento, 
        fetchNoticiasByUser, 
        fetchNoticiasByAdm,
        approveReproveNoticia
    }
)(Dashboard);

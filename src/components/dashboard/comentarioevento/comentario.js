import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchComentarioEventosByUser, fetchComentarioEventosByAdm, deleteComentarioEvento, approveReproveComentarioEvento} from '../../../actions/comentario';

class DashboardComentarioEvento extends Component{

    constructor(){
        super();

        this.state = {userLogged:null}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));

        if(user !== null){
            this.setState({userLogged:user.user})
            this.props.fetchMe();
            if(user.user.role.name == 'Administrator'){
                this.props.fetchComentarioEventosByAdm(50);                
            }
            else{
                this.props.fetchComentarioEventosByUser(user.user._id, 10);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    deleteComentarioEvento(id) {
        this.props.deleteComentarioEvento(id);
    }

    approveReproveComentarioEvento(id, approve) {
        this.props.approveReproveComentarioEvento(id, approve);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    showApprove(comentario){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){
            if(comentario.aprovado){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveComentarioEvento(comentario._id, false)}
                            body={`Tem certeza que deseja reprovar o comentário '${comentario.titulo}'?`}
                            confirmText="Confirmar Reprovação"
                            title="Aprovação de Comentário">
                            <i className="fa fa-thumbs-down" title="Reprovar"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveComentarioEvento(comentario._id, true)}
                            body={`Tem certeza que deseja aprovar o comentário '${comentario.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação de Comentário">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    comentarioApproved(comentario){
        switch(comentario.aprovado){
            case true:
                return <span className="tz-msg-un-read">Aprovado</span>
            case false:
                return <span className="tz-msg-reproved">Reprovado</span>
            default:
                return <span className="tz-msg-waiting">Aguardando Aprovação</span>
        }
    }

    showUser(comentario) {
        if(comentario.user) {
            return(
                <div>
                    <p style={{paddingLeft:'20px', paddingTop: '5px', lineHeight: '10px'}}><strong>Username:</strong> {comentario.user.username}</p>
                    <p style={{paddingLeft:'20px', paddingTop: '5px', lineHeight: '10px'}}><strong>Email:</strong> {comentario.user.email}</p>
                </div>
            )
        }
        else{
            return(
                <div>
                    <p style={{paddingLeft:'20px', paddingTop: '5px', lineHeight: '10px'}}><strong>Nome:</strong> {comentario.author_name}</p>
                    <p style={{paddingLeft:'20px', paddingTop: '5px', lineHeight: '10px'}}><strong>Email:</strong> {comentario.author_email}</p>
                </div>
            )
        }
    }

    showViewComment(comentario){
        if(comentario.aprovado){
            return(
                <HashLink to={`/evento/${comentario.evento.slug}#comment-${comentario._id}`}>
                    <i className="fa fa-eye" title="Visualizar"></i>
                </HashLink>
            )
        }
    }

    showComentarioEventos(){
        let truncate = _.truncate;

        if(this.props.comentarios){
            return this.props.comentarios.map( comentario => {
                console.log("comentarioevento: ", comentario);
                return(
                    <li key={comentario._id} className="view-msg" style={ comentario.aprovado ? {paddingLeft: '50px'} : { paddingLeft:'50px', backgroundColor: '#ffe6e6'}}>
                        <h3>{comentario.titulo} {this.comentarioApproved(comentario)}</h3>
                        <p style={{paddingLeft:'20px', paddingTop: '15px', lineHeight: '10px'}}>
                            <strong>Evento: </strong> 
                            <Link to={`/eventos/${comentario.evento.slug}`} target="blank">{comentario.evento.titulo}</Link>
                        </p>
                        {this.showUser(comentario)}
                        <p style={{paddingLeft:'20px', paddingTop: '5px', lineHeight: '10px'}}><strong>Comentário:</strong> {truncate(comentario.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/comentarios/edit/' + comentario._id}  ><i className="fa fa-pencil" title="Editar"></i></Link> 
                            {this.showViewComment(comentario)}
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteComentarioEvento(comentario._id)}
                                body={`Tem certeza que deseja excluir o comentário '${comentario.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Comentário">
                                <i className="fa fa-trash" title="delete"></i>
                            </Confirm></a>
                            {this.showApprove(comentario)}
                            
                        </div>
                    </li>
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

            return old_imagem_destacada.replace('http://soumaisniteroi.com', 'http://images.soumaisniteroi.com');;
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


    render(){
        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
        }

        let totalComentarioEventos = 0;    
        
        
        if(this.props.comentarios && this.props.comentarios.fromUser)
            totalComentarioEventos = this.props.comentarios.fromUser.length;
        
            console.log("this props user::::::: ", this.props)


        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user}/>
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Comentario Eventos</h4>
                            
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Comentarios Eventos</h2>
                                    <p>Listagem de comentarios dos Eventos</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        {this.showComentarioEventos()}
                                    </ul>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>
        )
    }
}


function mapStateToProps(state){
    return(
        {
            user: state.users,
            comentarios: state.comentarios,
        }
    )
    
}

export default connect(mapStateToProps, {fetchMe, deleteComentarioEvento, approveReproveComentarioEvento, fetchComentarioEventosByUser, fetchComentarioEventosByAdm})(DashboardComentarioEvento);

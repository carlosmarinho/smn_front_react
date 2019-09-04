import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchComentarioGuiasByUser, fetchComentarioGuiasByAdm, deleteComentarioGuia, approveReproveComentarioGuia} from '../../../actions/comentario';

class DashboardComentarioGuia extends Component{

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
                this.props.fetchComentarioGuiasByAdm(10);
                
            }
            else{
                this.props.fetchComentarioGuiasByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    deleteComentarioGuia(id) {
        this.props.deleteComentarioGuia(id);
    }

    approveReproveComentarioGuia(id, approve) {
        this.props.approveReproveComentarioGuia(id, approve);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    showApprove(comentario){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){
            if(comentario.approved){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.approveReproveComentarioGuia(comentario._id, false)}
                            body={`Tem certeza que deseja reprovar a notícia '${comentario.titulo}'?`}
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
                            onConfirm={() => this.approveReproveComentarioGuia(comentario._id, true)}
                            body={`Tem certeza que deseja aprovar a notícia '${comentario.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação de Notícia">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    comentarioApproved(comentario){
        switch(comentario.approved){
            case true:
                return <span className="tz-msg-un-read">Aprovado</span>
            case false:
                return <span className="tz-msg-reproved">Reprovado</span>
            default:
                return <span className="tz-msg-waiting">Aguardando Aprovação</span>
        }
    }

    showComentarioGuias(){
        let truncate = _.truncate;

        if(this.props.comentarios && this.props.comentarios.fromUser){
            return this.props.comentarios.fromUser.map( comentario => {
                
                return(
                    <li key={comentario._id} className="view-msg" style={ comentario.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <h5><img src={this.getImageSrc(comentario)} alt="" />{comentario.titulo} {this.comentarioApproved(comentario)}</h5>
                        <p>{truncate(comentario.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/comentarios/edit/' + comentario._id}  ><i className="fa fa-pencil" title="Editar"></i></Link> 
                            <Link to={'/dashboard/comentarios/view/' + comentario.slug} target="_blank" ><i className="fa fa-eye" title="Visualizar"></i></Link>
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteComentarioGuia(comentario._id)}
                                body={`Tem certeza que deseja excluir a notícia '${comentario.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Notícia">
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

        let totalComentarioGuias = 0;    
        
        
        if(this.props.comentarios && this.props.comentarios.fromUser)
            totalComentarioGuias = this.props.comentarios.fromUser.length;
        
            console.log("this props user::::::: ", this.props)


        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user}/>
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Comentario Guias</h4>
                            
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Comentarios Guias</h2>
                                    <p>Listagem de comentarios dos Guias</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        {this.showComentarioGuias()}
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

export default connect(mapStateToProps, {fetchMe, deleteComentarioGuia, approveReproveComentarioGuia, fetchComentarioGuiasByUser, fetchComentarioGuiasByAdm})(DashboardComentarioGuia);
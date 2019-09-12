import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchUsersByAdm, deleteUser, confirmUnconfirmUser} from '../../../actions/user';

class DashboardUser extends Component{

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
                this.props.fetchUsersByAdm(10);
                
            }
            else{
                this.props.fetchUsersByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    showApprove(user){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){

            if(user.approved){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.confirmUnconfirmUser(user._id, false)}
                            body={`Tem certeza que deseja reprovar o user '${user.titulo}'?`}
                            confirmText="Confirmar Reprovação"
                            title="Aprovação do User">
                            <i className="fa fa-thumbs-down" title="Reprovar"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.confirmUnconfirmUser(user._id, true)}
                            body={`Tem certeza que deseja aprovar o user '${user.titulo}'?`}
                            confirmText="Confirmar Aprovação"
                            title="Aprovação do User">
                            <i className="fa fa-thumbs-up" title="Aprovar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    confirmUnconfirmUser(id, approve) {
        //this.props.confirmUnconfirmUser(id, approve);
    }


    deleteUser(id) {
        this.props.deleteUser(id);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    userConfirmed(item){

        switch(item.confirmed){
            case true:
                return <span className="db-list-ststus">Confirmado</span>
            case false:
                return <span className="db-list-ststus-na">Não Confirmado</span>
            default:
                return <span className="db-list-ststus-wa">Não Confirmado</span>
        }
    }

    userBlocked(item){

        switch(item.approved){
            case false:
                return <span className="db-list-ststus">Ativo</span>
            case true:
                return <span className="db-list-ststus-na">Bloqueado</span>
            default:
                return <span className="db-list-ststus-wa">Sem status</span>
        }
    }

    showUsers(){
        if(this.props.users && this.props.users.fromUser){
            return this.props.users.fromUser.map( user => {

                return(
                    <tr key={user.id} style={ user.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <td className="td-imagem"><img src={this.getImageSrc(user)} alt="" /></td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td><span className="db-list-grey">{this.userConfirmed(user)}</span></td>
                        <td><span className="db-list-rat">{this.userBlocked(user)}</span></td>
                        <td >{this.datePtBr(new Date(user.createdAt))}</td>
                        <td className="table-information">
                            <Link to={'/dashboard/users/edit/' + user._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/dashboard/profile/' + user._id} target="_blank" ><i className="fa fa-eye" title="view"></i></Link>
                            <a href="javascript: void(0)">
                                <Confirm
                                    onConfirm={() => this.deleteUser(user._id)}
                                    body={`Tem certeza que deseja excluir o User '${user.name}'?`}
                                    confirmText="Confirmar exclusão"
                                    title="Exclusão de User">
                                    <i className="fa fa-trash" title="delete"></i>
                                </Confirm>
                            </a>  
                            {this.showApprove(user)}
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


    

    render(){
        if(this.state.userLogged === false){
            return <Redirect to={'/'} />
        }

        let totalUsers = 0;    
        
        
        if(this.props.users && this.props.users.fromUser)
            totalUsers = this.props.users.fromUser.length;
        
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user} />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Usuários</h4>
                            
                            <div className="db-list-com tz-db-table">
                            <div className="ds-boar-title">
                                    <h2>Usuários</h2>
                                    <p>Listagem dos Usuários</p>
                                </div>
                                <table className="responsive-table bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Celular</th>
                                            <th>Confirmado</th>
                                            <th>Bloqueado</th>
                                            <th>Criação</th>
                                            <th style={{minWidth:'85px'}}>Ações</th>                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.showUsers()}
                                    </tbody>
                                </table>                            
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
            users: state.users,
        }
    )
}

export default connect(mapStateToProps, {fetchMe, deleteUser, confirmUnconfirmUser, fetchUsersByAdm})(DashboardUser);

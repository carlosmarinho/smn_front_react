import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchEventosByUser, fetchEventosByAdm, deleteEvento, approveReproveEvento, featureUnfeatureEvento} from '../../../actions/evento';

class DashboardEvento extends Component{

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
                this.props.fetchEventosByAdm(10);
                
            }
            else{
                this.props.fetchEventosByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    showApprove(evento){
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


    deleteEvento(id) {
        this.props.deleteEvento(id);
    }

    featureUnfeatureEvento(id, featured) {
        this.props.featureUnfeatureEvento(id, featured);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
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

    showFeaturedEvento(evento){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){
            if(evento.featured){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.featureUnfeatureEvento(evento._id, false)}
                            body={`Tem certeza que deseja retirar o destaque do evento '${evento.titulo}'?`}
                            confirmText="Confirmar Retirar Destaque"
                            title="Retirar Destaque de Evento">
                            <i className="fa fa-star-o" title="Retirar Destaque"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.featureUnfeatureEvento(evento._id, true)}
                            body={`Tem certeza que deseja destacar o evento '${evento.titulo}'?`}
                            confirmText="Confirmar Destacar"
                            title="Destacar Evento">
                            <i className="fa fa-star" title="Destacar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }

    showEventos(){
        if(this.props.eventos && this.props.eventos.fromUser){
            return this.props.eventos.fromUser.map( evento => {

                return(
                    <tr key={evento.id} style={ evento.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <td className="td-imagem"><img src={this.getImageSrc(evento)} alt="" /></td>
                        <td style={{widht:'200px'}}>{evento.titulo} {evento.featured ? <span className="db-list-ststus">Destacado</span> : ''}</td>
                        <td>{(evento.array_bairros[0])?evento.array_bairros[0].nome:''}</td>
                        <td ><span className="db-list-rat">{this.datePtBr(new Date(evento.inicio))}</span></td>
                        <td><span className="db-list-grey">{this.datePtBr(new Date(evento.fim))}</span></td>
                        <td>{this.itemApproved(evento)}</td>
                        <td className="table-information" style={{width:'140px'}}>
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
                            {this.showApprove(evento)}
                            {this.showFeaturedEvento(evento)}
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

        let totalEventos = 0;    
        
        
        if(this.props.eventos && this.props.eventos.fromUser)
            totalEventos = this.props.eventos.fromUser.length;
        
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user} />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Eventos</h4>
                            
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
            eventos: state.eventos,
        }
    )
}

export default connect(mapStateToProps, 
    {
        fetchMe, 
        deleteEvento, 
        approveReproveEvento, 
        fetchEventosByUser, 
        fetchEventosByAdm,
        featureUnfeatureEvento
    }
)(DashboardEvento);

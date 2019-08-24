import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';


import {fetchEventosByUser, fetchEventosByAdm, deleteEvento} from '../../../actions/evento';

class DashboardEvento extends Component{

    constructor(){
        super();

        this.state = {userLogged:null}
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));

        if(user !== null){
            this.setState({userLogged:true})
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

    deleteEvento(id) {
        this.props.deleteEvento(id);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
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
                            <a href="javascript: void(0)">
                                <Confirm
                                    onConfirm={() => this.deleteEvento(evento._id)}
                                    body={`Tem certeza que deseja excluir o Evento '${evento.titulo}'?`}
                                    confirmText="Confirmar exclusão"
                                    title="Exclusão de Evento">
                                    <i className="fa fa-trash" title="delete"></i>
                                </Confirm>
                            </a>  
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

            return old_imagem_destacada.replace('http://soumaisniteroi', 'http://images.soumaisniteroi');
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
                    <MenuDashboardLeft />
                    
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

export default connect(mapStateToProps, {deleteEvento, fetchEventosByUser, fetchEventosByAdm})(DashboardEvento);

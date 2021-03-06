import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {fetchEventosByUser, fetchEventosByAdm} from '../../../actions/evento';

class DashboardEvento extends Component{

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
                this.props.fetchEventosByAdm(7);
                
            }
            else{
                this.props.fetchEventosByUser(user.user._id, 5);
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

export default connect(mapStateToProps, {fetchEventosByUser, fetchEventosByAdm})(DashboardEvento);

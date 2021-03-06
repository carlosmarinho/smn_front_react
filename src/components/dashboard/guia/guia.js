import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {fetchGuiasByUser, fetchGuiasByAdm} from '../../../actions/guia';

class DashboardGuia extends Component{

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
                
            }
            else{
                this.props.fetchGuiasByUser(user.user._id, 5);
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
                            <Link to={'/dashboard/guias/delete/' + guia._id}  ><i className="fa fa-trash" title="delete"></i></Link>
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

        let totalGuias = 0;    
        
        
        if(this.props.guias && this.props.guias.fromUser)
            totalGuias = this.props.guias.fromUser.length;
        
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Guias</h4>
                            
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
            guias: state.guias,
        }
    )
    
}

export default connect(mapStateToProps, {fetchGuiasByUser, fetchGuiasByAdm})(DashboardGuia);

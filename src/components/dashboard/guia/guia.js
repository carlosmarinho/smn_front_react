import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchGuiasByUser, fetchGuiasByAdm, deleteGuia, approveReproveGuia, featureUnfeatureGuia} from '../../../actions/guia';

class DashboardGuia extends Component{

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
                this.props.fetchGuiasByAdm(50);
                
            }
            else{
                this.props.fetchGuiasByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    showApprove(guia){
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

    deleteGuia(id) {
        this.props.deleteGuia(id);
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

    featureUnfeatureGuia(id, featured) {
        this.props.featureUnfeatureGuia(id, featured);
    }

    showGuias(){
        if(this.props.guias && this.props.guias.fromUser){
            return this.props.guias.fromUser.map( guia => {
                
                return(
                    <tr key={guia.id} style={ guia.nao_existe_mais ? { backgroundColor: 'gray'} : guia.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        <td className="td-imagem"><img src={this.getImageSrc(guia)} alt="" /></td>
                        <td style={{width:'300px'}}>{guia.titulo} 
                        {guia.featured ? <span className="db-list-ststus">Destacado</span> : ''}
                        {guia.nao_existe_mais ? <span className="db-list-ststus-na">Não existe mais</span> : ''}
                        </td>
                        <td>{this.datePtBr(new Date(guia.createdAt))}</td>
                        <td><span className="db-list-rat">{guia.tipo}</span>
                        </td>
                        <td>{this.itemApproved(guia)}</td>
                        <td className="table-information">
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-pencil" title="edit"></i></Link>  
                            <Link to={'/dashboard/guias/view/' + guia.slug} target="_blank" ><i className="fa fa-eye" title="view"></i></Link>
                            <a href="javascript: void(0)">
                                <Confirm
                                onConfirm={() => this.deleteGuia(guia._id)}
                                body={`Tem certeza que deseja excluir o Guia '${guia.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Guia">
                                <i className="fa fa-trash" title="delete"></i>
                                </Confirm>
                            </a>
                            {this.showApprove(guia)}
                            {this.showFeatured(guia)}
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

    showGuiasMobile(){
        return (
            <div className="db-list-com tz-db-table hidden-desktop">
                <div className="ds-boar-title">
                    <h2>Guias</h2>
                    <p>Listagem de suas guias</p>
                </div>
                <div className="tz-mess">
                    <ul>
                        {this.showGuiaMobile()}
                    </ul>
                </div>                            
            </div>
        )
    }

    showGuiaMobile(){
        let truncate = _.truncate;

        if(this.props.guias && this.props.guias.fromUser){
            return this.props.guias.fromUser.map( guia => {
                
                return(
                    <li key={guia._id} className="view-msg" style={ guia.approved ? {} : { backgroundColor: '#ffe6e6'}}>
                        {this.guiaFeatured(guia)}
                        <h5><img src={this.getImageSrc(guia)} alt="" />{guia.titulo} </h5>
                        {this.guiaApproved(guia)}
                        <p>{truncate(guia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/guias/edit/' + guia._id}  ><i className="fa fa-pencil" title="Editar"></i></Link> 
                            <Link to={'/dashboard/guias/view/' + guia.slug} target="_blank" ><i className="fa fa-eye" title="Visualizar"></i></Link>
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteGuia(guia._id)}
                                body={`Tem certeza que deseja excluir a guia '${guia.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Guia">
                                <i className="fa fa-trash" title="delete"></i>
                            </Confirm></a>
                            {this.showApprove(guia)}
                            {this.showFeatured(guia)}
                        </div>
                    </li>
                )
                
            })
        }
    }

    guiaFeatured(guia){
        if(guia.featured)
            return <span className="tz-msg-un-read " style={{marginTop: '-25px', position: 'relative', float: 'right'}}>Destacada</span>
    }

    guiaApproved(guia){
        switch(guia.approved){
            case true:
                return <span className="tz-msg-un-read position-mobile-relative">Aprovado</span>
            case false:
                return <span className="tz-msg-reproved position-mobile-relative">Reprovado</span>
            default:
                return <span className="tz-msg-waiting position-mobile-relative">Aguardando Aprovação</span>
        }
    }

    showFeatured(guia){
        if(this.state.userLogged && this.state.userLogged.role.name == 'Administrator'){
            if(guia.featured){
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.featureUnfeatureGuia(guia._id, false)}
                            body={`Tem certeza que deseja retirar o destaque da guia '${guia.titulo}'?`}
                            confirmText="Confirmar Retirar Destaque"
                            title="Retirar Destaque de Guia">
                            <i className="fa fa-star-o" title="Retirar Destaque"></i>
                        </Confirm>
                    </a>
                )
            }
            else{
                return (
                    <a href="javascript: void(0)">
                        <Confirm
                            onConfirm={() => this.featureUnfeatureGuia(guia._id, true)}
                            body={`Tem certeza que deseja destacar a guia '${guia.titulo}'?`}
                            confirmText="Confirmar Destacar"
                            title="Destacar Guia">
                            <i className="fa fa-star" title="Destacar"></i>
                        </Confirm>
                    </a>
                )
            }
        }
    }


    render(){
        if(this.state.userLogged === false){
            localStorage.removeItem('user');

            return <Redirect to={'/'} />
        }

        let totalGuias = 0;    
        
        
        if(this.props.guias && this.props.guias.fromUser)
            totalGuias = this.props.guias.fromUser.length;
        
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user}/>
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Guias</h4>
                            
                            {this.showGuiasMobile()}

                            <div className="db-list-com tz-db-table hidden-mobile">
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

export default connect(mapStateToProps, 
    { 
        fetchMe, 
        deleteGuia, 
        approveReproveGuia, 
        fetchGuiasByUser, 
        fetchGuiasByAdm, 
        featureUnfeatureGuia
    }
)(DashboardGuia);

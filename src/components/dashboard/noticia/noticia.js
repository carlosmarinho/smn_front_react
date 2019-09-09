import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import Confirm from 'react-confirm-bootstrap';

import {fetchMe} from '../../../actions/user';
import {fetchNoticiasByUser, fetchNoticiasByAdm, deleteNoticia, approveReproveNoticia} from '../../../actions/noticia';

class DashboardNoticia extends Component{

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
                this.props.fetchNoticiasByAdm(50);
                
            }
            else{
                this.props.fetchNoticiasByUser(user.user._id, 5);
            }
        }
        else{
            this.setState({userLogged:false})
        }
    }

    deleteNoticia(id) {
        this.props.deleteNoticia(id);
    }

    approveReproveNoticia(id, approve) {
        this.props.approveReproveNoticia(id, approve);
    }

    datePtBr(date){
        //const options = {year: 'numeric', month: 'short', day: 'numeric' };
        //return date.toLocaleDateString('pt-BR', options)
        return date.toLocaleDateString('pt-BR')
    }

    showApprove(noticia){
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
                            <Link to={'/dashboard/noticias/edit/' + noticia._id}  ><i className="fa fa-pencil" title="Editar"></i></Link> 
                            <Link to={'/dashboard/noticias/view/' + noticia.slug} target="_blank" ><i className="fa fa-eye" title="Visualizar"></i></Link>
                            <a href="javascript: void(0)"><Confirm
                                onConfirm={() => this.deleteNoticia(noticia._id)}
                                body={`Tem certeza que deseja excluir a notícia '${noticia.titulo}'?`}
                                confirmText="Confirmar Exclusão"
                                title="Exclusão de Notícia">
                                <i className="fa fa-trash" title="delete"></i>
                            </Confirm></a>
                            {this.showApprove(noticia)}
                            
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

        let totalNoticias = 0;    
        
        
        if(this.props.noticias && this.props.noticias.fromUser)
            totalNoticias = this.props.noticias.fromUser.length;
        
            console.log("this props user::::::: ", this.props)


        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft user={this.props.user}/>
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Noticias</h4>
                            
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Noticias</h2>
                                    <p>Listagem de suas notícias</p>
                                </div>
                                <div className="tz-mess">
                                    <ul>
                                        {this.showNoticias()}
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
            noticias: state.noticias,
        }
    )
    
}

export default connect(mapStateToProps, {fetchMe, deleteNoticia, approveReproveNoticia, fetchNoticiasByUser, fetchNoticiasByAdm})(DashboardNoticia);

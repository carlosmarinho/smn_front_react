import _ from 'lodash';
import React, { Component } from 'react';
import MenuDashboardLeft from '../../menu-dashboard-left';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import {fetchNoticiasByUser, fetchNoticiasByAdm} from '../../../actions/noticia';

class DashboardNoticia extends Component{

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
                this.props.fetchNoticiasByAdm(10);
                
            }
            else{
                this.props.fetchNoticiasByUser(user.user._id, 5);
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

    showNoticias(){
        let truncate = _.truncate;

        if(this.props.noticias && this.props.noticias.fromUser){
            return this.props.noticias.fromUser.map( noticia => {
                
                return(
                    <li key={noticia._id} className="view-msg">
                        <h5><img src={this.getImageSrc(noticia)} alt="" />{noticia.titulo} <span className="tz-msg-un-read">{(noticia.status === false)?'Inativo':'Ativo'}</span></h5>
                        <p>{truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 200, separator: /,?\.* +/ })}</p>
                        <div className="hid-msg">
                            <Link to={'/dashboard/noticias/edit/' + noticia._id}  ><i className="fa fa-pencil" title="edit"></i></Link> 
                            <Link to={'/noticias/' + noticia.slug}  ><i className="fa fa-eye" title="view"></i></Link>
                            <Link to={'/dashboard/noticias/delete/' + noticia._id}  ><i className="fa fa-trash" title="delete"></i></Link>
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
            return old_imagem_destacada;
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
        
        return(
            <section>
                <div className="tz">
                    {/* <!--LEFT SECTION--> */}
                    <MenuDashboardLeft />
                    
                    { /*!--CENTER SECTION--> */}
                    <div className="tz-2">
                        <div className="tz-2-com tz-2-main">
                            <h4>Gerenciamento de Noticias</h4>
                            
                            <div className="db-list-com tz-db-table">
                                <div className="ds-boar-title">
                                    <h2>Noticias Comerciais/Serviços</h2>
                                    <p>Listagem de seus noticias comercias/serviços</p>
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
                                        {this.showNoticias()}
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
            noticias: state.noticias,
        }
    )
    
}

export default connect(mapStateToProps, {fetchNoticiasByUser, fetchNoticiasByAdm})(DashboardNoticia);

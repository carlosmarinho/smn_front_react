import React, { Component } from 'react';
import { connect } from 'react-redux'
import RightColumn from '../right-column';
import HeaderBlog from '../header-destaque-blog';
import PreFooter from './pre-footer'
import { fetchNoticiaBySlug } from '../../actions/noticia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import FormComment from './form-comment';

class NewsItem extends Component {

    componentDidMount() {
        this.props.fetchNoticiaBySlug(this.props.match.params.slug);
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    getImage(item){
        let imageSrc = '';
        if(item){
            if(item.s3_imagem_destacada){
                imageSrc =  item.old_imagem_destacada;
            }
            if(item.old_imagem_destacada) {
                imageSrc =  item.old_imagem_destacada;
            }
            else if(item.imagem_destacada){
                //implementar codigo
                imageSrc =  "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
            }
            else
                return
        }
        else {
            return
        }

        return <img src={imageSrc} alt="" style={{maxHeight:300, marginBottom: 30}} />
    }

    getContent(item){
        return(
            <div>
                <div className="blog-img"> {this.getImage(item)} </div>
                
                <div className="page-blog">
                    <h3 className="text-center">{(item)?item.titulo:'Carregando...'}</h3> 
                    <span>{this.datePtBr(new Date(item.createdAt))}</span>
                    <div className="share-btn share-pad-bot ">
                        <ul>
                            <li><a href="#"><i className="fa fa-facebook fb1"></i> Share On Facebook</a> </li>
                            <li><a href="#"><i className="fa fa-twitter tw1"></i> Share On Twitter</a> </li>
                            <li><a href="#"><i className="fa fa-google-plus gp1"></i> Share On Google Plus</a> </li>
                        </ul>
                    </div>
                    
                    <div dangerouslySetInnerHTML={{__html: (item)?item.descricao:'Carregando ...'}} ></div>

                    <FormComment />
                    
                </div>
            </div>
        )
    }

    contentWithColumnRight(item){
        return (
            <div>
                    
                    <HeaderBlog title={(item)?item.titulo:'Carregando...'}/>

                    <section className="p-about com-padd">
                        <div className="container">
                            <div className="row blog-single con-com-mar-bot-o">
                              
                                <div className="list-pg-lt list-page-com-p com-padd-horizon" >
                                    
                                    {this.getContent(item)}

                                    
                                </div>
                                    <RightColumn guiasType="recentes" guias={(this.props.guias)?this.props.guias:[]} eventos={(this.props.eventos)?this.props.eventos.recentes:[]}  />
                            </div>
                        </div>
                    </section>
                    <PreFooter />
                    
                </div>
        )
    }

    render(){

        //let columnRight = this.props.columnRight;

        let item = {};
        if(this.props.noticias && this.props.noticias.noticia)
            item = this.props.noticias.noticia;
            

        let columnRight = true;
        if(columnRight) {
            return(
                <div>{this.contentWithColumnRight(item)}</div>
            )
        }
        else {
            return(
                <div>
                    
                    <HeaderBlog title="teste"/>

                    <section className="p-about com-padd">
                        <div className="container">
                            <div className="row blog-single con-com-mar-bot-o">
                                <div className="col-md-12">
                                    {this.getContent(item)}
                                </div>
                            </div>
                        </div>
                    </section>
                    <PreFooter />
                    
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    //console.log("state BLOG list: ", state)
    return {
        noticias: state.noticias,
        guias: state.guias,
        eventos: state.eventos
    }
}

export default connect(mapStateToProps, { fetchNoticiaBySlug, fetchEventosRecentes, fetchGuiasFeatured })(NewsItem);
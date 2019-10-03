import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import draftToHtml from 'draftjs-to-html';

import RightColumn from '../right-column';
import HeaderBlog from '../header-destaque-blog';
import PreFooter from './pre-footer'
import { fetchNoticiaBySlug } from '../../actions/noticia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import { fetchBairroBySlug } from '../../actions/bairro';

import FormComment from './form-comment';
import Reviews from './reviews';
import { Link } from 'react-router-dom';

class NewsItem extends Component {

    constructor() {
        super();

        this.state = {
            slug: ''
        }
    }

    async componentDidMount() {
        //this.props.fetchNoticiaBySlug(this.props.match.params.slug);
        let bairro_id = null;
        if(this.props.subdomain){
            await this.props.fetchBairroBySlug(this.props.subdomain);
            bairro_id = this.props.bairros.bairro._id;
        }


        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0', bairro_id);
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0', bairro_id);
    }

    componentWillReceiveProps(nextProps) {
        console.log("next props: ", nextProps);
        let slug = nextProps.match.params.slug
        
        if(slug !== this.state.slug){
            this.props.fetchNoticiaBySlug(slug, 1, nextProps.dashboardView )
            this.setState(
                {
                   slug: slug,       
                }
            )
        }
    }

    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    getImageSrc(noticia){
        if(noticia) {
            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = noticia
            
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
                imageSrc =  "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
            }
            else
                return
        }
        else {
            return
        }

        return <img src={imageSrc} alt="" style={{maxHeight:300, marginBottom: 30}} />
    }

    showNoticiaContent(item) {
        if(! item)
            return <div>Carregando...</div>

        console.log("descricao: ", item);

        if(item.descricao){
            return(
            <div dangerouslySetInnerHTML={{__html: item.descricao}} ></div>
            );
        }
        else{
            return(
                <div dangerouslySetInnerHTML={{__html: draftToHtml(item.descricaoJson)}} ></div>
            )
        }
    }

    getContent(item){
        if(!item.titulo)
            return <div>Carregando...</div>
            
        console.log("iiiiitem::::: ", item);
        let url = "http://soumaisniteroi.com.br/noticias/" + item.slug
        return(
            <div>
                <div className="blog-img">
                    <img src={this.getImageSrc(item)} alt="" style={{maxHeight:300, marginBottom: 30}} />
                </div>
                
                <div className="page-blog">
                    <div className="text-center share-btn share-pad-bot ">
                        <ul>
                            <li><a target="_blank" href={`https://facebook.com/sharer/sharer.php?u=${url}`}><i className="fa fa-facebook fb1"></i>Compartilhar <span>no Facebook</span></a> </li>
                            <li><Link to={'/'}><i className="fa fa-twitter tw1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                            <li><Link to={'/'}><i className="fa fa-google-plus gp1"></i>Compartilhar <span>no Facebook</span></Link> </li>
                        </ul>
                    </div>
                    <h3 className="text-center">{(item)?item.titulo:'Carregando...'}</h3> 
                    <span>{this.datePtBr(new Date(item.createdAt))}</span>
                    
                    {this.showNoticiaContent(item)}

                    <FormComment resource="noticia" review={item.review} item_id={item._id} text="Faça um comentário relacionado a está notícia, propaganda e comentários que não estão relacionados a esta notícia e o site será apagado!" />
                    <Reviews review={item.review} comments={item.comentarios}/>
                    
                    
                </div>
            </div>
        )
    }

    contentWithColumnRight(item){
        let url = "http://soumaisniteroi.com.br/noticias/" + item.slug;
        
        return (
            <div>
                    
                    <HeaderBlog title={(item)?item.titulo:'Carregando...'} url={url} description={item.descricao} image={this.getImageSrc(item)}/>

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
        if(this.props.noticias && this.props.noticias.noticia){
            item = this.props.noticias.noticia;
            if(this.props.subdomain){
                return(
                    <Redirect from={`${this.props.location.pathname}`} to={`http://soumaisniteroi.com.br/noticias/${this.props.noticias.noticia.slug}`} state={ { status: 301 } } />
                )
            }
        }
            

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
    return {
        noticias: state.noticias,
        guias: state.guias,
        eventos: state.eventos,
        bairros: state.bairros
    }
}

export default connect(mapStateToProps, { fetchBairroBySlug, fetchNoticiaBySlug, fetchEventosRecentes, fetchGuiasFeatured })(NewsItem);
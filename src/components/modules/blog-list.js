import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import draftToHtml from 'draftjs-to-html';

import HeaderBlog from '../header-destaque-blog';
import { fetchNoticias, fetchNoticiasByCategory } from '../../actions/noticia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import Paginate from "../paginate";
import { Link } from 'react-router-dom';
import PreFooter from './pre-footer'

import RightColumn from '../right-column';

class BlogList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 10,
            loading: true,
            slug: '',
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateNoticias = this.generateNoticias.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }

    componentDidMount() {
        //let slug = this.props.match.params.slug;

        if(!(this.props.match && this.props.match.params.slug)) {
            this.props.fetchNoticias('5ba26f813a018f42215a36a0', this.props.category).then(()=>{
                this.setState({loading:false})
            });
        }
        
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.match && nextProps.match.params.slug){
            let slug = nextProps.match.params.slug

            if(slug !== this.state.slug){
                this.setState(
                    {
                       loading: true,
                       slug: slug,
                       noticias: this.props.fetchNoticiasByCategory(slug).then(()=>{
                           this.setState({loading:false})
                        })
                    }
                )
            }
        }


        if(nextProps.noticias){
            //console.log("no nextprops: ", nextProps)
            if(nextProps.noticias.list)
            {
                this.setState({data: nextProps.noticias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.noticias.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    this.handlePageChange(nextProps.match.params.page, nextProps.noticias.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
            }
        }
    }

    handleImageLoaded() {
        //console.log('image loadedddddddddddddddddd: ');
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
    }


    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    getCategorias(categorias){
        
        if(categorias && categorias.length > 0){
            return (
                <div className="list-category-blog"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 === categorias.length)
                            return <Link to={`/noticias/categoria/${categoria.slug.replace('noticias/','')}`} key={i}>{categoria.nome}</Link>
                        else
                            return <Link to={`/noticias/categoria/${categoria.slug.replace('noticias/','')}`} key={i}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    getResumo(noticia){
        const truncate = _.truncate

        if(noticia.resumo){
            return(
                truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 150, separator: /,?\.* +/ })
                
            )
        }
        if(noticia.descricaoJson){
            return(
                truncate(draftToHtml(noticia.descricaoJson).replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 150, separator: /,?\.* +/ })                
            )
        }
        else{
            return(
                truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 150, separator: /,?\.* +/ })
            )
        }
    }

    generateNoticias() {
        const truncate = _.truncate
        let noticias = this.state.data.map( (noticia, ind) => {
            if(noticia.descricaoJson)
                console.log("Noticia convertida: ", " --- ", draftToHtml(noticia.descricaoJson));
            
            return (
                <div className="row blog-single" key={ind}>
                    <div className="col-md-4">
                        <div className="blog-img"> <img src={this.getImageSrc(noticia)} alt="" onLoad={this.handleImageLoaded} /> </div>
                    </div>
                    <div className="col-md-8">
                        <div className="page-blog">
                            
                            <Link to={'/noticias/' + noticia.slug}  ><h3>{noticia.titulo}</h3></Link>
                            <span>{this.datePtBr(new Date(noticia.createdAt))} </span>
                            <p>{this.getResumo(noticia)}</p>
                            <p>{}</p> 
                            {this.getCategorias(noticia.array_categorias)}
                            <Link to={'/noticias/' + noticia.slug} className="waves-effect waves-light btn-large full-btn" >Leia Mais</Link> </div>
                    </div>
                </div>
            )
        })

        let itemCount = 0;
        if(this.props && this.props.noticias && this.props.noticias.list)
            itemCount = this.props.noticias.list.length

        return(
            <div>
                {noticias}
                <Paginate
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.perPage}
                        totalItemsCount={itemCount}
                        pageRangeDisplayed={this.state.perPage}
                        onChange={this.handlePageChange}
                        innerClass="pagination list-pagenat"
                        itemClass="waves-effect"
                        pathname={this.props.location.pathname}
                /> 
            </div>
        )
    }

    handlePageChange(pageNumber, list=[]) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber === 1){
            if(this.props.guias.list)
                data = this.props.noticias.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            if(this.props.guias.list)
                data = this.props.noticias.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
            else
                data = list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.noticias.list.slice(0,this.state.perPage)}
    }

    render(){
        let columnRight = this.props.columnRight;
        let title = '';
        let items = '';
        

        if(this.state.loading){
            title = `Carregando Notícias para a categoria solicitada ...`;
            items = <div className="row blog-single"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
        }
        else{
            if(this.props.title){
                title = this.props.title;
            }
            else if(this.props.noticias){
                columnRight = true;
                if(this.props.match.params.slug ){
                    if(this.props.noticias.categoria && this.props.noticias.categoria.nome){
                        title = `Notícias da categoria: '${this.props.noticias.categoria.nome}'`;
                    }
                    else{
                            title = `Notícias não encontrada para a categoria: '${this.props.match.params.slug}'`;   
                    }
                }
                else{
                    title = 'Notícias da cidade de Niterói';
                }
                
            }
            else if(this.state.slug){
                title = `Categoria '${this.state.slug}' não encontrada `;
            }

            if(! this.props.noticias){
                items = <div className="row blog-single"><h2 className="text-center">Nenhuma Notícia encontrada!</h2></div>
            }
            else {
                if(this.props.match.params && this.props.match.params.slug ) {
                    console.log("slug: ",  this.state )
                    if(this.props.noticias.categoria){
                        if( this.props.noticias.list && this.props.noticias.list.length === 0)                    
                            items = <div className="row blog-single"><h2 className="text-center">Nenhuma notícia encontrado para esta categoria {this.props.listName} </h2></div>
                        else
                            items = this.generateNoticias();
                    }
                    else{
                        items = <div className="row blog-single"><h2 className="text-center">Categoria {this.props.match.params.slug} não foi encontrada </h2></div>
                    }
                }
                else {   
                    if(this.props.noticias.list && this.props.noticias.list.length > 0){
                        items = this.generateNoticias();
                    }
                    else{
                        items = <div className="row blog-single"><h2 className="text-center">Nenhuma notícia encontrada! </h2></div>

                    }
                     
                }
                //items = this.generateGuias(this.props.noticias.list)
            }

        }
        



        if(columnRight) {
            return(
                <div>{this.contentWithColumnRight(items, title, this.props.subtitle)}</div>
            )
        }
        else {
            return(
                <div>
                    <HeaderBlog title={title} subtitle={this.props.subtitle} />
                    <section className="p-about com-padd">
                        <div className="container">
                            {items}
                        
                        

                        </div>
                    </section>
                    <PreFooter />
                    
                </div>
            )
        }
    }

    contentWithColumnRight(items, title, subtitle){
        

        return(
            <div>
                <HeaderBlog title={title} subtitle={subtitle} />
                <section className="p-about com-padd">
                    <div className="container">

                        <div className="row">
                            <div >
                                <div className="list-pg-lt list-page-com-p">
                                    {items}
                                </div>
                                <RightColumn guiaType="featured" guias={(this.props.guias)?this.props.guias:[]} eventos={(this.props.eventos)?this.props.eventos.recentes:[]}  />
                            </div>
                        </div>
                    </div>
                </section>
                <PreFooter />
                
            </div>
        )
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

export default connect(mapStateToProps, { fetchNoticias, fetchNoticiasByCategory, fetchEventosRecentes, fetchGuiasFeatured })(BlogList);
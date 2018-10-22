import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import HeaderBlog from '../header-destaque-blog';
import { fetchNoticias, fetchNoticiasByCategory } from '../../actions/noticia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import { Link } from 'react-router-dom';
import PreFooter from './pre-footer'

import Pagination from "react-js-pagination";

import RightColumn from '../right-column';

class BlogList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 10,
            slug: '',
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateNoticias = this.generateNoticias.bind(this);
    }

    componentDidMount() {
        //let slug = this.props.match.params.slug;

        if(!(this.props.match && this.props.match.params.slug)) {
            this.props.fetchNoticias('5ba26f813a018f42215a36a0', this.props.category);
        }
        
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.match && nextProps.match.params.slug){
            let slug = nextProps.match.params.slug
            if(slug != this.state.slug){
                this.setState(
                    {
                       slug: slug,
                       noticias: this.props.fetchNoticiasByCategory(slug)
                    }
                )
            }
        }


        if(nextProps.noticias){
            //console.log("no nextprops: ", nextProps)
            if(nextProps.noticias.list)
            {
                this.setState({data: nextProps.noticias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.noticias.list.lenght / this.state.perPage)});
            }
        }
    }

    getImageSrc(noticia){
        if(noticia.s3_imagem_destacada){
            return noticia.old_imagem_destacada;
        }
        if(noticia.old_imagem_destacada) {
            return noticia.old_imagem_destacada;
        }
        else if(noticia.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    getCategorias(categorias){
        if(categorias.length > 0){
            return (
                <div class="list-category-blog"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 == categorias.length)
                            return <Link to={`/noticias/categoria/${categoria.slug.replace('noticias/','')}`}>{categoria.nome}</Link>
                        else
                            return <Link to={`/noticias/categoria/${categoria.slug.replace('noticias/','')}`}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    generateNoticias() {
        const truncate = _.truncate
        let noticias = this.state.data.map( noticia => {
            
            return (
                <div className="row blog-single">
                    <div className="col-md-4">
                        <div className="blog-img"> <img src={this.getImageSrc(noticia)} alt="" /> </div>
                    </div>
                    <div className="col-md-8">
                        <div className="page-blog">
                            <Link to={'/noticias/' + noticia.slug}  ><h3>{noticia.titulo}</h3></Link>
                            <span>{this.datePtBr(new Date(noticia.createdAt))} </span>
                            <p>{truncate(noticia.descricao.replace(/&#13;/g,'').replace(/<\/?[^>]+(>|$)/g, ""), { length: 150, separator: /,?\.* +/ })}</p> 
                            {this.getCategorias(noticia.categorias)}
                            <Link to={'/noticias/' + noticia.slug} className="waves-effect waves-light btn-large full-btn" >Leia Mais</Link> </div>
                    </div>
                </div>
            )
        })

        return(
            <div>
                {noticias}
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={this.props.noticias.list.length}
                    pageRangeDisplayed={this.state.perPage}
                    onChange={this.handlePageChange}
                    prevPageText={<i className="material-icons">chevron_left</i>}
                    nextPageText={<i className="material-icons">chevron_right</i>}
                    firstPageText={<i className="material-icons">first_page</i>}
                    lastPageText={<i className="material-icons">last_page</i>}
                    innerClass="pagination list-pagenat"
                    itemClass="waves-effect"
                />
            </div>
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber == 1){
            data = this.props.noticias.list.slice(0, this.state.perPage)
        }
        else{
            data = this.props.noticias.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.noticias.list.slice(0,this.state.perPage)}
    }

    render(){
        let columnRight = this.props.columnRight;
        let title = '';
        if(this.props.title)
            title = this.props.title;
        else if(this.props.noticias && this.props.noticias.categoria){
            title = `Notícias da categoria: '${this.props.noticias.categoria.nome}'`;
            columnRight = true;
        }
        else if(this.state.slug){
            title = `Categoria '${this.state.slug}' não encontrada `;
        }

        let items = <div>Nenhuma Notícia encontrada!</div>
        if(! this.props.noticias){
            items = <div>Nenhuma Notícia encontrado !</div>
        }
        else {
            if(!this.props.noticias.list || this.props.noticias.list.length == 0)
                items = <div>Nenhum noticia encontrado para esta categoria {this.props.listName} </div>
            else
                items = this.generateNoticias();
            //items = this.generateGuias(this.props.noticias.list)
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
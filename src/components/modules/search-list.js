import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchGuias, fetchGuiasBySearch } from '../../actions/guia';
import { fetchEventosBySearch } from '../../actions/evento';
import { fetchNoticiasBySearch } from '../../actions/noticia';
import { fetchBairros } from '../../actions/bairro';
import { fetchCategoriesGuiaTop } from '../../actions/categoria';
import Pagination from "react-js-pagination";
import slugify from 'slugify';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';


class SearchList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            dataEvento: [],
            dataNoticia: [],
            activePage: 1,
            activePageEvento: 1,
            activePageNoticia: 1,
            perPage: 5,
            slug: '',
            search: '',
            bairroSearch: '',
            type: ''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageNoticiaChange = this.handlePageNoticiaChange.bind(this);
        this.handlePageEventoChange = this.handlePageEventoChange.bind(this);
        this.generateGuias = this.generateGuias.bind(this);
    }

    componentDidMount() {
        /* let search = '';
        if(this.props.type){
            search = `tipo=${this.props.type}`
        }

        if(this.props.match && this.props.match.params.slug){
            this.props.fetchGuiasByCategory(this.props.match.params.slug);
        }
        else{
            this.props.fetchGuias('5ba26f813a018f42215a36a0', search);
        }
 */
        this.props.fetchCategoriesGuiaTop();
        this.props.fetchBairros('5ba26f813a018f42215a36a0');

        //this.setState({data: this.props.guias.list, pageCount: Math.ceil(  this.props.guias.list.lenght / evento)});
    }
  

    componentWillReceiveProps(nextProps) {

        console.log(nextProps);
        
        if(nextProps.match && nextProps.match.params){
            console.log("nextprops: ", nextProps)
            let slug = nextProps.location.pathname;
            let params = nextProps.match.params
            let search = {bairro:'', keyword:''};

            if(nextProps.type){
                search = `tipo=${nextProps.type}`
            }
            
            if(params.bairro){
                search = {bairro: params.bairro};
            }

            if(params.keyword){
                search = {keyword: params.keyword};
            }
         
            if(slug !== this.state.slug){
         
                this.setState(
                    {
                       slug: slug,
                       search: search,
                       guias: this.props.fetchGuiasBySearch(search),
                       eventos: this.props.fetchEventosBySearch(search),
                       noticias: this.props.fetchNoticiasBySearch(search)
                    }
                )
            }
        }
        

        if(nextProps.guias){
            if(nextProps.guias.list)
            {
                this.setState({data: nextProps.guias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.guias.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    this.handlePageChange(nextProps.match.params.page, nextProps.guias.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
            }
        }

        if(nextProps.eventos){
            if(nextProps.eventos.list)
            {
                this.setState({dataEvento: nextProps.eventos.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.eventos.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    this.handlePageEventoChange(nextProps.match.params.page, nextProps.eventos.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
            }
        }

        if(nextProps.noticias){
            if(nextProps.noticias.list)
            {
                this.setState({dataNoticia: nextProps.noticias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.noticias.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    this.handlePageNoticiaChange(nextProps.match.params.page, nextProps.noticias.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
            }
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

    dateNumberPtBr(date){
        console.log("dattta:::;", date);
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }

    datePtBr(date){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('pt-BR', options)
    }

    generateEventos() {
        if(this.state.dataEvento.length > 0){
            let eventos = this.state.dataEvento.map( evento => {
                let avaliacao = '';
                /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
                if(evento.mediaAvaliacao)
                    avaliacao = <span className="home-list-pop-rat">{evento.mediaAvaliacao}</span>
                
                return (
                    <div className="row">
                        {/*<!--EVENTS-->*/}  
                        <div className="home-list-pop list-spac">
                            {/*<!--EVENTS IMAGE-->*/}
                            <div className="col-md-3 list-ser-img"> <img src={this.getImageSrc(evento)} alt="" /> </div>
                            {/*<!--EVENTS: CONTENT-->*/}
                            <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <Link to={`/evento/` + evento.slug}><h3>{evento.titulo}</h3></Link>
                                <h4>{(evento.cidade.length>0)?evento.cidade[0].nome:''} {(evento.bairros.length>0)?'- ' + evento.bairros[0].nome:''}</h4>
                                <p>{(evento.endereco)?<b>Endereço:</b>:''} {evento.endereco}</p>
                                <div className="list-number">
                                    
                                    {(evento.inicio)?<p><strong>Data do Evento:</strong> {this.datePtBr(new Date(evento.inicio))}</p>:''}
                                    {(evento.fim)?<p><strong>Data Fim </strong> {this.datePtBr(new Date(evento.fim))}</p>:''}
                                    {(evento.classificacao_indicativa)?<p><strong>Classificação </strong> {evento.classificacao_indicativa}</p>:''}
                                    
                                </div> 
                                {avaliacao}
                                {this.getCategorias(evento.categorias)}
                                
                                <div className="list-enqu-btn">
                                    <ul>
                                        <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Avalie este evento</a> </li>
                                        <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Mais Informações</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/*<!--EVENTS END-->*/}
                    </div>
                    
                )
            })

            let itemCount = 0;
            if(this.props && this.props.eventos && this.props.eventos.list)
                itemCount = this.props.eventos.list.length

            return(
                <div className="dir-alp-con-right-1 content_search" >
                    <h2 style={{ textAlign: 'center'}}>Listagem de Eventos para a busca</h2>
                    {eventos}
                    <div className="row">
                        <Pagination
                            activePage={this.state.activePageEvento}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={itemCount}
                            pageRangeDisplayed={this.state.perPage}
                            onChange={this.handlePageEventoChange}
                            prevPageText={<i className="material-icons">chevron_left</i>}
                            nextPageText={<i className="material-icons">chevron_right</i>}
                            firstPageText={<i className="material-icons">first_page</i>}
                            lastPageText={<i className="material-icons">last_page</i>}
                            innerClass="pagination list-pagenat"
                            itemClass="waves-effect"
                        />
                        
                    </div>
                </div>
            )
        }
    }

    generateGuias() {
        

        let guias = this.state.data.map( guia => {
            let avaliacao = '';
            /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
            if(guia.mediaAvaliacao)
                avaliacao = <span className="home-list-pop-rat">{guia.mediaAvaliacao}</span>
            return (
                
                    <div className="row">
                        <div className="home-list-pop list-spac">
                            {/*<!--LISTINGS IMAGE-->*/}
                            <div className="col-md-3 list-ser-img"> <img src={this.getImageSrc(guia)} alt="" /> </div>
                            {/*<!--LISTINGS: CONTENT-->*/}
                            <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <Link to={`/guia/` + guia.slug}><h3>{guia.titulo}</h3></Link>
                                <h4>{(guia.cidade.length>0)?guia.cidade[0].nome:''} {(guia.bairros.length>0)?'- ' + guia.bairros[0].nome:''}</h4>
                                <p>{(guia.endereco)?<b>Endereço:</b>:''} {guia.endereco}</p>
                                <div className="list-number">
                                    <ul>
                                        <li>{(guia.telefone)?<i className="fa fa-phone" aria-hidden="true"></i>:''} {guia.telefone}</li>
                                        <li>{(guia.email)?<i className="fa fa-envelope" aria-hidden="true"></i>:''} {guia.email}</li>
                                    </ul>
                                </div> 
                                {avaliacao}
                                {this.getCategorias(guia.categorias)}
                                
                                <div className="list-enqu-btn">
                                    <ul>
                                        <li><a href="#!"><i className="fa fa-envelope" aria-hidden="true"></i> Enviar Email</a> </li>
                                        <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Faça sua Avaliação</a> </li>
                                        <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Perguntar</a> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
            )
        })

        let itemCount = 0;
        if(this.props && this.props.guias && this.props.guias.list)
            itemCount = this.props.guias.list.length

        return(
            <div className="dir-alp-con-right-1 content_search" >
                <h2 style={{ textAlign: 'center'}}>Listagem de Guias para a busca </h2>
                {guias}
                <div className="row">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.perPage}
                        totalItemsCount={itemCount}
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
            </div>
        )
    }

    generateNoticias() {
        const truncate = _.truncate
        let noticias = this.state.dataNoticia.map( noticia => {
            
            return (
                <div className="row">
                    {/*<!--NEWS-->*/}
                    <div className="home-list-pop list-spac">
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
                    {/*<!--NEWS END-->*/}
                </div>
            )
        })

        let itemCount = 0;
        if(this.props && this.props.noticias && this.props.noticias.list)
            itemCount = this.props.noticias.list.length

        return(
            <div className="dir-alp-con-right-1 content_search" >
                <h2 style={{ textAlign: 'center'}}>Listagem de Notícias para a busca</h2>
                {noticias}
                <Pagination
                    activePage={this.state.activePageNoticia}
                    itemsCountPerPage={this.state.perPage}
                    totalItemsCount={itemCount}
                    pageRangeDisplayed={this.state.perPage}
                    onChange={this.handlePageNoticiaChange}
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


    handlePageChange(pageNumber, list=[]) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber === 1){
            if(this.props.guias.list)
                data = this.props.guias.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            if(this.props.guias.list)
                data = this.props.guias.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
            else
                data = list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.guias.list.slice(0,evento)}
    }

    handlePageEventoChange(pageNumber, list=[]) {
        let data = [];
        if(pageNumber === 1){
            if(this.props.eventos.list)
                data = this.props.guias.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            console.log("state no handlePageEvento: ", this.state);
            if(this.props.eventos.list)
                data = this.props.eventos.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
            else
                data = list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }

        this.setState({activePageEvento: pageNumber, dataEvento: data});
        //{data: nextProps.guias.list.slice(0,evento)}
    }

    handlePageNoticiaChange(pageNumber, list=[]) {
        console.log(`active page on noticias is ${pageNumber}`);
        let data = [];
        if(pageNumber === 1){
            if(this.props.noticias.list)
                data = this.props.noticias.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            console.log("state no handlePageNoticia: ", this.state);
            if(this.props.noticias.list)
                data = this.props.noticias.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
            else
                data = list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }

        this.setState({activePageNoticia: pageNumber, dataNoticia: data});
        //{data: nextProps.guias.list.slice(0,evento)}
    }

    getGuiaSlug(slug){
        if(slug === 'Guia Comercial/Serviço'){
            return 'guia';
        }
        else{
            return slugify(slug).replace('-','/').replace('de','/');
        }
    }

    breadcrumbs(listName, type, categoria){

        if(categoria)
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    <li><Link to="/">Busca</Link> </li>
                    <li className="active">{categoria.nome}</li>
                </ol>
            );
        else
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    <li className="active">Busca</li>
                </ol>
            );
    }

    getCategorias(categorias){
        return null;
        /*@todo*/
        if(categorias.length > 0){
            return (
                <div className=" list-category"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 === categorias.length)
                            return <Link key={i} to={`/${categoria.slug.replace('comercial/','comercial/categoria/').replace('servicos/','servicos/categoria/')}`}>{categoria.nome}</Link>
                        else
                            return <Link key={i} to={`/${categoria.slug.replace('comercial/','comercial/categoria/').replace('servicos/','servicos/categoria/')}`}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    render(){
        let leftColumn = true;


        let listName = this.props.match.params.slug;

        console.log("prroooops: ", this.props);

        let guias = <div>Nenhum Guia listado para a busca</div>

        if(! this.props.guias){
            guias = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando Guias... </div>
        }
        else {
            if(!this.props.guias.list)
                guias = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando Guias...</div>
            else{
                console.log("aqui no generate guiaaaaaaaaaaaaaaaaaaaaaaaa", this.props.guias.list);
                if(this.props.guias.list.length>0)
                    guias = this.generateGuias();
                else
                    guias = <div className="dir-alp-con-right-1 content_search">
                                <h2 style={{ textAlign: 'center'}}>Nenhum guia encontrado para a busca {this.props.listName} </h2>
                            </div>
            }
        }

        let eventos = <div>Nenhum Evento listado para a busca</div>

        if(! this.props.eventos){
            eventos = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando eventos... </div>
        }
        else {
            if(!this.props.eventos.list)
                eventos = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando eventos...</div>
            else{
                if(this.props.eventos.list.length>0)
                    eventos = this.generateEventos();
                else
                    eventos = <div className="dir-alp-con-right-1 content_search" className="dir-alp-con-right-1 content_search">
                                    <h2 style={{ textAlign: 'center'}}>Nenhum Evento encontrado para a busca solicitada! </h2>
                               </div>
            }
        }

        let noticias = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}>Nenhuma notícia listado para a busca</div>

        if(! this.props.noticias){
            noticias = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando Notícias... </div>
        }
        else {
            if(!this.props.noticias.list)
                noticias = <div className="dir-alp-con-right-1 content_search" style={{ textAlign: 'center'}}><img src="/images/preloader_smn.gif" />Carregando Notícias... </div>
            else{
                if(this.props.noticias.list.length>0)
                    noticias = this.generateNoticias();
                else 
                    noticias = <div className="dir-alp-con-right-1 content_search">
                                    <h2 style={{ textAlign: 'center'}}>Nenhuma Notícia encontrado para a busca solicitada! </h2>
                                </div>
                
            }
        }

        /* if(this.props.bairros)
            console.log("bairrossssssssss no listing: ", this.props.bairros) */

        let title = "Busca "
        if(this.props.match.params.bairro){
            title += `para o bairro: '${this.props.match.params.bairro.charAt(0).toUpperCase()+this.props.match.params.bairro.slice(1).toLowerCase()}'`
            if(this.props.match.params.search){
                title += ` e palavra chave: '${this.props.match.params.search}'`
            }
        }
        else{
            if(this.props.match.params.search){
                title += ` para a palavra chave: '${this.props.match.params.search}'`
            }
        }

        let windowTitle = title;
        

        return(
            <div>

                <HeaderListing title={windowTitle}/>
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <div className="row">
                            <div className="dir-alp-tit">
                                <h1>{title}</h1>
                                {this.breadcrumbs(listName, (this.props.guias)?this.props.guias.categoria:'')}
                            </div>
                        </div>
                        <div className="row">
                            <div className="dir-alp-con">
                                {(leftColumn)?<ListingLeftColumn objects={(this.props.guias)?this.props.guias.recentes:[]} categories={(this.props.categorias)?this.props.categorias.guia:[]} bairros={(this.props.bairros)?this.props.bairros:[]} />:''}
                                <div className={(leftColumn)? 'col-md-9 dir-alp-con-right': 'col-md-12 dir-alp-con-right'}>
                                        {guias}
                                    
                                        {eventos}
                                    
                                        {noticias}
                                </div>



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
    return {
        guias: state.guias,
        eventos: state.eventos,
        noticias: state.noticias,
        categorias: state.categorias,
        bairros: state.bairros
    }
}

export default connect(mapStateToProps, { fetchGuias, fetchGuiasBySearch, fetchEventosBySearch, fetchNoticiasBySearch, fetchBairros, fetchCategoriesGuiaTop })(SearchList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchEventos, fetchEventosByCategory } from '../../actions/evento';
import { fetchBairros, fetchBairroBySlug } from '../../actions/bairro';
import { fetchCategoriesEventoTop } from '../../actions/categoria';
import Paginate from '../paginate';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';
import GoogleAds from './google-ads';


class ListingGrid extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 24,
            loading: true,
            slug: ''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateEventos = this.generateEventos.bind(this);
    }

    async componentDidMount() {
        console.log("this.propssubdomain: ", this.props.subdomain)
        if(this.props.subdomain)
            await this.props.fetchBairroBySlug(this.props.subdomain);
        
        this.props.fetchCategoriesEventoTop();
        this.props.fetchBairros('5ba26f813a018f42215a36a0');

        //this.setState({data: this.props.eventos.list, pageCount: Math.ceil(  this.props.eventos.list.lenght / 10)});
    }

    componentWillReceiveProps(nextProps) {
        let bairro_id = null


        if(nextProps.match && nextProps.match.params.slug){
            let slug = nextProps.match.params.slug
            if(slug !== this.state.slug){
                this.setState(
                    {
                       slug: slug,
                       eventos: this.props.fetchEventosByCategory(slug).then(()=>{
                            this.setState({loading:false})
                        })
                    }
                )
            }
        }
        else{
            if(this.state.slug !== '/'){

                if(nextProps.bairros && nextProps.bairros.bairro){
                    bairro_id = nextProps.bairros.bairro._id;
                }
        console.log("aqui no listing grid: ", nextProps);        
                this.setState(
                    {
                        slug: '/',
                        eventos: this.props.fetchEventos('5ba26f813a018f42215a36a0', 100, bairro_id).then(()=>{
                            this.setState({loading:false})
                        })
                    }
                )
            }
        }

        if(nextProps.eventos){
            if(nextProps.eventos.list)
            {
                this.setState({data: nextProps.eventos.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.eventos.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    this.handlePageChange(nextProps.match.params.page, nextProps.eventos.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
            }
        }
    }


    dateNumberPtBr(date){
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }

    getImageSrc(evento){
        if(evento) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = evento
            
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


    getAvaliacao(evento){
        if(evento && evento.avaliacao)
            return (
                <div className="list-rat-ch"> <span>5.0</span> 
                    <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> <i className="fa fa-star" aria-hidden="true"></i> 
                </div>
            )
        else 
            return (
                <div className="list-rat-ch list-room-rati"> <span>Nenhuma Avaliação</span> 
                    <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> <i className="fa fa-star-o" aria-hidden="true"></i> 
                </div>
            );
    }

    generateEventos() {
        let mod = this.state.data.length % 3;
        
        if(mod !== 0)
            mod = 3 - mod;
        
        let eventos = this.state.data.map( (evento, ind) => {
            
            return (
                <div className="col-md-4" key={ind}>
                    <div className="list-mig-like-com com-mar-bot-30">
                        <div className="list-mig-lc-img list-img-grid"> <img src={this.getImageSrc(evento)} alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                        <div className="list-mig-lc-con">
                        <Link to={`/eventos/${evento.slug}`}>
                            {this.getAvaliacao(evento)}
                            <h5>{evento.titulo} </h5>
                            <h6>Data do Evento: {this.dateNumberPtBr(new Date(evento.createdAt))}</h6>
                            <p>{(evento && evento.object_cidade && evento.object_cidade.nome)?evento.object_cidade.nome:''} {(evento && evento.array_bairros && evento.array_bairros.length>0)?'- ' + evento.array_bairros[0].nome:''}</p>
                        </Link>
                            {this.getCategorias(evento.array_categorias)}
                        </div>
                    </div>
                </div>
            )
        })

        if(mod > 0)
            eventos.push(
            <div className="col-md-4" ><div className="list-mig-like-com com-mar-bot-30">
                <div className="list-mig-lc-img"> <img src="http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                    <div className="list-mig-lc-con"></div>
                </div>
            </div>
        )

        if(mod === 2)
            eventos.push(
            <div className="col-md-4" ><div className="list-mig-like-com com-mar-bot-30">
                <div className="list-mig-lc-img"> <img src="http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png" alt="" /> <span className="home-list-pop-rat list-mi-pr">$720</span> </div>
                    <div className="list-mig-lc-con"></div>
                </div>
            </div>
        )

        let itemCount = 0;
        if(this.props && this.props.eventos && this.props.eventos.list)
            itemCount = this.props.eventos.list.length

        return(
            <div>
                {eventos}
                <Paginate
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
                    pathname={this.props.location.pathname}
                /> 
            </div>
        )
    }

    getCategorias(categorias){
        if(categorias && categorias.length > 0){
            return (
                <div className="grid-category"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 === categorias.length)
                            return <Link to={`/${categoria.slug.replace('/','/categoria/')}`} key={i}>{categoria.nome}</Link>
                        else
                            return <Link to={`/${categoria.slug.replace('/','/categoria/')}`} key={i}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    handlePageChange(pageNumber, list=[]) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber === 1){
            if(this.props.eventos.list)
                data = this.props.eventos.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            if(this.props.eventos && this.props.eventos.list)
                data = this.props.eventos.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
            else
                data = list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.eventos.list.slice(0,10)}
    }

    render(){
        let leftColumn = this.props.columnLeft;

        let listName = this.props.listName;
        let preposition = "de ";

        

        if( this.props.category){
            listName = this.props.category.name;
        }

        

        let title = `Listagem ${preposition} ${listName}`;
        if(this.props.title)
            title = this.props.title;

        let items = <div className="row span-none"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
        if(this.state.loading){
            items = <div className="row span-none"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
            
        }
        else{    
            if(! this.props.eventos){
                <div className="row span-none"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
            }
            else {
                if(! this.props.eventos.list)
                    items = <div className="row span-none"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
                else if( this.props.eventos.list && this.props.eventos.list.length === 0)
                    items = <div className="row span-none"><h2 className="text-center">Nenhum evento encontrado !</h2></div>
                else
                    items = this.generateEventos();
                //items = this.generateGuias(this.props.guias.list)
            }
        }
    

        return(
            <div>
                
                <HeaderListing title={title} />
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <GoogleAds />
                        <div className="row text-center">
                            <div className="dir-alp-tit">
                                <h1>{title}</h1>
                                <ol className="breadcrumb">
                                    <li><a href="#/home@todo">Home</a> </li>
                                    <li><a href="#/eventos@todo">Eventos</a> </li>
                                    <li className="active">{listName}</li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="dir-alp-con">
                                {(leftColumn)?<ListingLeftColumn type="evento" objects={(this.props.guias)?this.props.guias.recentes:[]} categories={(this.props.categorias)?this.props.categorias.evento:[]} bairros={(this.props.bairros)?this.props.bairros:[]} />:''}
                                
                                <div className={(leftColumn)?'col-md-9 dir-alp-con-right list-grid-rig-pad':'col-md-12 dir-alp-con-right list-grid-rig-pad'}>
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            <div className="row span-none">
                                                {items}
                                            </div>
                                            {/*<!--LISTINGS END-->*/}
                                        </div>
                                    </div>
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
        eventos: state.eventos,
        categorias: state.categorias,
        bairros: state.bairros,
        guias: state.guias
    }
}

export default connect(mapStateToProps, { fetchBairroBySlug, fetchEventos, fetchEventosByCategory, fetchBairros, fetchCategoriesEventoTop })(ListingGrid);
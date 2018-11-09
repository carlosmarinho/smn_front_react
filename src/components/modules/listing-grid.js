import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchEventos, fetchEventosByCategory } from '../../actions/evento';
import { fetchBairros } from '../../actions/bairro';
import { fetchCategoriesEventoTop } from '../../actions/categoria';
import Paginate from '../paginate';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';


class ListingGrid extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 24,
            slug: ''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateEventos = this.generateEventos.bind(this);
    }

    componentDidMount() {
        //this.props.fetchEventos('5ba26f813a018f42215a36a0');
        this.props.fetchCategoriesEventoTop();
        this.props.fetchBairros('5ba26f813a018f42215a36a0');

        //this.setState({data: this.props.eventos.list, pageCount: Math.ceil(  this.props.eventos.list.lenght / 10)});
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.match && nextProps.match.params.slug){
            let slug = nextProps.match.params.slug
            if(slug !== this.state.slug){
                this.setState(
                    {
                       slug: slug,
                       eventos: this.props.fetchEventosByCategory(slug)
                    }
                )
            }
        }
        else{
            if(this.state.slug !== '/'){
         
                this.setState(
                    {
                        slug: '/',
                        eventos: this.props.fetchEventos('5ba26f813a018f42215a36a0')
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
        
        if(evento && evento.s3_imagem_destacada){
            return evento.old_imagem_destacada;
        }
        else if(evento && evento.old_imagem_destacada) {
            return evento.old_imagem_destacada;
        }
        else if(evento && evento.imagem_destacada){
            //implementar codigo
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
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
        console.log("tamanho: ", mod);
        
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
                                <p>{(evento && evento.cidade && evento.cidade.length>0)?evento.cidade[0].nome:''} {(evento && evento.bairros && evento.bairros.length>0)?'- ' + evento.bairros[0].nome:''}</p>
                            </Link>
                                {this.getCategorias(evento.categorias)}
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

        console.log("eventos: ", eventos);

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
        if(categorias.length > 0){
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
            if(this.props.guias.list)
                data = this.props.eventos.list.slice(0, this.state.perPage)
            else
                data = list.slice(0, this.state.perPage)
        }
        else{
            if(this.props.guias.list)
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

        return(
            <div>
                
                <HeaderListing title={title} />
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <div className="row">
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
                                {(leftColumn)?<ListingLeftColumn objects={(this.props.guias)?this.props.guias.recentes:[]} categories={(this.props.categorias)?this.props.categorias.evento:[]} bairros={(this.props.bairros)?this.props.bairros:[]} />:''}
                                
                                <div className={(leftColumn)?'col-md-9 dir-alp-con-right list-grid-rig-pad':'col-md-12 dir-alp-con-right list-grid-rig-pad'}>
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            <div className="row span-none">
                                                {this.generateEventos()}
                                                
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

export default connect(mapStateToProps, { fetchEventos, fetchEventosByCategory, fetchBairros, fetchCategoriesEventoTop })(ListingGrid);
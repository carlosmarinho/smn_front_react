import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchGuias, fetchGuiasByCategory } from '../../actions/guia';
import { fetchBairros } from '../../actions/bairro';
import { fetchCategoriesGuiaTop } from '../../actions/categoria';
import Pagination from "react-js-pagination";

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';


class ListingList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 10,
            slug: ''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateGuias = this.generateGuias.bind(this);
    }

    componentDidMount() {
        console.log("did mount do listing")
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
        
        console.log("aquiiiiiiii no will receive GUIA", nextProps);
        if(nextProps.match && nextProps.match.params.slug){

            let slug = nextProps.match.params.slug
            if(slug != this.state.slug){
                this.setState(
                    {
                       slug: slug,
                       guias: this.props.fetchGuiasByCategory(slug)
                    }
                )
            }
        }
        else{
            if(this.state.slug != '/'){
                let search = '';
                if(nextProps.type){
                    search = `tipo=${nextProps.type}`
                }

                this.setState(
                    {
                        slug: '/',
                        guias: this.props.fetchGuias('5ba26f813a018f42215a36a0', search)
                    }
                )
            }
        }

        if(nextProps.guias){
            if(nextProps.guias.list)
            {
                this.setState({data: nextProps.guias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.guias.list.lenght / this.state.perPage)});
            }
        }
    }

    getImageSrc(guia){
        if(guia.s3_imagem_destacada){
            return guia.old_imagem_destacada;
        }
        if(guia.old_imagem_destacada) {
            return guia.old_imagem_destacada;
        }
        else if(guia.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateGuias() {
        
        let guias = this.state.data.map( guia => {
            let avaliacao = '';
            /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
            if(guia.mediaAvaliacao)
                avaliacao = <span className="home-list-pop-rat">{guia.mediaAvaliacao}</span>
            return (
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
                                <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Pergunta Direta</a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        })

        let itemCount = 0;
        if(this.props && this.props.guias && this.props.guias.list)
            itemCount = this.props.guias.list.length

        return(
            <div>
                {guias}
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
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber == 1){
            data = this.props.guias.list.slice(0, this.state.perPage)
        }
        else{
            data = this.props.guias.list.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.guias.list.slice(0,evento)}
    }

    breadcrumbs(listName, categoria){
        if(categoria)
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    <li><Link to="/guia">Guia Comercial</Link> </li>
                    <li className="active">{categoria.nome}</li>
                </ol>
            );
        else
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    <li className="active"><Link to="/guia">Guia Comercial</Link> </li>
                </ol>
            );
    }

    getCategorias(categorias){
        if(categorias.length > 0){
            return (
                <div class=" list-category"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 == categorias.length)
                            return <Link to={`/guia/categoria/${categoria.slug.replace('guia/','')}`}>{categoria.nome}</Link>
                        else
                            return <Link to={`/guia/categoria/${categoria.slug.replace('guia/','')}`}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    render(){
        let leftColumn = true;
        let listName = "Guia Comercial/Serviços";
        let preposition = "do ";

        if(! this.props.guias && !this.props.category){
            items = <div>Guia não encontrado!</div>
        }


        if( this.props.category){
            listName = this.props.category.name;
        }

        let items = <div>Nenhum Item listado para está categoria</div>

        if(! this.props.guias){
            items = <div>Nenhum guia encontrado para a categoria {this.props.listName} </div>
        }
        else {
            //console.log("this.props.guias: ", this.props.guias)
            if(!this.props.guias.list)
                items = <div>Nenhum guia encontrado para a categoria {this.props.listName} </div>
            else
                items = this.generateGuias();
            //items = this.generateGuias(this.props.guias.list)
        }

        /* if(this.props.bairros)
            console.log("bairrossssssssss no listing: ", this.props.bairros) */

        let title = `Listagem ${preposition} ${listName}`
        let windowTitle = title;
        if(this.props.guias && this.props.guias.categoria){
            windowTitle = `Guia comercial/serviços da categoria: ${this.props.guias.categoria.nome}`;
            title += ` - ${this.props.guias.categoria.nome}`;
        }

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
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            {items}
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
        guias: state.guias,
        categorias: state.categorias,
        bairros: state.bairros
    }
}

export default connect(mapStateToProps, { fetchGuias, fetchGuiasByCategory, fetchBairros, fetchCategoriesGuiaTop })(ListingList);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchGuias, fetchGuiasByCategoryComercial, fetchGuiasByCategoryServico, fetchGuiasByCategoryBoth } from '../../actions/guia';
import { fetchBairros } from '../../actions/bairro';
import { fetchCategoriesGuiaTop } from '../../actions/categoria';
import Paginate from "../paginate";
import slugify from 'slugify';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';
import GoogleAds from './google-ads';


class ListingList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 10,
            loading: true,
            slug: '',
            type: ''
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

        console.log("next props aqui: ", nextProps);

        if(nextProps.match && nextProps.match.params.slug){
            let search = '';
            if(nextProps.type){
                search = `tipo=${nextProps.type}`
            }
            
            let slug = nextProps.match.params.slug
         
            if(slug !== this.state.slug){
         
                if(nextProps.location && nextProps.location.pathname.includes('comercial') ){
                    this.setState(
                        {
                           type: 'guia comercial',
                           search: search,
                           slug: slug,
                           guias: this.props.fetchGuiasByCategoryComercial(slug).then(()=>{
                                this.setState({loading:false})
                            })
                        }
                    )
                }
                else if(nextProps.location && nextProps.location.pathname.includes('servicos') ){
                    this.setState(
                        {
                           type: 'guia de serviços',
                           search: search,
                           slug: slug,
                           guias: this.props.fetchGuiasByCategoryServico(slug).then(()=>{
                                this.setState({loading:false})
                            })
                        }
                    )
                }
                else {
                    this.setState(
                        {
                           search: search,
                           slug: slug,
                           guias: this.props.fetchGuiasByCategoryBoth(slug).then(()=>{
                                this.setState({loading:false})
                            })
                        }
                    )
                }
            }
        }
        else{
            if(this.state.slug !== '/'){
                console.log("caiu aqui nesse page:::: ", nextProps)
                let search = '';
                if(nextProps.type){
                    search = `tipo=${nextProps.type}`
                }

                this.setState(
                    {
                        type: nextProps.type,
                        slug: '/',
                        guias: this.props.fetchGuias('5ba26f813a018f42215a36a0', search).then(()=>{
                            this.setState({loading:false})
                        })
                    }
                )
            }
        }

        if(nextProps.guias){
            if(nextProps.guias.list)
            {
                this.setState({data: nextProps.guias.list.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.guias.list.lenght / this.state.perPage)});

                if(nextProps.match && nextProps.match.params.page){
                    console.log("está setando a página ativa: ", nextProps.guias.list)
                    this.handlePageChange(nextProps.match.params.page, nextProps.guias.list)
                    //this.setState({activePage:nextProps.match.params.page})
                }
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
            return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://images.soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    generateGuias() {
        
        let guias = this.state.data.map( (guia, ind) => {
            let avaliacao = '';
            /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
            if(guia.mediaAvaliacao)
                avaliacao = <span className="home-list-pop-rat">{guia.mediaAvaliacao}</span>
            return (
                <div className="home-list-pop list-spac" key={ind}>
                    {/*<!--LISTINGS IMAGE-->*/}
                    <div className="col-md-3 list-ser-img"> <img src={this.getImageSrc(guia)} alt="" /> </div>
                    {/*<!--LISTINGS: CONTENT-->*/}
                    <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <Link to={`/guia/` + guia.slug}><h3>{guia.titulo}</h3></Link>
                        <h4>{(guia.array_cidades && guia.array_cidades.length>0)?guia.array_cidades[0].nome:''} {(guia.array_bairros && guia.array_bairros.length>0)?'- ' + guia.array_bairros[0].nome:''}</h4>
                        <p>{(guia.endereco)?<b>Endereço:</b>:''} {guia.endereco}</p>
                        <div className="list-number">
                            <ul>
                                <li>{(guia.telefone)?<i className="fa fa-phone" aria-hidden="true"></i>:''} {guia.telefone}</li>
                                <li>{(guia.email)?<i className="fa fa-envelope" aria-hidden="true"></i>:''} {guia.email}</li>
                            </ul>
                        </div> 
                        {avaliacao}
                        {this.getCategorias(guia.array_categorias)}
                        
                        <div className="list-enqu-btn">
                            <ul>
                                <li><a href="#!"><i className="fa fa-envelope" aria-hidden="true"></i> Enviar Email</a> </li>
                                <li><a href="#!"><i className="fa fa-star-o" aria-hidden="true"></i> Faça sua Avaliação</a> </li>
                                <li><a href="#!" data-dismiss="modal" data-toggle="modal" data-target="#list-quo"><i className="fa fa-question-circle" aria-hidden="true"></i> Perguntar</a> </li>
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
                <div className="row">
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

    getGuiaSlug(slug){
        console.log("slug aqui: ", slug)
        if(slug === 'Guia Comercial/Serviços'){
            return '/guia';
        }
        else{
            return `/guia/${slugify(slug).toLowerCase()}`;
        }
    }

    breadcrumbs(listName, type, categoria){
        let liTipo = '';
        if(type !== "Comercial/Serviços"){
            liTipo = <li><Link to={'/guia'}>Guia</Link></li>
        }

        if(categoria)
            
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    {liTipo}
                    <li><Link to={this.getGuiaSlug(type)}>{listName}</Link> </li>
                    <li className="active">{categoria.nome}</li>
                </ol>
            );
        else
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    {liTipo}
                    <li className="active">{listName}</li>
                </ol>
            );
    }

    getCategorias(categorias){
        if(categorias && categorias.length > 0){
            return (
                <div className=" list-category"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 === categorias.length)
                            return <Link to={`/${categoria.slug}`} key={i}>{categoria.nome}</Link>
                        else
                            return <Link to={`/${categoria.slug}`} key={i}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    render(){
        let leftColumn = true;
        let tipo = 'Comercial/Serviços'

        console.log('type::::: ', this.state.type);

        if(this.state.type && this.state.type.includes('comercial'))
            tipo = 'Comercial'
        else if(this.state.type && this.state.type.includes('serviço'))
            tipo = 'Serviços'

        let listName = `Guia ${(tipo !== 'Serviços')?tipo: `de ${tipo}`}`;

        let items = <div className="list-spac"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
        


        if( this.props.category){
            listName = this.props.category.name;
        }

        if(this.state.loading){
            title = `Carregando Notícias para a categoria solicitada ...`;
            items = <div className="list-spac"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
        }
        else{
            if(! this.props.guias){
                items = <div className="list-spac"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
            }
            else {    
                if(! this.props.guias.list)
                    items = <div className="list-spac"><h2 className="text-center"><img src="/images/preloader_smn.gif" /> Carregando...</h2></div>
                else if( this.props.guias.list && this.props.guias.list.length === 0)
                    items = <div className="list-spac"><h2 className="text-center">Nenhum guia encontrado para a categoria {this.props.listName} </h2></div>
                else
                    items = this.generateGuias();
            }
        }
        

        /* if(this.props.bairros)
            console.log("bairrossssssssss no listing: ", this.props.bairros) */

        

        let title = `${listName} da cidade de Niterói `
        let windowTitle = title;
        if(this.props.guias && this.props.guias.categoria){
            windowTitle = `${title}: ${this.props.guias.categoria.nome}`;
            title += ` - ${this.props.guias.categoria.nome}`;
        }

        return(
            <div>
                <HeaderListing title={windowTitle}/>
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <GoogleAds />
                        <div className="row text-center">
                            <div className="dir-alp-tit">
                                <h1>{title}</h1>
                                {this.breadcrumbs(listName, tipo, (this.props.guias)?this.props.guias.categoria:'')}
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

export default connect(mapStateToProps, { fetchGuias, fetchGuiasByCategoryComercial, fetchGuiasByCategoryServico, fetchGuiasByCategoryBoth, fetchBairros, fetchCategoriesGuiaTop })(ListingList);
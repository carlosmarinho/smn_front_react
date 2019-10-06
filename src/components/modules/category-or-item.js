import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux'
import { fetchGuiaBySlug, fetchGuias, fetchGuiasByCategoryBoth } from '../../actions/guia';
import { fetchCategoryGuiaBySlug, fetchCategoriesGuiaTop } from '../../actions/categoria';
import { fetchBairroBySlug } from '../../actions/bairro';
import { Route } from 'react-router-dom';
import ListingItem from './listing-item';
import HeaderListing from '../header-destaque-listing';

import Paginate from "../paginate";
import slugify from 'slugify';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';
import GoogleAds from './google-ads';



class CategoryOrItem extends Component {

    constructor() {
        super();

        this.state = {
            data: [],
            activePage: 1,
            perPage: 10,
            loading: true,
            slug: ''
        }
    }

    async componentDidMount() {
        this.setState({slug: this.props.match.params.slug})
        if(this.state.slug === ''){
            console.log("slug é differente: ", this.state.slug, ' === ', this.props.match.params.slug);
            await this.props.fetchCategoryGuiaBySlug(this.props.match.params.slug);
            
            if(this.props.categorias.categoria){
                
                if(this.props.subdomain)
                    await this.props.fetchBairroBySlug(this.props.subdomain);
                
                this.props.fetchCategoriesGuiaTop();

                let bairro_id = null;
                if(this.props.bairros && this.props.bairros.bairro){
                    bairro_id = this.props.bairros.bairro._id;
                }

                let search = null;
                if(this.props.type){
                    search = `tipo=${this.props.type}`
                }
console.log("both::: ", bairro_id);
                this.props.fetchGuiasByCategoryBoth(this.props.match.params.slug, bairro_id, search).then(()=>{
                    this.setState({loading:false})
                });
            }
            
            //this.props.fetchGuiaBySlug(this.props.match.params.slug)

            this.setState({slug: this.props.match.params.slug})
        }
        
    }

    async componentWillReceiveProps(nextProps) {
        let slug = nextProps.match.params.slug
        if(slug !== this.state.slug){
            this.setState(
                {
                   slug: slug
                }
            )
            await nextProps.fetchCategoriasBySlug(slug);
            nextProps.fetchGuiaBySlug(slug);
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
        //this.props.fetchPaginaBySlug(slug);
    }


    

    render(){
        
        
        if(this.props.categorias && this.props.categorias.categoria){
            return(
                <div>{this.listingCategory()}</div>
            )
        }
        else if(this.props.guias && this.props.guias.guia){
            const listingItemProps = () => {
                return (<ListingItem
                    props={this.props} 
                    match={this.props.match}
                    location={this.props.location}
                    subdomain={this.props.subdomain}
                 />)
            }
            
            return(
                <Route component={listingItemProps} />
            )

        }

        return(
            <div>
                <h1>404 - Página não encontrada!</h1>
                <p>Oops parece que não encontramos a página que você está procurando!</p>
            </div>
        )
    }

listingCategory(){
        let { subdomain } = this.props;
        let leftColumn = true;
        let tipo = 'Comercial/Serviços'

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
        
        let title = `${listName} da cidade de Niterói `
        if(subdomain)
            title = `${listName} do bairro ${this.getPreposition()} ${_.startCase(subdomain)}`
            
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
                                {(leftColumn)?<ListingLeftColumn type="guia" objects={(this.props.guias)?this.props.guias.recentes:[]} categories={(this.props.categorias)?this.props.categorias.guia:[]} bairros={(this.props.bairros)?this.props.bairros.list:[]} />:''}

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
   
   getImageSrc(guia){
        if(guia) {

            const { s3_imagem_destacada, old_imagem_destacada, imagem_destacada } = guia
            
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


    generateGuias() {
        
        let guias = this.state.data.map( (guia, ind) => {
            let avaliacao = '';
            /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
            if(guia.mediaAvaliacao)
                avaliacao = <span className="home-list-pop-rat">{guia.mediaAvaliacao}</span>
            return (
                <div className={(guia.nao_existe_mais) ? 'home-list-pop list-spac no-more' : 'home-list-pop list-spac '} key={ind}>
                    {/*<!--LISTINGS IMAGE-->*/}
                    <div className="col-md-3 list-ser-img"> <img src={this.getImageSrc(guia)} alt="" /> </div>
                    {/*<!--LISTINGS: CONTENT-->*/}
                    <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> 
                        <Link to={`/guia/` + guia.slug}><h3>{guia.titulo}</h3></Link>
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
                                <li><a href={`mailto: ${guia.email}`}><i className="fa fa-envelope" aria-hidden="true"></i> Enviar Email</a> </li>
                                <li><HashLink to={`/guia/` + guia.slug + '#ld-rew'}><i className="fa fa-star-o" aria-hidden="true"></i>Faça sua Avaliação</HashLink> </li>
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

    getPreposition(){
        if(this.props.bairros && this.props.bairros.bairro)
            return this.props.bairros.bairro.preposicao
    }



}



function mapStateToProps(state){
    //console.log("state BLOG list: ", state)
    return {
        guias: state.guias,
        categorias: state.categorias,
        bairros: state.bairros,
    }
}

export default connect(mapStateToProps, { fetchCategoriesGuiaTop, fetchBairroBySlug, fetchGuiasByCategoryBoth, fetchGuias, fetchGuiaBySlug, fetchCategoryGuiaBySlug, })(CategoryOrItem);
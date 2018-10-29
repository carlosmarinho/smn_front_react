import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderListing from '../header-destaque-listing';
import { fetchGuias, fetchGuiasByTag } from '../../actions/guia';
import { fetchEventosByTag } from '../../actions/evento';
import { fetchBairros } from '../../actions/bairro';
import { fetchCategoriesGuiaTop } from '../../actions/categoria';
import Paginate from "../paginate";
import slugify from 'slugify';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';


class TagList extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            dataEvento: [],
            activePage: 1,
            perPage: 5,
            slug: '',
            type: ''
        }

        this.handlePageChange = this.handlePageChange.bind(this);
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

        if(nextProps.match && nextProps.match.params.slug){
            let search = '';
            if(nextProps.type){
                search = `tipo=${nextProps.type}`
            }
            
            let slug = nextProps.match.params.slug
         
            if(slug != this.state.slug){
         
                this.setState(
                    {
                       search: search,
                       slug: slug,
                       guias: this.props.fetchGuiasByTag(slug),
                       eventos: this.props.fetchEventosByTag(slug)
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
                    this.handlePageChange(nextProps.match.params.page, nextProps.eventos.list)
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
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    dateNumberPtBr(date){
        console.log("dattta:::;", date);
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }

    generateEventos() {
        if(this.state.dataEvento.length > 0){
            let eventos = this.state.dataEvento.map( evento => {
                let avaliacao = '';
                /*Por enquanto está implementado para não exibir avaliações depois que já tiver avaliação suficiente colocar o texto sem avaliação*/
                if(evento.mediaAvaliacao)
                    avaliacao = <span className="home-list-pop-rat">{evento.mediaAvaliacao}</span>
                return (
                    <div className="home-list-pop list-spac">
                        {/*<!--LISTINGS IMAGE-->*/}
                        <div className="col-md-3 list-ser-img"> <img src={this.getImageSrc(evento)} alt="" /> </div>
                        {/*<!--LISTINGS: CONTENT-->*/}
                        <div className="col-md-9 home-list-pop-desc inn-list-pop-desc"> <Link to={`/evento/` + evento.slug}><h3>{evento.titulo}</h3></Link>
                            <h4>{(evento.cidade.length>0)?evento.cidade[0].nome:''} {(evento.bairros.length>0)?'- ' + evento.bairros[0].nome:''}</h4>
                            <p>{(evento.endereco)?<b>Endereço:</b>:''} {evento.endereco}</p>
                            <div className="list-number">
                                <ul>
                                    <li>{(evento.inicio)?`Data do Evento: ${this.dateNumberPtBr(new Date(evento.inicio))}`:''}</li>
                                    <li>{(evento.fim)?`Data do Termino: ${this.dateNumberPtBr(new Date(evento.fim))}`:''}</li>
                                </ul>
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
                )
            })

            let itemCount = 0;
            if(this.props && this.props.eventos && this.props.eventos.list)
                itemCount = this.props.eventos.list.length

            return(
                <div>
                    {eventos}
                    <div class="row">
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
                <div class="row">
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
        if(pageNumber == 1){
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
        if(slug == 'Guia Comercial/Serviço'){
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
                    <li><Link to={this.getGuiaSlug(listName)}>{listName}</Link> </li>
                    <li className="active">{categoria.nome}</li>
                </ol>
            );
        else
            return(
                <ol className="breadcrumb">
                    <li><Link to="/">Home</Link> </li>
                    <li className="active">{listName}</li>
                </ol>
            );
    }

    getCategorias(categorias){
        if(categorias.length > 0){
            return (
                <div class=" list-category"><strong>Categorias: </strong> 
                    {categorias.map((categoria, i) => {
                        if(i+1 == categorias.length)
                            return <Link to={`/${categoria.slug.replace('comercial/','comercial/categoria/').replace('servicos/','servicos/categoria/')}`}>{categoria.nome}</Link>
                        else
                            return <Link to={`/${categoria.slug.replace('comercial/','comercial/categoria/').replace('servicos/','servicos/categoria/')}`}>{categoria.nome}, </Link>
                    })}
                </div>
            )
        }
    }

    render(){
        let leftColumn = true;
        let tipo = 'Tags'


        let listName = this.props.match.params.slug;

        console.log("prroooops: ", this.props);

        let guias = <div>Nenhum Guia listado para a Tag</div>

        if(! this.props.guias){
            guias = <div>Nenhum guia encontrado para a tag {this.props.listName} </div>
        }
        else {
            if(!this.props.guias.list)
                guias = <div>Nenhum guia encontrado para a tag {this.props.listName} </div>
            else
                guias = this.generateGuias();
        }

        let eventos = <div>Nenhum Evento listado para a Tag</div>

        if(! this.props.eventos){
            eventos = <div>Nenhum evento encontrado para a tag {this.props.listName} </div>
        }
        else {
            if(!this.props.eventos.list)
                eventos = <div>Nenhum evento encontrado para a tag {this.props.listName} </div>
            else
                eventos = this.generateEventos();
        }

        /* if(this.props.bairros)
            console.log("bairrossssssssss no listing: ", this.props.bairros) */

        

        let title = `Listagem para a Tag '${listName}'`
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
                                    <div className="dir-alp-con-right-1" style={{backgroundColor:'#ddd', marginTop:'30px', padding:'30px 10px 20px 10px'}}>
                                        <h2 style={{ textAlign: 'center'}}>Listagem de Guias para a Tag {listName}</h2>
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            {guias}
                                            {/*<!--LISTINGS END-->*/}
                                        </div>
                                    </div>
                                    <div className="dir-alp-con-right-1" style={{backgroundColor:'#ddd', marginTop:'30px', padding:'30px 10px 20px 10px'}}>
                                        <h2 style={{ textAlign: 'center'}}>Listagem de Eventos para a Tag {listName}</h2>
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            {eventos}
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
        eventos: state.eventos,
        categorias: state.categorias,
        bairros: state.bairros
    }
}

export default connect(mapStateToProps, { fetchGuias, fetchGuiasByTag, fetchEventosByTag, fetchBairros, fetchCategoriesGuiaTop })(TagList);
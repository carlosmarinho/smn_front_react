import React, { Component } from 'react';
import HeaderListing from '../header-destaque-listing';
import { fetchBairros } from '../../actions/bairro';
import { connect } from 'react-redux';
import Pagination from "react-js-pagination";
import { Link } from 'react-router-dom';

import ListingLeftColumn from '../listing-left-column';
import PreFooter from './pre-footer';


class BairroGrid extends Component {

    constructor(){
        super();
        
        this.state = {
            data: [],
            activePage: 1,
            perPage: 24
        }

        this.handlePageChange = this.handlePageChange.bind(this);
        this.generateBairros = this.generateBairros.bind(this);
    }

    componentDidMount() {
        this.props.fetchBairros('5ba26f813a018f42215a36a0', 100, 'nome');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.bairros){
            console.log('nextprops: ', nextProps)
            if(nextProps.bairros)
            {
                this.setState({data: nextProps.bairros.slice(0,this.state.perPage), pageCount: Math.ceil(  nextProps.bairros.lenght / this.state.perPage)});
            }
        }
    }

    getImageSrc(bairro){
        if(bairro.s3_imagem_destacada){
            return bairro.old_imagem_destacada;
        }
        if(bairro.old_imagem_destacada) {
            return bairro.old_imagem_destacada;
        }
        else if(bairro.imagem_destacada){
            //implementar codigo
            return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
        }
        return "http://soumaisniteroi.com.br/wp-content/uploads/2015/04/no-image.png";
    }

    dateNumberPtBr(date){
        return ( "0" +(date.getDate())).slice(-2) + '/' + ("0" + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
    }

   

    generateBairros() {
        let bairros = this.state.data.map( bairro => {
            
            return (
                <div className="col-md-3">
                    <Link to={`/bairros/${bairro.slug}`}>
                        <div className="list-mig-like-com com-mar-bot-30">
                            <div className="list-mig-lc-img"> <img src={this.getImageSrc(bairro)} alt="" /> {/*carlos ver o q vai colocar aqui<span className="home-list-pop-rat list-mi-pr">$720</span>*/} </div>
                            <div className="list-mig-lc-con">
                                <h5>Bairro {(bairro.preposicao)?bairro.preposicao:'de'} {bairro.nome} </h5>
                                {(bairro.site)?<h6><a href={`http://` + bairro.site} target="_blank">Ir para o site {bairro.preposicao} {bairro.nome}</a></h6>:''}
                                <p>{bairro.descricao}</p>
                            </div>
                        </div>
                    </Link>
                </div>
            )
        })

        let itemCount = 0;
        if(this.props && this.props.bairros)
            itemCount = this.props.bairros.length

        return(
            <div>
                {bairros}
                {<Pagination
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
                />}
            </div>
        )
    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        let data = [];
        if(pageNumber === 1){
            data = this.props.bairros.slice(0, this.state.perPage)
        }
        else{
            data = this.props.bairros.slice((pageNumber-1)*this.state.perPage,((pageNumber-1)*this.state.perPage)+this.state.perPage)
        }
        this.setState({activePage: pageNumber, data});
        //{data: nextProps.bairros.list.slice(0,10)}
    }

    render(){
        let leftColumn = this.props.columnLeft;

        let title = this.props.title;
        
      
        
        return(
            <div>
                
                <HeaderListing title={title} />
                <section className="dir-alp dir-pa-sp-top">
                    <div className="container">
                        <div className="row">
                            <div className="dir-alp-tit">
                                <h1>{title}</h1>
                                <ol className="breadcrumb">
                                    <li><a href="#">Home</a> </li>
                                    <li><a href="#">A Cidade</a> </li>
                                    <li className="active">{title}</li>
                                </ol>
                            </div>
                        </div>
                        <div className="row">
                            <div className="dir-alp-con">
                                {(leftColumn)?<ListingLeftColumn objects={(this.props.guias)?this.props.guias.recentes:[]} categories={(this.props.categorias)?this.props.categorias.bairro:[]} bairros={(this.props.bairros)?this.props.bairros:[]} />:''}
                                
                                <div className={(leftColumn)?'col-md-9 dir-alp-con-right list-grid-rig-pad':'col-md-12 dir-alp-con-right list-grid-rig-pad'}>
                                    <div className="dir-alp-con-right-1">
                                        <div className="row">
                                            {/*<!--LISTINGS-->*/}
                                            <div className="row span-none">
                                                {this.generateBairros()}
                                                
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
        bairros: state.bairros,
    }
}

export default connect(mapStateToProps, { fetchBairros })(BairroGrid);
import React, { Component } from 'react';

import {connect} from 'react-redux';
import queryString from 'query-string';

import HeaderHomeBairro from './bairro/header-destaque-home-bairro';
import FeaturedListingThreeColumnsBairro from './bairro/modules/featured-listing-three-columns-bairro';
import FeaturedTwoColumnsBairro from './bairro/modules/featured-two-columns-bairro';
import FeaturedNewsBairro from './bairro/modules/featured-news-bairro';


import FeaturedOneRowOneColumn from './modules/featured-one-row-one-column';
import FeaturedOneRowTwoColumn from './modules/featured-one-row-two-column';
import { Link } from 'react-router-dom';


import { fetchFeaturedGuias } from '../actions/guia';
import { fetchBairroBySlug } from '../actions/bairro';
import { fetchEventos } from '../actions/evento';
import { fetchNoticiasFeatured } from '../actions/noticia';


import PreFooter from './modules/pre-footer';

class Home extends Component {

    async componentDidMount() {
        await this.props.fetchBairroBySlug(this.props.subdomain);

        console.log("vai chamar o fetch guia", this.props.bairro);
        this.props.fetchFeaturedGuias('5ba26f813a018f42215a36a0', this.props.bairro[0]._id);
        this.props.fetchEventos('5ba26f813a018f42215a36a0', 4, this.props.bairro[0]._id);
        this.props.fetchNoticiasFeatured('5ba26f813a018f42215a36a0', 5, '_id:desc', this.props.bairro[0]._id);
        
    }

    oneRow(){
        return (
            <div><span>Guia do Bairro:</span> Veja todos os Guias do Bairro <Link to='/guia'>Aqui!</Link></div>
        )
    }
    
    render(){
        if(!this.props.guiasFeatured || !this.props.eventos || !this.props.noticias){
            return(<div>
                <HeaderHomeBairro subdomain={this.props.subdomain} background="" />
            </div>)
        }
        else{ 
            if(this.props.subdomain){
                return(
                    <div>
                        <HeaderHomeBairro subdomain={this.props.subdomain} background="" />
                        <FeaturedListingThreeColumnsBairro subdomain={this.props.subdomain} customClass="com-padd-middle" background="" object={this.props.guiasFeatured} />
                        <FeaturedOneRowOneColumn text={this.oneRow()} />
                        <FeaturedTwoColumnsBairro subdomain={this.props.subdomain} background="" object={this.props.eventos} />
                        <FeaturedOneRowTwoColumn background="light-gray" title="História da cidade de Niterói" img="http://images.soumaisniteroi.com.br/wp-content/uploads/2014/06/praia-de-icarai-antiga.png"  text="A data oficial de fundação da cidade de Niterói, estabelecida através da Deliberação n.º 106, de 10 de março de 1909, é 22 de novembro de 1573. É a data que consta do Auto da Posse da Sesmaria. Araribóia teria recebido as terras em atendimento a uma Petição que encaminhara a Mem de Sá. Na verdade, os temiminós; trazidos do norte da capitania de São Tomé para participarem da luta contra os franceses; já estavam estabelecidos aqui desde 1568, no entanto, as lutas que ainda travavam contra os tamoios podem ter impedido a realização da cerimônia de posse." link="/historia-da-cidade-de-niteroi" textLink="Leia mais" />
                        <FeaturedNewsBairro subdomain={this.props.subdomain} background="" customClass="com-padd-incre-top" object={this.props.noticias.featured} />
                        <PreFooter />
                    </div>
                )
            }
        }
    }
}


function mapStateToProps(state){
    return {
        guiasFeatured: state.guiasFeatured,
        eventos: state.eventos,
        noticias: state.noticias,
        bairro: state.bairros,
        user: state.users
    }
}

export default connect(mapStateToProps, { fetchFeaturedGuias, fetchEventos, fetchNoticiasFeatured, fetchBairroBySlug })(Home);
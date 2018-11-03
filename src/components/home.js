import React, { Component } from 'react';
import {connect} from 'react-redux';

import HeaderHome from './header-destaque-home';
import FeaturedTwoColumns from './modules/featured-two-columns';
import FeaturedListingThreeColumns from './modules/featured-listing-three-columns';
import FeaturedNews from './modules/featured-news';
import FeaturedOneRowOneColumn from './modules/featured-one-row-one-column';
import FeaturedOneRowTwoColumn from './modules/featured-one-row-two-column';
import { Link } from 'react-router-dom';

import { fetchFeaturedGuias } from '../actions/guia';
import { fetchCityBySlug } from '../actions/city';
import { fetchEventos } from '../actions/evento';
import { fetchNoticias } from '../actions/noticia';
import PreFooter from './modules/pre-footer';

class Home extends Component {

    componentDidMount() {
        console.log("era para chamar o fetch featured guias");
        this.props.fetchFeaturedGuias('5ba26f813a018f42215a36a0');
        this.props.fetchEventos('5ba26f813a018f42215a36a0', 4);
        //this.props.fetchNoticiasRecentes('5ba26f813a018f42215a36a0', 5, '-_id');
        this.props.fetchCityBySlug('niteroi');
        
    }

    oneRow(){
        return (
            <div><span>Guia da Cidade:</span> Veja todos os Guias da cidade <Link to='/guia'>Aqui!</Link></div>
        )
    }
    render(){
        console.log('props render do home: ', this.props)
        if(!this.props.guiasFeatured || !this.props.eventos || !this.props.noticias){
            return(<div>
                <HeaderHome background="" />
            </div>)
        }
        else{ 
            console.log("Noticias: ", this.props.noticias);
            return(
                <div>
                    <HeaderHome background="" />
                    {/*<FeaturedOneRowAboveOtherLayer background="" />*/}
                    <FeaturedListingThreeColumns background="" object={this.props.guiasFeatured} />
                    <FeaturedOneRowOneColumn text={this.oneRow()} />
                    <FeaturedTwoColumns background="" object={this.props.eventos} />
                    <FeaturedOneRowTwoColumn background="light-gray" title="História da cidade de Niterói" img="http://soumaisniteroi.com.br/wp-content/uploads/2014/06/praia-de-icarai-antiga.png"  text="A data oficial de fundação da cidade de Niterói, estabelecida através da Deliberação n.º 106, de 10 de março de 1909, é 22 de novembro de 1573. É a data que consta do Auto da Posse da Sesmaria. Araribóia teria recebido as terras em atendimento a uma Petição que encaminhara a Mem de Sá. Na verdade, os temiminós; trazidos do norte da capitania de São Tomé para participarem da luta contra os franceses; já estavam estabelecidos aqui desde 1568, no entanto, as lutas que ainda travavam contra os tamoios podem ter impedido a realização da cerimônia de posse." link="/historia-da-cidade-de-niteroi" textLink="Leia mais" />
                    <FeaturedNews background="" customClass="com-padd-incre-top" object={this.props.noticias.recentes} />
                    {/*<FeaturedFourColumns  background="light-gray" />
                    <FeaturedCategoriesSmallIcon background="" />
                    <FeaturedOneRowWithEffect background="" />
                    <FeaturedOneRowOneColumn featureText="30% Off" text="Promote Your Business with us" link="price.html" textLink="Add My Business" />
                    <FeatureRegister customClass="com-padd-incre-top" background="" />
                    <FeatureGetApp customClass="com-padd-incre-top" background="" />*/}
                    
                    <PreFooter />
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    return {
        guiasFeatured: state.guiasFeatured,
        eventos: state.eventos,
        noticias: state.noticias,
        city: state.city
    }
}

export default connect(mapStateToProps, { fetchFeaturedGuias, fetchEventos, fetchNoticias, fetchCityBySlug })(Home);
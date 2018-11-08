import React, { Component } from 'react';
import HeaderHome from './header-destaque-home';
import FeaturedTwoColumns from './modules-html/featured-two-columns';
import FeaturedFourColumns from './modules-html/featured-four-columns';
import FeaturedListingThreeColumns from './modules-html/featured-listing-three-columns';
import FeaturedCategoriesSmallIcon from './modules-html/featured-categories-small-icon';
import FeaturedNews from './modules-html/featured-news';
import FeaturedOneRowOneColumn from './modules-html/featured-one-row-one-column';
import FeaturedOneRowTwoColumn from './modules-html/featured-one-row-two-column';
import FeatureRegister from './modules-html/feature-register';
import FeatureGetApp from './modules-html/feature-get-app';
import FeaturedOneRowAboveOtherLayer from './modules-html/featured-one-row-above-other-layer';
import FeaturedOneRowWithEffect from './modules-html/featured-one-row-with-effect';
class Content extends Component {
    oneRow(){
        return (
            <div><span>30% Off</span> Promote Your Business with us <a href='price.html'>Add My Business</a></div>
        )
    }
    render(){
        return(
            <div>
                <HeaderHome background="" />
                <FeaturedOneRowAboveOtherLayer background="" />
                <FeaturedListingThreeColumns background="" />
                <FeaturedOneRowOneColumn text={this.oneRow()} />
                <FeaturedTwoColumns background="" />
                <FeaturedFourColumns  background="light-gray" />
                <FeaturedCategoriesSmallIcon background="" />
                <FeaturedOneRowWithEffect background="" />
                <FeaturedNews background="" />
                <FeaturedOneRowOneColumn featureText="30% Off" text="Promote Your Business with us" link="price.html" textLink="Add My Business" />
                <FeatureRegister customClass="com-padd-incre-top" background="" />
                <FeaturedOneRowTwoColumn background="light-gray" title="História da cidade de Niterói" img="http://images.soumaisniteroi.com.br/wp-content/uploads/2014/06/praia-de-icarai-antiga.png"  text="A data oficial de fundação da cidade de Niterói, estabelecida através da Deliberação n.º 106, de 10 de março de 1909, é 22 de novembro de 1573. É a data que consta do Auto da Posse da Sesmaria. Araribóia teria recebido as terras em atendimento a uma Petição que encaminhara a Mem de Sá. Na verdade, os temiminós; trazidos do norte da capitania de São Tomé para participarem da luta contra os franceses; já estavam estabelecidos aqui desde 1568, no entanto, as lutas que ainda travavam contra os tamoios podem ter impedido a realização da cerimônia de posse." link="price.html" textLink="Leia mais" />
                <FeatureGetApp customClass="com-padd-incre-top" background="" />
                

            </div>
        )
    }
}

export default Content;
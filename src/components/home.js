import React, { Component } from 'react';
import HeaderHome from './header-destaque-home';
import FeaturedTwoColumns from './modules/featured-two-columns';
import FeaturedFourColumns from './modules/featured-four-columns';
import FeaturedListingThreeColumns from './modules/featured-listing-three-columns';
import FeaturedCategoriesSmallIcon from './modules/featured-categories-small-icon';
import FeaturedNews from './modules/featured-news';
import FeaturedOneRowOneColumn from './modules/featured-one-row-one-column';
import FeaturedOneRowTwoColumn from './modules/featured-one-row-two-column';
import FeatureRegister from './modules/feature-register';
import FeatureGetApp from './modules/feature-get-app';
class Content extends Component {
    render(){
        return(
            <div>
                <HeaderHome background="" />
                <FeaturedListingThreeColumns background="" />
                <FeaturedFourColumns  background="light-gray" />
                <FeaturedTwoColumns background="" />
                <FeaturedCategoriesSmallIcon background="" />
                <FeaturedNews background="" />
                {/*<FeaturedOneRowOneColumn text="<span>30% Off</span> Promote Your Business with us <a href='price.html'>Add My Business</a>" />*/}
                <FeaturedOneRowOneColumn featureText="30% Off" text="Promote Your Business with us" link="price.html" textLink="Add My Business" />
                <FeatureRegister customClass="com-padd-incre-top" background="" />
                <FeaturedOneRowTwoColumn background="light-gray" title="História da cidade de Niterói" img="http://soumaisniteroi.com.br/wp-content/uploads/2014/06/praia-de-icarai-antiga.png"  text="A data oficial de fundação da cidade de Niterói, estabelecida através da Deliberação n.º 106, de 10 de março de 1909, é 22 de novembro de 1573. É a data que consta do Auto da Posse da Sesmaria. Araribóia teria recebido as terras em atendimento a uma Petição que encaminhara a Mem de Sá. Na verdade, os temiminós; trazidos do norte da capitania de São Tomé para participarem da luta contra os franceses; já estavam estabelecidos aqui desde 1568, no entanto, as lutas que ainda travavam contra os tamoios podem ter impedido a realização da cerimônia de posse." link="price.html" textLink="Leia mais" />
                <FeatureGetApp customClass="com-padd-incre-top" background="" />
                

            </div>
        )
    }
}

export default Content;
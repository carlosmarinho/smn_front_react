import React, { Component } from 'react';
import { connect } from 'react-redux';
import RightColumn from '../right-column';
import HeaderGuia from '../header-destaque-guia';
import PreFooter from './pre-footer';
import { fetchGuiaBySlug } from '../../actions/guia';
import { fetchEventosRecentes } from '../../actions/evento';
import { fetchGuiasFeatured } from '../../actions/guia';
import FormComment from './form-comment';
import Reviews from './reviews';

class ListingItem extends Component {

    componentDidMount() {
        this.props.fetchGuiaBySlug(this.props.match.params.slug);
        this.props.fetchEventosRecentes('5ba26f813a018f42215a36a0');
        this.props.fetchGuiasFeatured('5ba26f813a018f42215a36a0');
    }

    render(){
        let item = {};
        console.log('this.propsguia: ', this.props)
        if(this.props.guias)
            item = this.props.guias.guia
            
        return(
            <div>
                
                <HeaderGuia guia={item} />

                <section className="list-pg-bg">
                    <div className="container">
                        <div className="row">
                            <div className="com-padd">
                                <div className="list-pg-lt list-page-com-p">
                                    {this.about(item)}
                                    {this.services(item)}
                                    {this.gallery(item)}
                                    {this.streetView(item)}
                                    <FormComment text="Deixando um comentário adequado a este guia você estará ajudando outros a encontrar exatamente o que estão procurando!" />
                                    <Reviews />
                                </div>
                                


                                {/*RIGH COLUMN*/}
                                <RightColumn guiaType="featured" guias={(this.props.guias)?this.props.guias:[]} eventos={(this.props.eventos)?this.props.eventos.recentes:[]}  />


                            </div>
                        </div>
                    </div>
                </section>
                <PreFooter />
            </div>
        )
    }

    about(item) {
        return(
            <div className="pglist-p1 pglist-bg pglist-p-com" >
                <span id="ld-abour"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Sobre</span> {item.titulo}</h3> </div>
                <div className="list-pg-inn-sp">
                    <div className="share-btn">
                        <ul>
                            <li><a href="#"><i className="fa fa-facebook fb1"></i> Share On Facebook</a> </li>
                            <li><a href="#"><i className="fa fa-twitter tw1"></i> Share On Twitter</a> </li>
                            <li><a href="#"><i className="fa fa-google-plus gp1"></i> Share On Google Plus</a> </li>
                        </ul>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: item.descricao}}></div>
                </div>
            </div>
        )
    }

    services(item){
        return(
            <div className="pglist-p2 pglist-bg pglist-p-com" >
                <span id="ld-ser"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Serviços</span> Oferecidos</h3> </div>
                <div className="list-pg-inn-sp">
                    <p>Taj Luxury Hotels & Resorts provide 24-hour Business Centre, Clinic, Internet Access Centre, Babysitting, Butler Service in Villas and Seaview Suite, House Doctor on Call, Airport Butler Service, Lobby Lounge </p>
                    <div className="row pg-list-ser">
                        <ul>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser1.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Restaurant and Bar</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser2.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Room Booking</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser3.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Corporate Events</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser4.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Wedding Hall</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser5.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>Travel & Transport</h4> </div>
                            </li>
                            <li className="col-md-4">
                                <div className="pg-list-ser-p1"><img src="images/services/ser6.jpg" alt="" /> </div>
                                <div className="pg-list-ser-p2">
                                    <h4>All Amenities</h4> </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    gallery(item){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" >
                <span id="ld-gal"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>Galeria de </span> Fotos</h3> </div>
                <div className="list-pg-inn-sp">
                    <div id="myCarousel" className="carousel slide" data-ride="carousel">
                        {/*<!-- Indicators -->*/}
                        <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                            <li data-target="#myCarousel" data-slide-to="3"></li>
                        </ol>
                        {/*<!-- Wrapper for slides -->*/}
                        <div className="carousel-inner">
                            <div className="item active"> <img src="images/slider/1.jpg" alt="Los Angeles" /> </div>
                            <div className="item"> <img src="images/slider/2.jpg" alt="Chicago" /> </div>
                            <div className="item"> <img src="images/slider/3.jpg" alt="New York" /> </div>
                            <div className="item"> <img src="images/slider/4.jpg" alt="New York" /> </div>
                        </div>
                        {/*<!-- Left and right controls -->*/}
                        <a className="left carousel-control" href="#myCarousel" data-slide="prev"> <i className="fa fa-angle-left list-slider-nav" aria-hidden="true"></i> </a>
                        <a className="right carousel-control" href="#myCarousel" data-slide="next"> <i className="fa fa-angle-right list-slider-nav list-slider-nav-rp" aria-hidden="true"></i> </a>
                    </div>
                </div>
            </div>
        )
    }

    streetView(item){
        return(
            <div className="pglist-p3 pglist-bg pglist-p-com" id="ld-vie">
                <span id="ld-vie"></span>
                <div className="pglist-p-com-ti">
                    <h3><span>360 </span> Google Street View</h3> </div>
                <div className="list-pg-inn-sp list-360">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m0!4v1497026654798!6m8!1m7!1sIId_fF3cldIAAAQ7LuSTng!2m2!1d5.553927350344909!2d-0.2005543181775732!3f189.99!4f0!5f0.7820865974627469" allowFullScreen></iframe>
                </div>
            </div>
        )
    }

    
}


function mapStateToProps(state){
    //console.log("state BLOG list: ", state)
    return {
        noticias: state.noticias,
        guias: state.guias,
        eventos: state.eventos
    }
}

export default connect(mapStateToProps, { fetchGuiaBySlug, fetchEventosRecentes, fetchGuiasFeatured })(ListingItem);